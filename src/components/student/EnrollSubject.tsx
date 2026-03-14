'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import {
  UserPlus,
  AlertCircle,
  Loader2,
  Info,
  CheckCircle2,
  BookOpen,
  User as UserIcon,
  ChevronRight
} from 'lucide-react';

import {
  addEnrollmentAction,
  getSubjectsAction,
  getUsersAction,
  getEnrollmentsAction,
  getTermEnrollmentsAction
} from '@/app/actions/dbActions';

import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User, Subject, Enrollment, TermEnrollment } from '@/utils/storage';

export default function EnrollSubject() {
  const { user } = useAuth();

  const [teachers, setTeachers] = useState<User[]>([]);
  const [allAvailableSubjects, setAllAvailableSubjects] = useState<Subject[]>([]);
  const [myApprovedTerms, setMyApprovedTerms] = useState<string[]>([]);
  const [existingEnrollments, setExistingEnrollments] = useState<Enrollment[]>([]);

  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Stability: Use ID string instead of object to prevent loop
  const userId = user?.id;
  const userDept = user?.department || 'college';

  const loadInitialData = useCallback(async () => {
    if (!userId) return;
    
    try {
      const [
        users,
        subjects,
        termEnrollments,
        enrollments
      ] = await Promise.all([
        getUsersAction(),
        getSubjectsAction(),
        getTermEnrollmentsAction(),
        getEnrollmentsAction()
      ]);

      const approvedTerms = termEnrollments
        .filter((te: TermEnrollment) => te.studentId === userId && te.status === 'approved')
        .map((te: TermEnrollment) => te.termId);

      setMyApprovedTerms(approvedTerms);
      setExistingEnrollments(enrollments.filter((e: Enrollment) => e.studentId === userId));
      setAllAvailableSubjects(subjects);

      const teacherUsers = users.filter(u => 
        u.role === 'teacher' && 
        (!u.department || u.department === userDept)
      );

      // Only show teachers who have subjects in the approved terms
      const teachersWithSubjects = teacherUsers.filter(t =>
        subjects.some(
          s => s.teacherId === t.id && (approvedTerms.includes(s.termId))
        )
      );

      setTeachers(teachersWithSubjects);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load enrollment data.");
    } finally {
      setInitialLoading(false);
    }
  }, [userId, userDept]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const displayedSubjects = useMemo(() => {
    if (!selectedTeacher || !userId) return [];
    
    return allAvailableSubjects.filter(s =>
      s.teacherId === selectedTeacher &&
      myApprovedTerms.includes(s.termId)
    );
  }, [allAvailableSubjects, selectedTeacher, myApprovedTerms, userId]);

  const toggleSubject = useCallback((id: string) => {
    setSelectedSubjectIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!userId || selectedSubjectIds.length === 0) {
      setError('Please select at least one subject.');
      return;
    }

    setLoading(true);

    try {
      let successCount = 0;
      let failCount = 0;

      for (const subjectId of selectedSubjectIds) {
        const existing = existingEnrollments.find(en => en.subjectId === subjectId);

        if (existing) {
          failCount++;
          continue;
        }

        const newEnrollment = {
          id: `ENR-${Date.now()}-${subjectId}`,
          studentId: userId,
          subjectId: subjectId,
          enrolledAt: new Date().toISOString(),
          status: 'pending' as const
        };

        await addEnrollmentAction(newEnrollment);
        successCount++;
      }

      if (successCount > 0) {
        toast.success(`Sent enrollment request for ${successCount} subject(s).`);
      }
      
      if (failCount > 0) {
        toast.warning(`${failCount} subject(s) were already requested.`);
      }

      setSelectedTeacher('');
      setSelectedSubjectIds([]);
      loadInitialData();

    } catch (e) {
      toast.error("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (myApprovedTerms.length === 0) {
    return (
      <div className="max-w-3xl space-y-6">
        <div className="bg-amber-50 border-2 border-amber-100 text-amber-900 p-10 rounded-[2.5rem] text-center space-y-4 shadow-xl">
          <div className="flex justify-center mb-2"><AlertCircle size={48} className="text-amber-600" /></div>
          <h3 className="font-black text-xl uppercase">Action Required</h3>
          <p className="text-sm font-bold text-amber-800 leading-relaxed max-w-md mx-auto">Kailangan mo munang mag-enroll sa active academic term bago makapili ng subjects. Mangyaring pumunta sa Dashboard para mag-request ng term entry.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
            {userDept === 'college' ? 'COLLEGE' : 'SHS'} INSTRUCTOR
          </Label>
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20 group-hover:text-primary transition-colors">
              <UserIcon size={20} />
            </div>
            <select
              value={selectedTeacher}
              onChange={(e) => {
                setSelectedTeacher(e.target.value);
                setSelectedSubjectIds([]);
              }}
              className="w-full h-20 bg-white border-2 border-black rounded-3xl pl-16 pr-8 font-black text-lg uppercase tracking-tight focus:ring-0 focus:border-primary transition-all appearance-none cursor-pointer shadow-sm"
            >
              <option value="" disabled>Select Faculty Member</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.id})</option>
              ))}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/40">
              <ChevronRight className="rotate-90" size={20} />
            </div>
          </div>
        </div>
      </div>

      {selectedTeacher && (
        <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              AVAILABLE SUBJECTS ({displayedSubjects.length})
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedSubjects.map(s => {
              const isEnrolled = existingEnrollments.some(e => e.subjectId === s.id && e.status === 'approved');
              const isPending = existingEnrollments.some(e => e.subjectId === s.id && e.status === 'pending');
              const isSelected = selectedSubjectIds.includes(s.id);
              const isDisabled = isEnrolled || isPending;
              
              return (
                <div 
                  key={s.id} 
                  onClick={() => !isDisabled && toggleSubject(s.id)}
                  className={cn(
                    "relative p-8 rounded-[2rem] border-2 transition-all cursor-pointer flex items-center justify-between group h-32",
                    isSelected ? "border-primary bg-primary/[0.02] shadow-xl scale-[1.02]" : "border-primary/5 hover:border-primary/20 bg-white shadow-sm",
                    isDisabled && "opacity-60 cursor-not-allowed bg-muted/10"
                  )}
                >
                  <div className="flex-1 pr-10">
                    <p className={cn(
                      "font-black text-lg uppercase leading-tight transition-colors mb-1",
                      isSelected || isEnrolled ? "text-primary" : "text-primary"
                    )}>{s.name}</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      {s.code || 'SUBJ'} • {s.units || 3} UNITS
                    </p>
                  </div>
                  
                  <div className="shrink-0">
                    {isEnrolled ? (
                      <div className="flex items-center gap-2 text-[9px] font-black text-green-500 uppercase bg-green-50 px-4 py-2 rounded-full border border-green-100">
                        <CheckCircle2 size={14} />
                        ENROLLED
                      </div>
                    ) : isPending ? (
                      <div className="flex items-center gap-2 text-[9px] font-black text-amber-500 uppercase bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
                        <Loader2 size={14} className="animate-spin" />
                        PENDING
                      </div>
                    ) : (
                      <div className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center",
                        isSelected ? "bg-primary border-primary shadow-lg shadow-primary/20" : "border-primary/10 bg-muted/20"
                      )}>
                        {isSelected && <CheckCircle2 size={24} className="text-white" />}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-10 flex justify-center">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading || selectedSubjectIds.length === 0}
              className="h-20 px-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black uppercase text-sm tracking-[0.3em] shadow-2xl shadow-primary/20 gap-4 transition-all active:scale-95 disabled:grayscale"
            >
              {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={24} />}
              REQUEST ENROLLMENT
            </Button>
          </div>
        </div>
      )}

      {/* Protocol Notice */}
      <div className="p-8 bg-primary/5 border-2 border-primary/5 rounded-[2rem] text-center flex items-center justify-center gap-4">
        <Info size={20} className="text-primary/40" />
        <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.1em] leading-relaxed max-w-md">
          PROTOCOL: Tanging mga Subjects na kabilang sa iyong kasalukuyang academic term ang maaaring i-request.
        </p>
      </div>
    </div>
  );
}
