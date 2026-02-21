'use client';

import { User, Subject } from '@/utils/storage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { User as UserIcon, Mail, GraduationCap, School, ShieldCheck } from 'lucide-react';

interface StudentInfoDialogProps {
  student: User;
  subject: Subject;
  onClose: () => void;
}

export default function StudentInfoDialog({ student, subject, onClose }: StudentInfoDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-0 shadow-2xl rounded-[2.5rem]">
        <DialogHeader className="sr-only">
          <DialogTitle>Student Profile: {student.name}</DialogTitle>
          <DialogDescription>
            Detailed information for {student.name}, including contact, program, and enrollment status for the subject {subject.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-[2/1] w-full bg-[#E30613] relative p-10 flex items-center gap-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 w-40 h-40 rounded-[2rem] bg-white/20 border-4 border-white/40 flex items-center justify-center overflow-hidden shadow-2xl rotate-2">
            {student.profilePic ? (
              <img 
                src={student.profilePic} 
                alt={student.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-20 h-20 text-white" />
            )}
          </div>
          <div className="relative z-10 flex-1 text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 mb-2">Verified Enrollment</p>
            <h3 className="text-4xl font-black mb-5 leading-tight drop-shadow-lg">{student.name}</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-black uppercase tracking-widest">
              <div className="flex flex-col">
                <span className="text-white/50 text-[9px]">Student ID</span>
                <span>{student.id}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/50 text-[9px]">Year Level</span>
                <span>Year {student.year}</span>
              </div>
              <div className="col-span-2 flex flex-col">
                <span className="text-white/50 text-[9px]">Program</span>
                <span>{student.program}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 space-y-10 bg-white">
          <div className="space-y-5">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-primary/10 pb-3">Enrolled Session</h4>
             <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-[1.25rem] bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20">
                  <School className="w-8 h-8" />
                </div>
                <div>
                   <p className="font-black text-2xl text-primary">{subject.name}</p>
                   <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mt-1">Schedule: {subject.day} • {subject.startTime}</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
             <div className="p-6 bg-accent/30 rounded-[1.5rem] border border-primary/5">
                <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest mb-2 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-primary" /> Reach Out
                </p>
                <p className="font-black text-sm truncate text-primary">{student.email}</p>
             </div>
             <div className="p-6 bg-green-50 rounded-[1.5rem] border border-green-100 flex flex-col justify-center">
                <p className="text-[9px] font-black uppercase text-green-600/70 tracking-widest mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-3 w-3 text-green-600" /> Status
                </p>
                <p className="font-black text-sm text-green-700 uppercase tracking-[0.1em]">Verified Active</p>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
