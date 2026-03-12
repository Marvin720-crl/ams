'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus, AlertCircle, Loader2, Info } from 'lucide-react';
import {
  addEnrollmentAction,
  getSubjectsAction,
  getUsersAction,
  getEnrollmentsAction,
  getTermEnrollmentsAction
} from '@/app/actions/dbActions';
import { toast } from 'sonner';

export default function EnrollSubject() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [myApprovedTerms, setMyApprovedTerms] = useState<string[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadInitialData();
    }
  }, [user]);

  useEffect(() => {
    if (selectedTeacher) {
      loadSubjectsForTeacher(selectedTeacher);
    } else {
      setSubjects([]);
    }
  }, [selectedTeacher, myApprovedTerms]);

  const loadInitialData = async () => {
    if (!user) return;
    setInitialLoading(true);

    try {
      const [allUsers, allSubjects, allTermEnrollments] = await Promise.all([
        getUsersAction(),
        getSubjectsAction(),
        getTermEnrollmentsAction()
      ]);

      // 1. Find terms the student is approved for
      const approvedTerms = allTermEnrollments
        .filter(te => te.studentId === user.id && te.status === 'approved')
        .map(te => te.termId);
      
      setMyApprovedTerms(approvedTerms);

      // 2. Find teachers who have subjects in those specific terms
      const teacherUsers = allUsers.filter(u => u.role === 'teacher');
      const teachersWithSubjects = teacherUsers.filter(t =>
        allSubjects.some(s => s.teacherId === t.id && approvedTerms.includes(s.termId))
      );

      setTeachers(teachersWithSubjects);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load enrollment data.");
    } finally {
      setInitialLoading(false);
    }
  };

  const loadSubjectsForTeacher = async (teacherId: string) => {
    if (!user) return;
    const allSubjects = await getSubjectsAction();
    
    // Filter subjects by Teacher ID AND must match Student's Approved Terms
    const filtered = allSubjects.filter(s => 
      s.teacherId === teacherId && 
      myApprovedTerms.includes(s.termId)
    );

    setSubjects(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user || !selectedTeacher || !selectedSubject) {
      setError('Please select both teacher and subject.');
      return;
    }

    setLoading(true);
    try {
      const enrollments = await getEnrollmentsAction();
      const existing = enrollments.find(
        (en: any) => en.studentId === user.id && en.subjectId === selectedSubject
      );

      if (existing) {
        setError(`You already requested this subject. Status: ${existing.status}`);
        setLoading(false);
        return;
      }

      const newEnrollment = {
        id: `ENR-${Date.now()}`,
        studentId: user.id,
        subjectId: selectedSubject,
        enrolledAt: new Date().toISOString(),
        status: 'pending' as const
      };

      await addEnrollmentAction(newEnrollment);
      setSelectedTeacher('');
      setSelectedSubject('');
      toast.success('Enrollment request submitted! Wait for teacher approval.');
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

  // If student is not enrolled in any term, show a restricted view
  if (myApprovedTerms.length === 0) {
    return (
      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-primary uppercase">Enroll in Subject</h2>
          <p className="text-muted-foreground font-bold text-[10px] tracking-widest uppercase">Request Registration</p>
        </div>
        <div className="bg-amber-50 border-2 border-amber-100 text-amber-900 p-10 rounded-[2.5rem] flex flex-col items-center text-center gap-6 shadow-xl shadow-amber-900/5">
          <div className="h-16 w-16 rounded-2xl bg-amber-200/50 flex items-center justify-center text-amber-600">
            <Info size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black uppercase tracking-tighter">Term Enrollment Required</h3>
            <p className="text-sm font-bold text-amber-800/70 leading-relaxed max-w-md">
              You must be enrolled and approved in an <strong>Active Academic Term</strong> before you can register for subjects. 
              Please go to your dashboard to request term enrollment first.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-4xl font-black tracking-tighter text-primary uppercase">Enroll in Subject</h2>
        <p className="text-muted-foreground font-bold text-[10px] tracking-[0.2em] uppercase mt-2">Registration Portal v1.0</p>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border-2 border-red-100 text-red-700 px-6 py-4 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-2xl border border-primary/5 p-10 space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-1">Certified Faculty</label>
          <select
            value={selectedTeacher}
            onChange={(e) => {
              setSelectedTeacher(e.target.value);
              setSelectedSubject('');
            }}
            className="w-full border-2 border-primary/5 bg-muted/20 rounded-2xl px-6 py-5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-black text-primary transition-all appearance-none cursor-pointer"
          >
            <option value="">-- SELECT INSTRUCTOR --</option>
            {teachers.map(t => (
              <option key={t.id} value={t.id}>
                {t.name.toUpperCase()} ({t.id})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-1">Available Load (Your Terms)</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={!selectedTeacher || subjects.length === 0}
            className="w-full border-2 border-primary/5 bg-muted/20 rounded-2xl px-6 py-5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-black text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all appearance-none cursor-pointer"
          >
            <option value="">
              {!selectedTeacher ? "Awaiting Instructor Choice..." : subjects.length === 0 ? "No Compatible Subjects Found" : "-- SELECT SUBJECT --"}
            </option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>
                {s.name.toUpperCase()}
              </option>
            ))}
          </select>
          {selectedTeacher && subjects.length === 0 && (
            <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest mt-2 ml-1">
              Note: This teacher has no subjects assigned to your approved terms.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !selectedSubject}
          className="w-full h-16 flex items-center justify-center gap-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:scale-100"
        >
          {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={22} />}
          Authorize Subject Enrollment
        </button>
      </form>

      <div className="p-6 bg-primary/5 border-2 border-primary/10 rounded-[2rem] text-center">
        <p className="text-[9px] font-bold text-primary/60 uppercase leading-relaxed tracking-tighter">
          Registration Policy: You can only enroll in subjects that match your currently approved academic term. 
          If a subject is missing, verify your term status with the Registrar.
        </p>
      </div>
    </div>
  );
}
