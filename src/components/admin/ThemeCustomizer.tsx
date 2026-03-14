
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
  Sparkles,
  Loader2,
  Move,
  Type,
  Maximize,
  Circle
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ThemeCustomizer() {
  const { config, updateConfig, saveConfig, resetToDefault } = useDesign();
  const [saving, setSaving] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);

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
        "space-y-4 p-6 rounded-[2.5rem] border transition-all cursor-pointer",
        selectedElement === field ? "border-primary bg-primary/5 shadow-inner" : "border-primary/5 bg-white shadow-xl"
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
      <div className="relative pt-2">
        <div className="h-14 w-full rounded-2xl overflow-hidden border-2 border-primary/10 flex items-center px-4 bg-white">
            <div className="flex-1 font-mono text-[11px] font-bold text-muted-foreground">{value?.toUpperCase()}</div>
            <input 
                type="color" 
                value={value} 
                onChange={(e) => updateConfig({ [field]: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none appearance-none"
            />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 h-full relative pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-[3.5rem] font-black text-primary tracking-tighter uppercase leading-none">Design Lab</h2>
          <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.4em] mt-2">Wix-style real-time layout engine</p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={resetToDefault}
            className="h-16 px-10 rounded-[1.5rem] font-black uppercase text-xs tracking-widest gap-2 bg-white shadow-lg border-primary/5 hover:bg-muted"
          >
            <RotateCcw size={18} />
            Reset Defaults
          </Button>
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="h-16 px-12 rounded-[1.5rem] bg-primary text-white font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-primary/20 gap-3"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
            Publish Design
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Visual Controls (Left Sidebar) */}
        <div className="lg:col-span-4 space-y-10 h-[calc(100vh-280px)] overflow-y-auto no-scrollbar pr-4">
          
          {/* Chromatics Section */}
          <section className="space-y-6">
             <ColorInput 
                label="Primary Brand" 
                value={config.primary} 
                field="primary" 
                description="Buttons & Registry Focus"
              />
              <ColorInput 
                label="Secondary Canvas" 
                value={config.secondary} 
                field="secondary" 
                description="Sidebar & Background Textures"
              />
              <ColorInput 
                label="Accent Variable" 
                value={config.accent} 
                field="accent" 
                description="Interactive Special Highlights"
              />
          </section>

          {/* Geometry Section (Matches Screenshot) */}
          <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden bg-white">
            <CardHeader className="bg-primary/5 p-10">
              <div className="flex items-center gap-5">
                <div className="h-12 w-12 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary"><Shapes size={24}/></div>
                <div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight text-primary">Geometry</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase tracking-widest mt-1">Component curves</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="font-black uppercase text-[11px] tracking-[0.2em]">Border Radius</Label>
                  <span className="text-[10px] font-black text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">{config.radius}rem</span>
                </div>
                <Slider 
                  value={[config.radius * 10]} 
                  max={40} 
                  step={1} 
                  onValueChange={(val) => updateConfig({ radius: val[0] / 10 })}
                  className="py-4"
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="font-black uppercase text-[11px] tracking-[0.2em]">Glass Intensity</Label>
                  <Sparkles size={16} className="text-primary" />
                </div>
                <Slider 
                  value={[config.glassIntensity]} 
                  max={100} 
                  step={5} 
                  onValueChange={(val) => updateConfig({ glassIntensity: val[0] })}
                  className="py-4"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Interactive Workspace (Right Side) */}
        <div className={cn(
          "lg:col-span-8 relative transition-all duration-700",
          isPreviewFullscreen ? "fixed inset-0 z-[100] p-12 bg-black/95 backdrop-blur-2xl" : "h-[calc(100vh-280px)]"
        )}>
          <div className={cn(
            "relative h-full bg-[#E5EEF0]/50 rounded-[4rem] border-4 border-dashed border-primary/10 flex items-center justify-center overflow-hidden group",
            isPreviewFullscreen ? "bg-white/10 rounded-[3rem] border-none shadow-[0_0_100px_rgba(0,0,0,0.5)]" : ""
          )}>
            
            {/* Labels overlay */}
            <div className="absolute top-10 left-12 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white shadow-xl"><Move size={18}/></div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary/40">Hold to Test Layout Alignment</span>
            </div>

            <div className="absolute top-10 right-12 flex items-center gap-3 bg-white/80 backdrop-blur px-6 py-2.5 rounded-full border border-primary/5 shadow-sm">
              <Circle className="h-2 w-2 fill-green-500 text-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600/80">Real-time Sync Active</span>
            </div>

            {/* THE WORKSPACE CANVAS (Matches Screenshot) */}
            <div className="relative w-full max-w-5xl h-[85%] flex items-center justify-center">
              
              {/* MOCK SIDEBAR (TEAL) */}
              <motion.div 
                drag
                dragConstraints={{ left: -150, right: 150, top: -100, bottom: 100 }}
                className={cn(
                  "absolute left-0 w-56 h-[90%] shadow-3xl p-8 flex flex-col gap-8 cursor-grab active:cursor-grabbing transition-shadow",
                  selectedElement === 'secondary' ? "ring-4 ring-primary ring-offset-4" : "hover:shadow-2xl"
                )}
                style={{ backgroundColor: config.secondary, borderRadius: `${config.radius * 1.5}rem` }}
                onClick={() => setSelectedElement('secondary')}
              >
                <div className="h-12 w-12 rounded-[1.25rem] bg-white/10" />
                <div className="space-y-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="h-2 w-full bg-white/10 rounded-full" />
                  ))}
                </div>
                <div className="mt-auto pt-8 border-t border-white/5 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/20" />
                    <div className="h-2 w-20 bg-white/10 rounded-full" />
                </div>
              </motion.div>

              {/* MOCK MAIN CONTENT (RIGHT SIDE) */}
              <div className="ml-64 w-full h-[90%] flex flex-col gap-10">
                
                {/* MOCK HEADER (WHITE) */}
                <motion.div 
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                  className="h-28 w-full bg-white shadow-xl p-8 flex items-center justify-between cursor-grab active:cursor-grabbing"
                  style={{ borderRadius: `${config.radius}rem` }}
                >
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-48 rounded-[1rem] bg-primary/10" style={{ backgroundColor: `${config.primary}15` }}>
                        <div className="h-full w-1/3 bg-primary rounded-[1rem]" style={{ backgroundColor: config.primary }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted/50" />
                    <div className="h-12 w-12 rounded-full bg-primary/10" style={{ backgroundColor: `${config.secondary}20` }}>
                        <div className="h-full w-full flex items-center justify-center text-primary" style={{ color: config.secondary }}>
                            <Circle size={20} className="fill-current" />
                        </div>
                    </div>
                  </div>
                </motion.div>

                {/* MOCK CONTENT GRID */}
                <div className="grid grid-cols-12 gap-10 flex-1">
                  
                  {/* WIDE CARD */}
                  <motion.div 
                    drag
                    className="col-span-7 bg-white shadow-2xl p-10 flex flex-col justify-between cursor-grab active:cursor-grabbing group"
                    style={{ borderRadius: `${config.radius * 2}rem` }}
                  >
                    <div className="space-y-5">
                      <div className="h-2.5 w-32 rounded-full bg-primary/10" style={{ backgroundColor: `${config.primary}20` }} />
                      <div className="space-y-3">
                        <div className="h-10 w-64 bg-foreground/5 rounded-2xl" />
                        <div className="h-2.5 w-full bg-foreground/5 rounded-full" />
                        <div className="h-2.5 w-2/3 bg-foreground/5 rounded-full" />
                      </div>
                    </div>
                    <Button 
                      className="h-16 w-full font-black uppercase text-[11px] tracking-[0.3em] shadow-2xl group-hover:scale-[1.02] transition-transform"
                      style={{ backgroundColor: config.primary, borderRadius: `${config.radius}rem`, color: 'white' }}
                    >
                      Primary Command
                    </Button>
                  </motion.div>

                  {/* ACCENT CARD (Matches Screenshot) */}
                  <motion.div 
                    drag
                    className="col-span-5 shadow-2xl p-10 flex flex-col items-center justify-center text-center gap-6 cursor-grab active:cursor-grabbing relative overflow-hidden"
                    style={{ 
                      borderRadius: `${config.radius * 2}rem`, 
                      backgroundColor: `${config.accent}15`,
                      border: `3px dashed ${config.accent}40`
                    }}
                  >
                    <div 
                        className="h-20 w-20 rounded-[1.75rem] flex items-center justify-center shadow-2xl transition-transform hover:scale-110" 
                        style={{ backgroundColor: config.accent, color: 'white' }}
                    >
                      <Sparkles size={40} className="drop-shadow-lg" />
                    </div>
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] leading-none mb-2" style={{ color: config.accent }}>Accent Element</p>
                        <p className="text-[9px] font-bold uppercase opacity-40 max-w-[120px] mx-auto">Real-time reactive visual component</p>
                    </div>
                  </motion.div>
                </div>

              </div>

            </div>

            {/* FLOATING ACTION OVERLAY (Matching Screenshot) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/90 backdrop-blur-3xl p-4 px-10 rounded-full border border-primary/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-8 duration-700">
              <Button 
                variant="ghost" 
                className="rounded-full h-14 px-8 font-black uppercase text-[10px] tracking-[0.2em] gap-3 hover:bg-muted transition-all"
              >
                <Type size={18}/> Text Styling
              </Button>
              <div className="h-8 w-px bg-primary/10" />
              <Button 
                variant={isPreviewFullscreen ? "default" : "ghost"}
                onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                className={cn(
                  "rounded-full h-14 px-8 font-black uppercase text-[10px] tracking-[0.2em] gap-3 transition-all",
                  isPreviewFullscreen ? "bg-primary text-white scale-105" : ""
                )}
              >
                <Maximize size={18}/> {isPreviewFullscreen ? "EXIT PREVIEW" : "FULLSCREEN PREVIEW"}
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
