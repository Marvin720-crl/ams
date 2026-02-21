'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getSubjectsAction, getEnrollmentsAction, addEnrollmentAction } from '@/app/actions/dbActions';
import { Subject } from '@/utils/storage';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, CheckCircle, School, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface EnrollSubjectDialogProps {
  onEnrolled: () => void;
}

export default function EnrollSubjectDialog({ onEnrolled }: EnrollSubjectDialogProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    if (open) {
      loadAvailableSubjects();
    }
  }, [open, user]);

  const loadAvailableSubjects = async () => {
    const subjects = await getSubjectsAction();
    const enrollments = await getEnrollmentsAction();
    
    const myEnrollments = enrollments.filter(e => e.studentId === user?.id);
    const enrolledSubjectIds = myEnrollments.map(e => e.subjectId);
    
    const available = subjects.filter(s => !enrolledSubjectIds.includes(s.id));
    setAvailableSubjects(available);
  };

  const handleEnroll = async (subject: Subject) => {
    const enrollment = {
      id: `ENR-${Date.now()}`,
      studentId: user!.id,
      subjectId: subject.id,
      enrolledAt: new Date().toISOString(),
      status: 'pending' as const
    };

    await addEnrollmentAction(enrollment);
    toast.success(`Request sent for ${subject.name}! Awaiting faculty approval.`);
    setOpen(false);
    onEnrolled();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-white font-black h-14 px-8 rounded-2xl shadow-2xl shadow-primary/20 gap-3 uppercase tracking-widest text-xs">
          <Plus className="w-5 h-5" />
          Request Enrollment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] p-0 overflow-hidden border-0 rounded-[2.5rem] shadow-3xl">
        <div className="bg-primary p-10 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <School className="w-8 h-8" />
              Class Registry
            </DialogTitle>
            <DialogDescription className="text-white/70 font-bold uppercase tracking-widest text-[10px] mt-2">
              Select an available subject to join the academic session
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="p-10 space-y-6 bg-white overflow-y-auto max-h-[60vh]">
          {availableSubjects.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-[2rem] border-4 border-dashed border-primary/10">
              <BookOpen className="h-16 w-16 text-primary/20 mx-auto mb-4" />
              <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">No new subjects available for enrollment</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {availableSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="p-8 border border-primary/5 rounded-[2rem] hover:bg-primary/5 transition-all group bg-white shadow-sm"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h4 className="font-black text-2xl group-hover:text-primary transition-colors tracking-tight">{subject.name}</h4>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2 italic">
                        Authorized Faculty: {subject.teacherName}
                      </p>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">
                        Schedule: {subject.day} • {subject.time}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleEnroll(subject)}
                      className="bg-primary hover:bg-primary/90 text-white font-black h-12 px-6 rounded-xl shadow-lg shadow-primary/10 uppercase tracking-widest text-[10px]"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Enroll
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}