
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getEnrollmentsAction, getSubjectsAction } from '@/app/actions/dbActions';
import { Subject, Enrollment } from '@/utils/storage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentCalendar from './StudentCalendar';
import SubjectDetailsStudent from './SubjectDetailsStudent';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function MySubjects() {
    const { user } = useAuth();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

    useEffect(() => {
        if(user) loadSubjects();
    }, [user]);

    const loadSubjects = async () => {
        if(!user) return;
        const enrollments: Enrollment[] = await getEnrollmentsAction();
        const allSubjects: Subject[] = await getSubjectsAction();
        
        const approvedEnrollments = enrollments.filter(
          (e: any) => e.studentId === user.id && e.status === 'approved'
        );
        const subjectIds = approvedEnrollments.map(e => e.subjectId);
        const studentSubjects = allSubjects.filter(s => subjectIds.includes(s.id));

        setSubjects(studentSubjects);
    };

    if (selectedSubject) {
        return <SubjectDetailsStudent subject={selectedSubject} onBack={() => setSelectedSubject(null)} />;
    }

    return (
        <div>
          <h2 className="text-3xl mb-2">My Subjects</h2>
          <p className="text-gray-600 mb-8">View and manage your enrolled subjects</p>

          <Tabs defaultValue="subjects" className="w-full">
            <TabsList className="bg-gray-200 p-1 rounded-full">
              <TabsTrigger value="subjects" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-full">My Subjects</TabsTrigger>
              <TabsTrigger value="schedule" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-full">Weekly Schedule</TabsTrigger>
            </TabsList>
            <TabsContent value="subjects" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map(subject => (
                  <Card key={subject.id} onClick={() => setSelectedSubject(subject)} className="cursor-pointer overflow-hidden transition-all hover:shadow-lg rounded-2xl">
                    <div className="h-2 bg-primary" />
                    <CardContent className="p-6">
                       <h3 className="font-bold text-lg">{subject.name}</h3>
                       <p className="text-sm text-gray-500 flex items-center gap-2 mt-2"><Calendar size={14} /> {subject.day} • {subject.startTime}</p>
                       <div className="border-t my-4" />
                       <p className="text-xs text-gray-400 font-bold uppercase">Authorized Faculty</p>
                       <p className="font-semibold mt-1">{subject.teacherName}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="schedule" className="mt-6">
              <StudentCalendar subjects={subjects} />
            </TabsContent>
          </Tabs>
        </div>
    );
}
