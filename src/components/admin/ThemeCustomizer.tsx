
'use client';

import React, { useState, useMemo } from 'react';
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
  Maximize,
  Circle,
  Smartphone,
  Monitor,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Users,
  Scan,
  Home,
  MessageCircle,
  ShieldAlert,
  School,
  Settings,
  FileText,
  BarChart3,
  FileCheck,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type PreviewView = 'student-dash' | 'student-subjects' | 'teacher-hub' | 'library-scan';

export default function ThemeCustomizer() {
  const { config, updateConfig, saveConfig, resetToDefault } = useDesign();
  const [saving, setSaving] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const [currentView, setCurrentView] = useState<PreviewView>('student-dash');
  const [isMobileView, setIsMobileView] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await saveConfig();
    setSaving(false);
    toast.success("UI preferences published successfully!", {
      description: "Ang bagong disenyo ay makikita na ng lahat ng users."
    });
  };

  const sidebarItems = useMemo(() => {
    switch(currentView) {
      case 'student-dash':
      case 'student-subjects':
        return [
          { id: 'home', label: 'Dashboard', icon: Home },
          { id: 'chat', label: 'Messages', icon: MessageCircle },
          { id: 'grades', label: 'Grade Slip', icon: GraduationCap },
          { id: 'subjects', label: 'My Subjects', icon: BookOpen },
          { id: 'classwork', label: 'Classwork', icon: FileCheck },
          { id: 'request', label: 'Make Request', icon: FileText },
        ];
      case 'teacher-hub':
        return [
          { id: 'home', label: 'Dashboard', icon: Home },
          { id: 'chat', label: 'Messages', icon: MessageCircle },
          { id: 'scanner', label: 'QR Scanner', icon: Scan },
          { id: 'grading', label: 'Grading Console', icon: BarChart3 },
          { id: 'reservations', label: 'Reservations', icon: MapPin },
          { id: 'attendance', label: 'Records', icon: FileCheck },
        ];
      case 'library-scan':
        return [
          { id: 'home', label: 'Dashboard', icon: Home },
          { id: 'books', label: 'Manage Books', icon: BookOpen },
          { id: 'scan-lend', label: 'Scan & Lend', icon: Scan },
          { id: 'requests', label: 'Borrow Requests', icon: FileText },
        ];
      default: return [];
    }
  }, [currentView]);

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

  const renderPreviewContent = () => {
    switch(currentView) {
      case 'student-dash':
        return (
          <div className="space-y-8 w-full p-8">
            <div className="flex justify-between items-center">
              <div className="h-8 w-48 rounded-lg" style={{ backgroundColor: `${config.primary}20` }} />
              <div className="h-10 w-10 rounded-full" style={{ backgroundColor: `${config.accent}20` }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1,2,3,4].map(i => (
                <Card key={i} className="p-6 border-none shadow-xl" style={{ borderRadius: `${config.radius}rem` }}>
                  <div className="h-8 w-8 rounded-xl mb-4" style={{ backgroundColor: `${config.primary}10` }} />
                  <div className="h-2 w-20 bg-muted-foreground/20 rounded-full" />
                </Card>
              ))}
            </div>
            <Card className="p-8 border-none shadow-2xl" style={{ borderRadius: `${config.radius * 1.5}rem` }}>
              <div className="h-4 w-32 bg-primary/10 mb-6 rounded-full" style={{ backgroundColor: `${config.primary}10` }} />
              <div className="space-y-4">
                {[1,2].map(i => (
                  <div key={i} className="h-12 w-full bg-muted/30 rounded-xl" />
                ))}
              </div>
            </Card>
          </div>
        );
      case 'student-subjects':
        return (
          <div className="space-y-8 w-full p-8">
            <div className="h-10 w-64 bg-primary/10 rounded-full" style={{ backgroundColor: `${config.primary}10` }} />
            <div className="grid grid-cols-1 gap-6">
              {[1,2,3].map(i => (
                <Card key={i} className="p-8 border-none shadow-xl flex items-center justify-between" style={{ borderRadius: `${config.radius * 2}rem` }}>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10" style={{ backgroundColor: `${config.primary}10` }} />
                    <div className="space-y-2">
                      <div className="h-4 w-40 bg-primary/20 rounded-full" style={{ backgroundColor: `${config.primary}20` }} />
                      <div className="h-2 w-24 bg-muted-foreground/20 rounded-full" />
                    </div>
                  </div>
                  <ChevronRight className="text-primary/20" style={{ color: `${config.primary}20` }} />
                </Card>
              ))}
            </div>
          </div>
        );
      case 'teacher-hub':
        return (
          <div className="space-y-8 w-full p-8">
            <div className="grid grid-cols-2 gap-4">
              {[1,2,3,4].map(i => (
                <Card key={i} className="p-6 border-none shadow-xl text-white" style={{ backgroundColor: config.primary, borderRadius: `${config.radius}rem` }}>
                  <div className="h-10 w-10 rounded-xl bg-white/10 mb-4" />
                  <div className="h-8 w-12 bg-white/20 rounded-lg" />
                </Card>
              ))}
            </div>
            <div className="h-64 w-full rounded-[2.5rem] border-4 border-dashed border-primary/10 flex items-center justify-center" style={{ borderColor: `${config.primary}10` }}>
              <Scan className="text-primary/20" size={48} style={{ color: `${config.primary}20` }} />
            </div>
          </div>
        );
      case 'library-scan':
        return (
          <div className="space-y-8 w-full p-8">
            <div className="flex gap-2">
              <div className="h-10 flex-1 bg-white rounded-full border border-primary/10" style={{ borderColor: `${config.primary}10` }} />
              <div className="h-10 w-10 rounded-full" style={{ backgroundColor: config.primary }} />
            </div>
            <div className="p-10 border-4 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-center gap-4" style={{ backgroundColor: `${config.accent}05`, borderColor: `${config.accent}20` }}>
              <div className="h-20 w-20 rounded-[2rem] flex items-center justify-center text-white shadow-xl" style={{ backgroundColor: config.accent }}>
                <Scan size={32} />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-accent/20 mx-auto rounded-full" style={{ backgroundColor: `${config.accent}20` }} />
                <div className="h-2 w-48 bg-muted-foreground/10 mx-auto rounded-full" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 h-full relative pb-32">
      {/* Top Header Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
        <div>
          <h2 className="text-[3.5rem] font-black text-primary tracking-tighter uppercase leading-none">Design Lab</h2>
          <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.4em] mt-2">Wix-style real-time engine</p>
        </div>

        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={resetToDefault}
            className="h-16 px-8 rounded-[1.5rem] font-black uppercase text-xs tracking-widest gap-2 bg-white shadow-lg border-primary/5 hover:bg-muted"
          >
            <RotateCcw size={18} />
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

      {/* THE IMAGE-LIKE ACTION BAR (View Switcher) */}
      <div className="flex justify-center w-full">
        <div className="flex items-center bg-white p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-primary/5 gap-2 max-w-fit px-10">
          <button 
            onClick={() => setCurrentView('student-dash')}
            className={cn(
              "flex items-center gap-3 px-6 py-4 rounded-full transition-all group",
              currentView === 'student-dash' ? "bg-primary text-white" : "hover:bg-primary/5 text-muted-foreground"
            )}
          >
            <GraduationCap size={20} className={cn(currentView === 'student-dash' ? "text-white" : "group-hover:text-primary")} />
            <span className="font-black uppercase text-[10px] tracking-widest">Student Dash</span>
          </button>

          <button 
            onClick={() => setCurrentView('student-subjects')}
            className={cn(
              "flex items-center gap-3 px-6 py-4 rounded-full transition-all group",
              currentView === 'student-subjects' ? "bg-primary text-white" : "hover:bg-primary/5 text-muted-foreground"
            )}
          >
            <BookOpen size={20} className={cn(currentView === 'student-subjects' ? "text-white" : "group-hover:text-primary")} />
            <span className="font-black uppercase text-[10px] tracking-widest">My Subjects</span>
          </button>

          <button 
            onClick={() => setCurrentView('teacher-hub')}
            className={cn(
              "flex items-center gap-3 px-6 py-4 rounded-full transition-all group",
              currentView === 'teacher-hub' ? "bg-primary text-white" : "hover:bg-primary/5 text-muted-foreground"
            )}
          >
            <Users size={20} className={cn(currentView === 'teacher-hub' ? "text-white" : "group-hover:text-primary")} />
            <span className="font-black uppercase text-[10px] tracking-widest">Teacher Hub</span>
          </button>

          <button 
            onClick={() => setCurrentView('library-scan')}
            className={cn(
              "flex items-center gap-3 px-8 py-4 rounded-full transition-all group",
              currentView === 'library-scan' ? "bg-primary text-white shadow-xl" : "hover:bg-primary/5 text-muted-foreground"
            )}
          >
            <Scan size={20} className={cn(currentView === 'library-scan' ? "text-white" : "group-hover:text-primary")} />
            <span className="font-black uppercase text-[10px] tracking-widest">Library Scan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Visual Controls (Left Sidebar) */}
        <div className="lg:col-span-4 space-y-10 h-[calc(100vh-280px)] overflow-y-auto no-scrollbar pr-4">
          
          <section className="space-y-6">
             <ColorInput 
                label="Primary Brand" 
                value={config.primary} 
                field="primary" 
                description="Headers, Main Buttons & Active Icons"
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
                description="Interactive Highlights & Special Badges"
              />
          </section>

          <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden bg-white">
            <CardHeader className="bg-primary/5 p-10">
              <div className="flex items-center gap-5">
                <div className="h-12 w-12 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary"><Shapes size={24}/></div>
                <div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight text-primary">Geometry</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase tracking-widest mt-1">Component architecture</CardDescription>
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

        {/* Live Workspace Emulator (Right Side) */}
        <div className={cn(
          "lg:col-span-8 relative transition-all duration-700",
          isPreviewFullscreen ? "fixed inset-0 z-[100] p-12 bg-black/95 backdrop-blur-2xl" : "h-[calc(100vh-280px)]"
        )}>
          <div className={cn(
            "relative h-full bg-[#E5EEF0]/50 rounded-[4rem] border-4 border-dashed border-primary/10 flex items-center justify-center overflow-hidden shadow-inner",
            isMobileView ? "max-w-[400px] mx-auto shadow-3xl border-solid bg-white" : "w-full",
            isPreviewFullscreen ? "bg-white/10 rounded-[3rem] border-none shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-full" : ""
          )}>
            
            {/* THE EMULATED CONTENT */}
            <div className="relative w-full h-full flex">
              
              {/* LIVE SIDEBAR EMULATOR */}
              {!isMobileView && (
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="w-64 h-full p-6 flex flex-col gap-8 border-r border-white/5 shadow-2xl relative z-20"
                  style={{ backgroundColor: config.secondary }}
                >
                  <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white"><Layout size={20}/></div>
                    <div className="space-y-1">
                      <div className="h-3 w-20 bg-white/20 rounded-full" />
                      <div className="h-2 w-12 bg-white/10 rounded-full" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    {sidebarItems.map((item, i) => (
                      <div key={i} className={cn(
                        "flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                        i === 0 ? "bg-white/10 text-white" : "text-white/40"
                      )}>
                        <item.icon size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center gap-4 px-2">
                      <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-white/10" style={{ backgroundColor: `${config.primary}40` }} />
                      <div className="space-y-1">
                        <div className="h-2 w-24 bg-white/20 rounded-full" />
                        <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                      </div>
                  </div>
                </motion.div>
              )}

              {/* VIEW CONTENT AREA */}
              <div className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar bg-muted/5">
                {/* Global Header Emulator */}
                <div className="h-20 w-full bg-white shadow-sm flex items-center justify-between px-10 border-b border-primary/5 sticky top-0 z-10" style={{ borderBottomColor: `${config.primary}10` }}>
                  <div className="h-10 w-32 rounded-lg" style={{ backgroundColor: `${config.primary}10` }} />
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full" style={{ backgroundColor: `${config.accent}20` }} />
                    <div className="h-10 w-10 rounded-full bg-muted" />
                  </div>
                </div>

                {/* Switchable View Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentView}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1"
                  >
                    {renderPreviewContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* FLOATING DEVICE ACTION OVERLAY */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/90 backdrop-blur-3xl p-4 px-10 rounded-full border border-primary/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-8 duration-700 z-30">
              <Button 
                variant="ghost" 
                onClick={() => setIsMobileView(false)}
                className={cn("rounded-full h-14 w-14 p-0 transition-all", !isMobileView && "bg-primary text-white shadow-lg shadow-primary/20 scale-110")}
              >
                <Monitor size={20}/>
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsMobileView(true)}
                className={cn("rounded-full h-14 w-14 p-0 transition-all", isMobileView && "bg-primary text-white shadow-lg shadow-primary/20 scale-110")}
              >
                <Smartphone size={20}/>
              </Button>
              <div className="h-8 w-px bg-primary/10" />
              <Button 
                variant={isPreviewFullscreen ? "default" : "ghost"}
                onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                className={cn(
                  "rounded-full h-14 px-8 font-black uppercase text-[10px] tracking-[0.2em] gap-3 transition-all",
                  isPreviewFullscreen ? "bg-primary text-white scale-105 shadow-xl shadow-primary/30" : "text-muted-foreground"
                )}
              >
                <Maximize size={18}/> {isPreviewFullscreen ? "EXIT PREVIEW" : "FULLSCREEN"}
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
