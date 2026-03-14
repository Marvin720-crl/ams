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
import { Checkbox } from '@/components/ui/checkbox';
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

  // Use string primitives for stable dependency tracking to prevent rendering loops
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

      // Show teachers from same department or those with no department set (fallback)
      const teacherUsers = users.filter(u => 
        u.role === 'teacher' && 
        (!u.department || u.department === userDept)
      );

      // Only show teachers who actually have subjects in the approved terms
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

  const toggleSubject = (id: string) => {
    setSelectedSubjectIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

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
        <div>
          <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">ENROLLMENT LOCK</h2>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">Term Enrollment Required</p>
        </div>
        <div className="bg-amber-50 border-2 border-amber-100 text-amber-900 p-10 rounded-[2.5rem] text-center space-y-4 shadow-xl shadow-amber-900/5">
          <div className="flex justify-center mb-2"><AlertCircle size={48} className="text-amber-600" /></div>
          <h3 className="font-black text-xl uppercase">Action Required</h3>
          <p className="text-sm font-bold text-amber-800 leading-relaxed max-w-md mx-auto">Kailangan mo munang mag-enroll sa active academic term bago makapili ng subjects. Mangyaring pumunta sa Dashboard para mag-request ng term entry.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h2 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">
          Subject Registration ({userDept?.toUpperCase()})
        </h2>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">
          Select your instructor to view available subjects for your department
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <AlertCircle size={18} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border-2 border-primary/5 rounded-[2rem] shadow-xl p-10 space-y-10">
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
            Choose Instructor
          </Label>
          <div className="relative">
            <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 h-5 w-5 pointer-events-none" />
            <select
              value={selectedTeacher}
              onChange={(e) => {
                setSelectedTeacher(e.target.value);
                setSelectedSubjectIds([]);
              }}
              className="w-full h-16 bg-muted/30 border-none rounded-2xl pl-14 pr-6 font-black text-sm uppercase tracking-tight focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select Faculty Member</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/40">
              <ChevronRight className="rotate-90" size={20} />
            </div>
          </div>
        </div>

        {selectedTeacher && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between px-1">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Subject Selection ({displayedSubjects.length})
              </Label>
              {selectedSubjectIds.length > 0 && (
                <button 
                  type="button" 
                  onClick={() => setSelectedSubjectIds([])}
                  className="text-[9px] font-black text-primary uppercase hover:underline"
                >
                  Clear Selection
                </button>
              )}
            </div>
            
            {displayedSubjects.length === 0 ? (
              <div className="p-12 border-4 border-dashed rounded-[2.5rem] text-center bg-muted/5">
                <BookOpen className="mx-auto text-muted-foreground/20 mb-4" size={40} />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No matching subjects found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        "p-6 rounded-[1.75rem] border-2 transition-all cursor-pointer flex items-center justify-between group",
                        isSelected ? "border-primary bg-primary/5 shadow-lg shadow-primary/5 scale-[1.02]" : "border-primary/5 hover:border-primary/20 bg-white shadow-sm",
                        isDisabled && "opacity-50 cursor-not-allowed bg-muted/20 grayscale"
                      )}
                    >
                      <div className="flex-1 pr-4">
                        <p className={cn(
                          "font-black text-sm uppercase leading-tight transition-colors",
                          isSelected ? "text-primary" : "text-foreground"
                        )}>{s.name}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded-full">
                            {s.code || 'SUBJ'}
                          </span>
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                            {s.units || 3} UNITS
                          </span>
                        </div>
                      </div>
                      
                      {isEnrolled ? (
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-green-600 uppercase bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                          <CheckCircle2 size={12} />
                          Enrolled
                        </div>
                      ) : isPending ? (
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-amber-600 uppercase bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                          <Loader2 size={12} className="animate-spin" />
                          Pending
                        </div>
                      ) : (
                        <div className="flex items-center h-full">
                          <Checkbox 
                            checked={isSelected}
                            className="rounded-lg h-7 w-7 border-2 border-primary/20 data-[state=checked]:bg-primary pointer-events-none transition-transform group-hover:scale-110"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading || selectedSubjectIds.length === 0}
          className="w-full h-20 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black uppercase text-sm tracking-[0.25em] shadow-2xl shadow-primary/20 gap-4 transition-all active:scale-95 disabled:grayscale disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={24} />}
          {selectedSubjectIds.length > 0 
            ? `Submit Request (${selectedSubjectIds.length})` 
            : 'Select Subjects Above'}
        </Button>
      </form>

      <div className="p-8 bg-primary/5 border-2 border-primary/10 rounded-[2rem] text-center flex items-center justify-center gap-4">
        <Info size={20} className="text-primary" />
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.1em] leading-relaxed max-w-md">
          PROTOCOL: Tanging mga Subjects na kabilang sa iyong <span className="underline">{userDept?.toUpperCase() || 'GENERAL'}</span> department ang maaari mong i-request sa ngayon.
        </p>
      </div>
    </div>
  );
}
