'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import {
  UserPlus,
  AlertCircle,
  Loader2,
  Info,
  CheckCircle2,
  BookOpen
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

export default function EnrollSubject() {
  const { user } = useAuth();

  const [teachers, setTeachers] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [myApprovedTerms, setMyApprovedTerms] = useState<string[]>([]);
  const [existingEnrollments, setExistingEnrollments] = useState<any[]>([]);

  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  /* -----------------------------
     LOAD INITIAL DATA
  ----------------------------- */

  useEffect(() => {
    if (user) loadInitialData();
  }, [user]);

  useEffect(() => {
    if (selectedTeacher) {
      loadSubjectsForTeacher(selectedTeacher);
    } else {
      setSubjects([]);
      setSelectedSubjectIds([]);
    }
  }, [selectedTeacher, myApprovedTerms]);

  const loadInitialData = async () => {
    if (!user) return;
    setInitialLoading(true);

    try {
      const [
        users,
        allSubjects,
        termEnrollments,
        enrollments
      ] = await Promise.all([
        getUsersAction(),
        getSubjectsAction(),
        getTermEnrollmentsAction(),
        getEnrollmentsAction()
      ]);

      const approvedTerms = termEnrollments
        .filter(te => te.studentId === user.id && te.status === 'approved')
        .map(te => te.termId);

      setMyApprovedTerms(approvedTerms);
      setExistingEnrollments(enrollments.filter(e => e.studentId === user.id));

      const teacherUsers = users.filter(u => u.role === 'teacher');

      const teachersWithSubjects = teacherUsers.filter(t =>
        allSubjects.some(
          s => s.teacherId === t.id && approvedTerms.includes(s.termId)
        )
      );

      setTeachers(teachersWithSubjects);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load enrollment data.");
    } finally {
      setInitialLoading(false);
    }
  };

  /* -----------------------------
     LOAD SUBJECTS BY TEACHER
  ----------------------------- */

  const loadSubjectsForTeacher = async (teacherId: string) => {
    if (!user) return;
    const allSubjects = await getSubjectsAction();

    const filtered = allSubjects.filter(s =>
      s.teacherId === teacherId &&
      myApprovedTerms.includes(s.termId)
    );

    setSubjects(filtered);
    setSelectedSubjectIds([]); // Reset selection when teacher changes
  };

  /* -----------------------------
     SELECTION HANDLER
  ----------------------------- */

  const toggleSubject = (id: string) => {
    setSelectedSubjectIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  /* -----------------------------
     SUBMIT ENROLLMENT
  ----------------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user || selectedSubjectIds.length === 0) {
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
          studentId: user.id,
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
      loadInitialData(); // Refresh list

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
          <h2 className="text-2xl font-bold text-primary">ENROLL IN SUBJECT</h2>
          <p className="text-sm text-muted-foreground">Request registration</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 text-amber-900 p-8 rounded-xl text-center space-y-4">
          <div className="flex justify-center"><Info size={32} /></div>
          <h3 className="font-semibold">Term Enrollment Required</h3>
          <p className="text-sm text-amber-800">You must first be approved in an active academic term before registering subjects.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h2 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">
          ENROLL IN SUBJECT
        </h2>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">
          Submit multiple subject enrollment requests
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
            Instructor / Faculty
          </Label>
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="w-full h-14 bg-muted/30 border-none rounded-2xl px-6 font-bold focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
          >
            <option value="">Select Instructor</option>
            {teachers.map(t => (
              <option key={t.id} value={t.id}>{t.name} ({t.id})</option>
            ))}
          </select>
        </div>

        {selectedTeacher && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
              Available Subjects ({subjects.length})
            </Label>
            
            {subjects.length === 0 ? (
              <div className="p-10 border-2 border-dashed rounded-3xl text-center">
                <BookOpen className="mx-auto text-muted-foreground/30 mb-3" size={32} />
                <p className="text-xs font-bold text-muted-foreground uppercase">No subjects published by this teacher for your term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map(s => {
                  const isEnrolled = existingEnrollments.some(e => e.subjectId === s.id);
                  const isSelected = selectedSubjectIds.includes(s.id);
                  
                  return (
                    <div 
                      key={s.id} 
                      onClick={() => !isEnrolled && toggleSubject(s.id)}
                      className={cn(
                        "p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group",
                        isSelected ? "border-primary bg-primary/5" : "border-primary/5 hover:border-primary/20 bg-white",
                        isEnrolled && "opacity-50 cursor-not-allowed grayscale"
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
                      ) : (
                        <Checkbox 
                          checked={isSelected}
                          onCheckedChange={() => toggleSubject(s.id)}
                          className="rounded-lg h-6 w-6 border-2 border-primary/20 data-[state=checked]:bg-primary"
                        />
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
          Protocol: Only subjects within your approved academic term are visible. Requests are subject to instructor validation.
        </p>
      </div>
    </div>
  );
}
