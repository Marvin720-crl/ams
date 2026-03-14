'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle, 
  BookOpen, 
  QrCode, 
  ShieldCheck, 
  GraduationCap,
  Monitor,
  CheckCircle2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function UserGuide({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const getSteps = (): Step[] => {
    if (!user) return [];

    const commonSteps: Step[] = [
      {
        title: "Welcome to AMS:AMACC",
        description: "Ang iyong sentralisadong Academic Management System. Dito mo makikita ang lahat ng iyong records, schedules, at tools.",
        icon: <HelpCircle className="w-12 h-12 text-primary" />
      },
      {
        title: "Account Profile",
        description: "I-update ang iyong profile picture at impormasyon. Dito mo rin makikita ang iyong Digital ID QR Code para sa campus entry.",
        icon: <QrCode className="w-12 h-12 text-primary" />
      }
    ];

    if (user.role === 'student') {
      return [
        ...commonSteps,
        {
          title: "Enrollment Protocol",
          description: "Kailangan mo munang mag-enroll sa active Academic Term bago ka makapili ng iyong mga subjects para sa trimester.",
          icon: <GraduationCap className="w-12 h-12 text-primary" />
        },
        {
          title: "Subject & Grade Slip",
          description: "Kapag enrolled ka na, dito mo makikita ang iyong weekly schedule at ang iyong official digital Grade Slip.",
          icon: <BookOpen className="w-12 h-12 text-primary" />
        },
        {
          title: "Iron Wall Protection",
          description: "Laging mag-log out pagkatapos gamitin ang system. Huwag mag-upload ng malicious files para maiwasan ang auto-ban.",
          icon: <ShieldCheck className="w-12 h-12 text-primary" />
        }
      ];
    }

    if (user.role === 'teacher') {
      return [
        ...commonSteps,
        {
          title: "Provisioning Load",
          description: "Gamitin ang 'Manage Subjects' para i-add ang iyong mga subjects. Siguraduhing mai-connect ito sa tamang Academic Term.",
          icon: <Monitor className="w-12 h-12 text-primary" />
        },
        {
          title: "QR Attendance",
          description: "I-scan ang QR codes ng mga estudyante gamit ang mobile scanner para sa real-time attendance at auto-PC assignment.",
          icon: <QrCode className="w-12 h-12 text-primary" />
        },
        {
          title: "Grading Matrix",
          description: "I-setup ang weights (Attendance, Quiz, Activities) para sa bawat subject para sa auto-computation ng final grades.",
          icon: <CheckCircle2 className="w-12 h-12 text-primary" />
        }
      ];
    }

    if (user.role === 'admin') {
      return [
        ...commonSteps,
        {
          title: "Term & Lifecycle",
          description: "Ikaw ang may kontrol sa pag-start at pag-end ng Academic Terms. Ang pag-end ng term ay magfa-finalize ng lahat ng grades.",
          icon: <GraduationCap className="w-12 h-12 text-primary" />
        },
        {
          title: "Security Center",
          description: "Monitor ang mga accounts na na-ban ng Iron Wall. Maaari kang mag-unban o mag-lock ng access kung kinakailangan.",
          icon: <ShieldCheck className="w-12 h-12 text-primary" />
        }
      ];
    }

    return commonSteps;
  };

  const steps = getSteps();

  const next = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    else onOpenChange(false);
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) setTimeout(() => setCurrentStep(0), 300);
    }}>
      <DialogContent className="sm:max-w-md rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-white p-10 flex flex-col items-center text-center">
          <div className="w-full flex justify-between items-center mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">Step {currentStep + 1} of {steps.length}</span>
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all ${i === currentStep ? 'w-6 bg-primary' : 'w-2 bg-muted'}`} />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center"
            >
              <div className="h-24 w-24 rounded-[2rem] bg-primary/5 flex items-center justify-center mb-8 border-2 border-primary/5">
                {steps[currentStep]?.icon}
              </div>
              
              <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-foreground mb-4">
                {steps[currentStep]?.title}
              </DialogTitle>
              
              <DialogDescription className="font-bold text-sm text-muted-foreground leading-relaxed px-4">
                {steps[currentStep]?.description}
              </DialogDescription>
            </motion.div>
          </AnimatePresence>

          <div className="w-full grid grid-cols-2 gap-4 mt-12">
            <Button 
              variant="ghost" 
              onClick={prev} 
              disabled={currentStep === 0}
              className="h-14 rounded-2xl font-black uppercase text-xs tracking-widest"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button 
              onClick={next}
              className="h-14 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Continue"} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
