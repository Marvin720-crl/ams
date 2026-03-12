'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getSubjectsAction, getEnrollmentsAction, getClassworksAction, getSubmissionsAction } from '@/app/actions/dbActions';
import { Subject, Enrollment, Classwork as ClassworkType, Submission } from '@/utils/storage';
import { Loader2, BookOpen, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SubjectClasswork from './Classwork/SubjectClasswork';
import { Badge } from '@/components/ui/badge';

export default function Classwork() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classworks, setClassworks] = useState<ClassworkType[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [allSubjects, allEnrollments, allClassworks, allSubmissions] = await Promise.all([
        getSubjectsAction(),
        getEnrollmentsAction(),
        getClassworksAction(),
        getSubmissionsAction(),
      ]);

      const myEnrollments = allEnrollments.filter(
        (e: Enrollment) => e.studentId === user.id && e.status === 'approved'
      );
      const mySubjectIds = myEnrollments.map((e) => e.subjectId);
      const mySubjects = allSubjects.filter((s: Subject) => mySubjectIds.includes(s.id));
      
      setSubjects(mySubjects);
      setClassworks(allClassworks);
      // Filter submissions for this student only to check status
      setSubmissions(allSubmissions.filter(s => s.studentId === user.id));
    } catch (error) {
      console.error("Failed to load classwork data", error);
    } finally {
      setLoading(false);
    }
  };
  
  const getPendingCount = (subjectId: string) => {
    const now = new Date();
    // Filter classworks for this subject that are published
    const subjectClassworks = classworks.filter(cw => cw.subjectId === subjectId && cw.status === 'published');
    
    // Count classworks that are NOT submitted AND the due date is in the future
    return subjectClassworks.filter(cw => {
      const hasSubmitted = submissions.some(s => s.classworkId === cw.id);
      const isPastDue = new Date(cw.dueDate) < now;
      return !hasSubmitted && !isPastDue;
    }).length;
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary"/></div>
  }

  if (selectedSubject) {
    return <SubjectClasswork subject={selectedSubject} onBack={() => setSelectedSubject(null)} />;
  }

  return (
    <div>
      <h2 className="text-3xl mb-2 font-black tracking-tight">CLASSWORK</h2>
      <p className="text-gray-600 mb-8">Select a subject to view your tasks and submissions.</p>
      
      {subjects.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-dashed">
            <BookOpen size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">You are not enrolled in any subjects with classwork.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
            {subjects.map(subject => {
                const pendingCount = getPendingCount(subject.id);
                return (
                    <Card 
                        key={subject.id} 
                        className="cursor-pointer hover:shadow-2xl transition-all duration-300 relative border-primary/5 hover:border-primary/20 hover:-translate-y-1"
                        onClick={() => setSelectedSubject(subject)}
                    >
                        {pendingCount > 0 && (
                            <div className="absolute -top-3 -right-3 z-20">
                                <span className="relative flex h-8 w-8">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-8 w-8 bg-red-600 border-4 border-white items-center justify-center text-white shadow-lg">
                                        <Bell className="h-4 w-4" />
                                    </span>
                                </span>
                            </div>
                        )}
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <h3 className="font-black text-xl text-primary leading-tight uppercase">{subject.name}</h3>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{subject.teacherName}</p>
                                </div>
                                {pendingCount > 0 && (
                                    <Badge variant="destructive" className="ml-2 font-black text-[10px] tracking-tighter px-2 py-0.5 rounded-sm animate-pulse">
                                        {pendingCount} TASK{pendingCount > 1 ? 'S' : ''}
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
      )}
    </div>
  );
}
