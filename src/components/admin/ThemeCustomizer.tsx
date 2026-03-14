
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
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

export default function ThemeCustomizer() {
  const { config, updateConfig, saveConfig, resetToDefault } = useDesign();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await saveConfig();
    setSaving(false);
    toast.success("UI preferences published successfully!", {
      description: "Ang bagong design ay lilitaw na sa lahat ng users."
    });
  };

  const ColorInput = ({ label, value, field, description }: { label: string, value: string, field: string, description: string }) => (
    <div className="space-y-4 p-6 bg-muted/10 rounded-3xl border border-primary/5 hover:border-primary/20 transition-all">
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
      <p className="text-center font-mono text-[10px] font-bold text-muted-foreground">{value.toUpperCase()}</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Visual Controls */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-primary/5 p-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><Palette /></div>
                <div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight">Chromatic Balance</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase tracking-widest mt-1">Configure brand color variables</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorInput 
                  label="Primary Color" 
                  value={config.primary} 
                  field="primary" 
                  description="Buttons, Main Branding, Active States"
                />
                <ColorInput 
                  label="Secondary Color" 
                  value={config.secondary} 
                  field="secondary" 
                  description="Sidebar, Chat, Headers"
                />
                <ColorInput 
                  label="Accent Highlight" 
                  value={config.accent} 
                  field="accent" 
                  description="Special Icons, Badges, Links"
                />
                <ColorInput 
                  label="App Background" 
                  value={config.background} 
                  field="background" 
                  description="Base Surface Color"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[3rem] border-none shadow-2xl">
            <CardHeader className="p-10 pb-0">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><Shapes /></div>
                <div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight">Geometry & Surface</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase tracking-widest mt-1">Adjust component curves and transparency</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="font-black uppercase text-[10px] tracking-widest">Corner Radius ({config.radius}rem)</Label>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{config.radius > 1.5 ? 'Very Round' : config.radius < 0.5 ? 'Sharp' : 'Standard'}</span>
                </div>
                <Slider 
                  value={[config.radius * 10]} 
                  max={30} 
                  step={1} 
                  onValueChange={(val) => updateConfig({ radius: val[0] / 10 })}
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="font-black uppercase text-[10px] tracking-widest">Glassmorphism Intensity ({config.glassIntensity}%)</Label>
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

        {/* Live Preview Sidebar */}
        <div className="space-y-8">
          <div className="sticky top-32">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4 ml-4">Live Preview (Warp View)</p>
            <Card className="rounded-[3rem] border-4 border-primary/10 shadow-3xl bg-background overflow-hidden">
              <div className="h-32 bg-primary flex items-center justify-center relative">
                <div className="absolute top-4 left-4 h-6 w-20 bg-white/20 rounded-full blur-sm" />
                <h4 className="text-white font-black uppercase tracking-tighter text-xl">AMS PORTAL</h4>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 border-2 border-primary/5 flex items-center justify-center text-primary shadow-lg">
                    <MousePointer2 size={24} />
                  </div>
                  <div>
                    <p className="font-black text-xs uppercase text-foreground">Interactive Sample</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Hover to test radius</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full h-12 bg-primary text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-xl shadow-primary/20">
                    Primary CTA
                  </Button>
                  <Button variant="outline" className="w-full h-12 rounded-xl font-black uppercase text-[10px] tracking-widest border-primary/10 text-primary">
                    Secondary Link
                  </Button>
                </div>

                <div className="p-4 bg-accent/10 border-2 border-accent/20 rounded-2xl flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-accent" />
                  <p className="text-[9px] font-black text-accent uppercase tracking-widest">Accent Active State</p>
                </div>

                <div className="pt-4 border-t border-primary/5 text-center">
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.4em]">Real-time rendering active</p>
                </div>
              </div>
            </Card>

            <div className="mt-8 p-6 bg-white rounded-3xl border border-primary/5 shadow-xl">
              <div className="flex items-center gap-3 text-primary mb-3">
                <Layout size={18} />
                <span className="font-black uppercase text-[10px] tracking-widest">Layout Hint</span>
              </div>
              <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                Ang bawat pagbabago rito ay magre-reflect sa lahat ng dashboard view ng Students at Teachers sa real-time.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
