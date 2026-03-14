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
  User as UserIcon
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

  // Extract stable primitives for dependencies
  const userId = user?.id;
  const userDepartment = user?.department || 'college'; // Fallback to college if missing

  /* -----------------------------
     LOAD INITIAL DATA
  ----------------------------- */

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

      // Load teachers from the same department OR those with subjects in approved terms
      const teacherUsers = users.filter(u => 
        u.role === 'teacher' && 
        (!u.department || u.department === userDepartment)
      );

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
  }, [userId, userDepartment]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  /* -----------------------------
     DERIVED FILTERED SUBJECTS
  ----------------------------- */

  const displayedSubjects = useMemo(() => {
    if (!selectedTeacher || !userId) return [];
    
    // resilient filtering: if userDepartment is missing, show based on teacher only
    return allAvailableSubjects.filter(s =>
      s.teacherId === selectedTeacher &&
      myApprovedTerms.includes(s.termId) &&
      (!s.department || s.department === userDepartment)
    );
  }, [allAvailableSubjects, selectedTeacher, myApprovedTerms, userId, userDepartment]);

  /* -----------------------------
     SELECTION HANDLER
  ----------------------------- */

  const toggleSubject = useCallback((id: string) => {
    setSelectedSubjectIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  /* -----------------------------
     SUBMIT ENROLLMENT
  ----------------------------- */

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
        toast.warning(`${failCount} subject(s) were requested na.`);
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
          <h2 className="text-2xl font-bold text-primary uppercase">ENROLL IN SUBJECT</h2>
          <p className="text-sm text-muted-foreground">Request registration</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 text-amber-900 p-8 rounded-xl text-center space-y-4">
          <div className="flex justify-center"><Info size={32} /></div>
          <h3 className="font-semibold">Term Enrollment Required</h3>
          <p className="text-sm text-amber-800">Kailangan mo munang mag-enroll sa active academic term bago makapili ng subjects.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h2 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">
          ENROLL IN SUBJECT ({userDepartment?.toUpperCase() || 'COLLEGE'})
        </h2>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">
          Ipinapakita lamang ang mga Instructor at Subjects para sa iyong department
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <AlertCircle size={18} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border-2 border-primary/5 rounded-[2rem] shadow-xl p-10 space-y-8">
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
            {userDepartment === 'shs' ? 'SHS Instructor' : 'College Instructor'}
          </Label>
          <div className="relative">
            <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 h-5 w-5 pointer-events-none" />
            <select
              value={selectedTeacher}
              onChange={(e) => {
                setSelectedTeacher(e.target.value);
                setSelectedSubjectIds([]);
              }}
              className="w-full h-14 bg-muted/30 border-none rounded-2xl pl-14 pr-6 font-bold focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
            >
              <option value="">Select Instructor</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.id})</option>
              ))}
            </select>
          </div>
        </div>

        {selectedTeacher && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
              Available Subjects ({displayedSubjects.length})
            </Label>
            
            {displayedSubjects.length === 0 ? (
              <div className="p-10 border-2 border-dashed rounded-3xl text-center">
                <BookOpen className="mx-auto text-muted-foreground/30 mb-3" size={32} />
                <p className="text-xs font-bold text-muted-foreground uppercase">Walang subjects na makita para sa Instructor na ito.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedSubjects.map(s => {
                  const isEnrolled = existingEnrollments.some(e => e.subjectId === s.id && e.status === 'approved');
                  const isPending = existingEnrollments.some(e => e.subjectId === s.id && e.status === 'pending');
                  const isSelected = selectedSubjectIds.includes(s.id);
                  
                  return (
                    <div 
                      key={s.id} 
                      onClick={() => {
                        if (!isEnrolled && !isPending) toggleSubject(s.id);
                      }}
                      className={cn(
                        "p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group",
                        isSelected ? "border-primary bg-primary/5" : "border-primary/5 hover:border-primary/20 bg-white",
                        (isEnrolled || isPending) && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex-1 pr-4">
                        <p className="font-black text-sm text-primary uppercase leading-tight">{s.name}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                            {s.code || 'SUBJ'} • {s.units || 3} Units
                          </span>
                        </div>
                      </div>
                      
                      {isEnrolled ? (
                        <div className="flex items-center gap-1 text-[9px] font-black text-green-600 uppercase">
                          <CheckCircle2 size={14} />
                          Enrolled
                        </div>
                      ) : isPending ? (
                        <div className="flex items-center gap-1 text-[9px] font-black text-amber-600 uppercase">
                          <Loader2 size={14} className="animate-spin" />
                          Pending
                        </div>
                      ) : (
                        <div className="flex items-center h-full pointer-events-none">
                          <Checkbox 
                            checked={isSelected}
                            className="rounded-lg h-6 w-6 border-2 border-primary/20 data-[state=checked]:bg-primary"
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
          className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-primary/20 gap-3"
        >
          {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={20} />}
          {selectedSubjectIds.length > 0 
            ? `Request Enrollment (${selectedSubjectIds.length})` 
            : 'Request Enrollment'}
        </Button>
      </form>

      <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl text-center">
        <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-relaxed">
          Protocol: Kasalukuyan kang nasa <span className="underline">{userDepartment?.toUpperCase() || 'GENERAL'}</span> department. Tanging mga kaugnay na tala ang iyong makikita.
        </p>
      </div>
    </div>
  );
}
