'use client';

import React, { useState, useEffect } from 'react';

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
Loader2
} from 'lucide-react';

export default function MySubjects() {

  const { user } = useAuth();

  const [subjects,setSubjects] = useState<Subject[]>([]);
  const [selectedSubject,setSelectedSubject] = useState<Subject | null>(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    if(user){

      loadSubjects();

    }

  },[user]);

  const loadSubjects = async () => {

    if(!user) return;

    setLoading(true);

    const enrollments:Enrollment[] =
      await getEnrollmentsAction();

    const allSubjects:Subject[] =
      await getSubjectsAction();

    const approvedEnrollments =
      enrollments.filter(
        e =>
          e.studentId === user.id &&
          e.status === 'approved'
      );

    const subjectIds =
      approvedEnrollments.map(e=>e.subjectId);

    const studentSubjects =
      allSubjects.filter(s =>
        subjectIds.includes(s.id)
      );

    setSubjects(studentSubjects);

    setLoading(false);

  };

  if(selectedSubject){

    return (

      <SubjectDetailsStudent
        subject={selectedSubject}
        onBack={()=>setSelectedSubject(null)}
      />

    );

  }

  return (

    <div className="space-y-6">

      {/* Header */}

      <div>

        <h2 className="text-2xl sm:text-3xl font-bold">

          My Subjects

        </h2>

        <p className="text-gray-500">

          View and manage your enrolled subjects

        </p>

      </div>

      {/* Tabs */}

      <Tabs defaultValue="subjects" className="w-full">

        <TabsList
          className="
          grid
          grid-cols-2
          max-w-sm
          bg-muted
          rounded-lg
          "
        >

          <TabsTrigger value="subjects">

            My Subjects

          </TabsTrigger>

          <TabsTrigger value="schedule">

            Weekly Schedule

          </TabsTrigger>

        </TabsList>

        {/* SUBJECT LIST */}

        <TabsContent value="subjects" className="mt-6">

          {loading ? (

            <div className="flex justify-center py-12">

              <Loader2
                className="animate-spin text-primary"
                size={32}
              />

            </div>

          ) : subjects.length === 0 ? (

            <div className="
            text-center
            py-16
            text-gray-400
            ">

              <BookOpen
                size={48}
                className="mx-auto mb-4"
              />

              No enrolled subjects yet

            </div>

          ) : (

            <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            ">

              {subjects.map(subject=>{

                const schedule =
                  subject.schedules?.[0];

                return(

                  <Card
                    key={subject.id}
                    onClick={()=>setSelectedSubject(subject)}
                    className="
                    cursor-pointer
                    hover:shadow-lg
                    transition
                    border
                    "
                  >

                    <div className="h-1 bg-primary"/>

                    <CardContent className="p-5 space-y-3">

                      <h3 className="font-semibold text-lg">

                        {subject.name}

                      </h3>

                      {schedule && (

                        <p className="
                        text-sm
                        text-muted-foreground
                        flex
                        items-center
                        gap-1
                        ">

                          <Calendar size={14}/>

                          {schedule.day} • {schedule.startTime}

                        </p>

                      )}

                      <div className="border-t pt-3">

                        <p className="text-xs text-muted-foreground">

                          Instructor

                        </p>

                        <p className="text-sm font-medium">

                          {subject.teacherName || "N/A"}

                        </p>

                      </div>

                    </CardContent>

                  </Card>

                );

              })}

            </div>

          )}

        </TabsContent>

        {/* WEEKLY CALENDAR */}

        <TabsContent value="schedule" className="mt-6">

          <StudentCalendar subjects={subjects} />

        </TabsContent>

      </Tabs>

    </div>

  );

}