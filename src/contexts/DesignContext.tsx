
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
  radius: 1.25,
  glassIntensity: 10,
  fontFamily: 'Inter'
};

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<ThemeConfig>(defaultConfig);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const settings = await getSettingsAction();
        if (settings.theme) {
          setConfig(settings.theme);
        }
      } catch (e) {
        console.error("Theme load error", e);
      }
    };
    loadTheme();
  }, []);

  // Helper to convert Hex to HSL for Tailwind CSS variable injection
  const hexToHsl = (hex: string) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
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

  // Inject variables into document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--primary', hexToHsl(config.primary));
      root.style.setProperty('--secondary', hexToHsl(config.secondary));
      root.style.setProperty('--accent', hexToHsl(config.accent));
      root.style.setProperty('--background', hexToHsl(config.background));
      root.style.setProperty('--radius', `${config.radius}rem`);
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
