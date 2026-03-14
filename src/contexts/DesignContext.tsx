
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig } from '@/utils/storage';
import { getSettingsAction, updateSettingsAction } from '@/app/actions/dbActions';

interface DesignContextType {
  config: ThemeConfig;
  updateConfig: (updates: Partial<ThemeConfig>) => void;
  saveConfig: () => Promise<void>;
  resetToDefault: () => void;
}

const defaultConfig: ThemeConfig = {
  primary: '#6D1B0A', // Maroon
  secondary: '#14343A', // Deep Teal
  accent: '#F17346', // Coral
  background: '#FFFFFF',
  radius: 1.5,
  glassIntensity: 15,
  fontFamily: 'Inter',
  layoutDensity: 'standard',
  campusLabel: 'AMACC - LIPA',
  logoScale: 100,
  componentStyles: {}
};

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<ThemeConfig>(defaultConfig);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const settings = await getSettingsAction();
        if (settings.theme) {
          setConfig({ ...defaultConfig, ...settings.theme });
        }
      } catch (e) {
        console.error("Theme load error", e);
      }
    };
    loadTheme();
  }, []);

  const hexToHsl = (hex: string) => {
    let r = 0, g = 0, b = 0;
    if (!hex || typeof hex !== 'string') return '0 0% 0%';
    
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else if (cleanHex.length === 6) {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    }
    
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const updateConfig = (updates: Partial<ThemeConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const saveConfig = async () => {
    try {
      await updateSettingsAction({ theme: config });
    } catch (e) {
      console.error("Theme save error", e);
    }
  };

  const resetToDefault = () => {
    setConfig(defaultConfig);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--primary', hexToHsl(config.primary));
      root.style.setProperty('--secondary', hexToHsl(config.secondary));
      root.style.setProperty('--accent', hexToHsl(config.accent));
      root.style.setProperty('--background', hexToHsl(config.background));
      root.style.setProperty('--radius', `${config.radius}rem`);
      
      // Glassmorphism intensity
      root.style.setProperty('--glass-opacity', `${config.glassIntensity / 100}`);
      root.style.setProperty('--glass-blur', `${(config.glassIntensity / 100) * 20}px`);
    }
  }, [config]);

  return (
    <DesignContext.Provider value={{ config, updateConfig, saveConfig, resetToDefault }}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) throw new Error('useDesign must be used within DesignProvider');
  return context;
};
