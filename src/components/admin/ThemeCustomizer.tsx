
'use client';

import React, { useState } from 'react';
import { useDesign } from '@/contexts/DesignContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
  Palette, 
  RotateCcw, 
  Save, 
  Layout, 
  Shapes, 
  MousePointer2, 
  Sparkles,
  Loader2,
  CheckCircle2,
  Move,
  Type,
  Maximize
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ThemeCustomizer() {
  const { config, updateConfig, saveConfig, resetToDefault } = useDesign();
  const [saving, setSaving] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    await saveConfig();
    setSaving(false);
    toast.success("UI preferences published successfully!", {
      description: "Ang bagong design ay lilitaw na sa lahat ng users."
    });
  };

  const ColorInput = ({ label, value, field, description }: { label: string, value: string, field: string, description: string }) => (
    <div 
      className={cn(
        "space-y-4 p-6 rounded-3xl border transition-all cursor-pointer",
        selectedElement === field ? "border-primary bg-primary/5 shadow-inner" : "border-primary/5 bg-muted/10"
      )}
      onClick={() => setSelectedElement(field)}
    >
      <div className="flex justify-between items-start">
        <div>
          <Label className="font-black uppercase text-[10px] tracking-widest text-primary">{label}</Label>
          <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">{description}</p>
        </div>
        <div 
          className="h-10 w-10 rounded-xl border-2 border-white shadow-xl" 
          style={{ backgroundColor: value }}
        />
      </div>
      <input 
        type="color" 
        value={value} 
        onChange={(e) => updateConfig({ [field]: e.target.value })}
        className="w-full h-12 rounded-xl cursor-pointer bg-transparent border-none"
      />
      <p className="text-center font-mono text-[10px] font-bold text-muted-foreground">{value?.toUpperCase()}</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">Design Lab</h2>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">Wix-style real-time layout engine</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={resetToDefault}
            className="h-14 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest gap-2"
          >
            <RotateCcw size={16} />
            Reset Defaults
          </Button>
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="h-14 px-10 rounded-2xl bg-primary text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-primary/20 gap-2"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={16} />}
            Publish Design
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Visual Controls (Left Sidebar) */}
        <div className="lg:col-span-4 space-y-8 h-[calc(100vh-250px)] overflow-y-auto no-scrollbar pr-2">
          <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-primary/5 p-8">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><Palette size={20}/></div>
                <div>
                  <CardTitle className="text-xl font-black uppercase tracking-tight text-primary">Chromatics</CardTitle>
                  <CardDescription className="text-[9px] font-bold uppercase tracking-widest mt-1">Brand variables</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <ColorInput 
                label="Primary" 
                value={config.primary} 
                field="primary" 
                description="Main Branding & Buttons"
              />
              <ColorInput 
                label="Secondary" 
                value={config.secondary} 
                field="secondary" 
                description="Sidebar & Backgrounds"
              />
              <ColorInput 
                label="Accent" 
                value={config.accent} 
                field="accent" 
                description="Special Highlights"
              />
            </CardContent>
          </Card>

          <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-primary/5 p-8">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><Shapes size={20}/></div>
                <div>
                  <CardTitle className="text-xl font-black uppercase tracking-tight text-primary">Geometry</CardTitle>
                  <CardDescription className="text-[9px] font-bold uppercase tracking-widest mt-1">Component curves</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-black uppercase text-[10px] tracking-widest">Border Radius</Label>
                  <span className="text-[9px] font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">{config.radius}rem</span>
                </div>
                <Slider 
                  value={[config.radius * 10]} 
                  max={40} 
                  step={1} 
                  onValueChange={(val) => updateConfig({ radius: val[0] / 10 })}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-black uppercase text-[10px] tracking-widest">Glass Intensity</Label>
                  <Sparkles size={14} className="text-primary" />
                </div>
                <Slider 
                  value={[config.glassIntensity]} 
                  max={100} 
                  step={5} 
                  onValueChange={(val) => updateConfig({ glassIntensity: val[0] })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Interactive Workspace (Center/Right) */}
        <div className="lg:col-span-8">
          <div className="relative h-[calc(100vh-250px)] bg-muted/20 rounded-[4rem] border-4 border-dashed border-primary/10 flex items-center justify-center p-10 overflow-hidden group">
            
            <div className="absolute top-8 left-10 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white"><Move size={14}/></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">Drag Elements to Test Layout Alignment</span>
            </div>

            <div className="absolute top-8 right-10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-green-600/60">Real-time Sync Active</span>
            </div>

            {/* THE WORKSPACE CANVAS */}
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
              
              {/* MOCK SIDEBAR */}
              <motion.div 
                drag
                dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                className={cn(
                  "absolute left-0 w-48 h-[80%] rounded-[3rem] shadow-3xl p-6 flex flex-col gap-6 cursor-grab active:cursor-grabbing",
                  selectedElement === 'secondary' ? "ring-4 ring-primary" : ""
                )}
                style={{ backgroundColor: config.secondary, borderRadius: `${config.radius * 1.5}rem` }}
                onClick={() => setSelectedElement('secondary')}
              >
                <div className="h-10 w-10 rounded-2xl bg-white/10" />
                <div className="space-y-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-3 w-full bg-white/10 rounded-full" />
                  ))}
                </div>
              </motion.div>

              {/* MOCK MAIN CONTENT */}
              <div className="ml-56 w-full h-[80%] flex flex-col gap-8">
                
                {/* MOCK HEADER */}
                <motion.div 
                  drag
                  dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                  className="h-24 w-full bg-white rounded-[2.5rem] shadow-xl p-6 flex items-center justify-between cursor-grab active:cursor-grabbing"
                  style={{ borderRadius: `${config.radius}rem` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-32 bg-primary rounded-xl" style={{ backgroundColor: config.primary, borderRadius: `${config.radius * 0.5}rem` }} />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-muted" />
                </motion.div>

                {/* MOCK CONTENT CARDS */}
                <div className="grid grid-cols-2 gap-8 flex-1">
                  <motion.div 
                    drag
                    className="bg-white rounded-[3rem] shadow-2xl p-8 flex flex-col justify-between cursor-grab active:cursor-grabbing"
                    style={{ borderRadius: `${config.radius * 2}rem` }}
                  >
                    <div className="space-y-3">
                      <div className="h-4 w-24 bg-primary/10 rounded-full" style={{ backgroundColor: `${config.primary}20` }} />
                      <div className="h-8 w-40 bg-foreground/10 rounded-xl" />
                    </div>
                    <Button 
                      className="h-12 w-full font-black uppercase text-[10px] tracking-widest shadow-xl"
                      style={{ backgroundColor: config.primary, borderRadius: `${config.radius}rem`, color: 'white' }}
                    >
                      Primary CTA
                    </Button>
                  </motion.div>

                  <motion.div 
                    drag
                    className="rounded-[3rem] shadow-2xl p-8 flex flex-col items-center justify-center text-center gap-4 cursor-grab active:cursor-grabbing relative overflow-hidden"
                    style={{ 
                      borderRadius: `${config.radius * 2}rem`, 
                      backgroundColor: `${config.accent}10`,
                      border: `2px dashed ${config.accent}40`
                    }}
                  >
                    <div className="h-16 w-16 rounded-[1.5rem] flex items-center justify-center shadow-lg" style={{ backgroundColor: config.accent, color: 'white' }}>
                      <Sparkles size={32} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: config.accent }}>Accent Element</p>
                  </motion.div>
                </div>

              </div>

            </div>

            {/* FLOATING ACTION OVERLAY */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-xl p-3 rounded-full border border-primary/10 shadow-2xl">
              <Button variant="ghost" className="rounded-full h-12 px-6 font-black uppercase text-[9px] tracking-widest gap-2">
                <Type size={14}/> Text Styling
              </Button>
              <div className="h-6 w-px bg-primary/10" />
              <Button variant="ghost" className="rounded-full h-12 px-6 font-black uppercase text-[9px] tracking-widest gap-2">
                <Maximize size={14}/> Fullscreen Preview
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
