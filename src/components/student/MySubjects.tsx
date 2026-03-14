'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import {
  getEnrollmentsAction,
  getSubjectsAction
} from '@/app/actions/dbActions';

import {
  Subject,
  Enrollment
} from '@/utils/storage';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

import StudentCalendar from './StudentCalendar';
import SubjectDetailsStudent from './SubjectDetailsStudent';

import {
  Card,
  CardContent
} from '@/components/ui/card';

import {
  Calendar,
  BookOpen,
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function MySubjects() {
  const { user } = useAuth();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSubjects();
    }
  }, [user]);

  const loadSubjects = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [allEnrollments, allSubjects] = await Promise.all([
        getEnrollmentsAction(),
        getSubjectsAction()
      ]);

      const myEnrollments = allEnrollments.filter(e => e.studentId === user.id);
      setEnrollments(myEnrollments);
      setSubjects(allSubjects);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const approvedSubjects = useMemo(() => {
    const approvedIds = enrollments
      .filter(e => e.status === 'approved')
      .map(e => e.subjectId);
    return subjects.filter(s => approvedIds.includes(s.id));
  }, [subjects, enrollments]);

  const pendingSubjects = useMemo(() => {
    const pendingIds = enrollments
      .filter(e => e.status === 'pending')
      .map(e => e.subjectId);
    return subjects.filter(s => pendingIds.includes(s.id));
  }, [subjects, enrollments]);

  if (selectedSubject) {
    return (
      <SubjectDetailsStudent
        subject={selectedSubject}
        onBack={() => setSelectedSubject(null)}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">
          My Academic Load
        </h2>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">
          Manage your active and pending course subjects
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="subjects" className="w-full">
        <TabsList className="bg-white border-2 border-primary/5 h-14 p-1.5 rounded-full mb-8">
          <TabsTrigger value="subjects" className="rounded-full font-black uppercase text-[10px] tracking-widest px-8 data-[state=active]:bg-primary data-[state=active]:text-white">
            Current Subjects
          </TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-full font-black uppercase text-[10px] tracking-widest px-8 data-[state=active]:bg-primary data-[state=active]:text-white">
            Weekly Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="mt-0">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : (
            <div className="space-y-10">
              {/* APPROVED SUBJECTS */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={18} />
                  </div>
                  <h3 className="font-black text-sm uppercase tracking-widest text-foreground">Enrolled ({approvedSubjects.length})</h3>
                </div>

                {approvedSubjects.length === 0 ? (
                  <div className="p-12 border-2 border-dashed rounded-[2.5rem] text-center bg-white/50">
                    <BookOpen className="mx-auto text-muted-foreground/20 mb-4" size={48} />
                    <p className="text-sm font-bold text-muted-foreground uppercase">Walang aktibong subjects.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {approvedSubjects.map(subject => {
                      const schedule = subject.schedules?.[0];
                      return (
                        <Card
                          key={subject.id}
                          onClick={() => setSelectedSubject(subject)}
                          className="cursor-pointer hover:shadow-2xl transition-all border-primary/5 hover:border-primary/20 hover:-translate-y-1 bg-white rounded-[2rem] overflow-hidden group"
                        >
                          <div className="h-2 bg-primary" />
                          <CardContent className="p-8 space-y-4">
                            <div className="space-y-1">
                              <h3 className="font-black text-xl text-primary leading-tight uppercase group-hover:text-primary/80 transition-colors">
                                {subject.name}
                              </h3>
                              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{subject.code || 'SUBJ'}</p>
                            </div>

                            {schedule && (
                              <div className="flex items-center gap-2 text-xs font-bold text-foreground/70 bg-muted/30 p-3 rounded-xl">
                                <Clock size={14} className="text-primary" />
                                {schedule.day} • {schedule.startTime}
                              </div>
                            )}

                            <div className="border-t pt-4 flex justify-between items-center">
                              <div>
                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Instructor</p>
                                <p className="text-xs font-bold">{subject.teacherName}</p>
                              </div>
                              <Badge variant="success" className="h-6 font-black text-[9px] uppercase tracking-tighter">Active</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* PENDING SUBJECTS */}
              {pendingSubjects.length > 0 && (
                <section className="pt-4 border-t border-primary/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                      <AlertCircle size={18} />
                    </div>
                    <h3 className="font-black text-sm uppercase tracking-widest text-foreground">Pending Approval ({pendingSubjects.length})</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingSubjects.map(subject => (
                      <Card
                        key={subject.id}
                        className="bg-amber-50/50 border-amber-100 rounded-[2rem] shadow-sm overflow-hidden"
                      >
                        <CardContent className="p-8 space-y-4">
                          <div className="space-y-1">
                            <h3 className="font-black text-lg text-amber-900 leading-tight uppercase opacity-70">
                              {subject.name}
                            </h3>
                            <p className="text-[9px] font-black text-amber-700/50 uppercase tracking-[0.2em]">{subject.code || 'SUBJ'}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-widest">
                            <Loader2 size={14} className="animate-spin" />
                            Awaiting Instructor
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="mt-0">
          <StudentCalendar subjects={approvedSubjects} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
