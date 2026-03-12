'use client';

import { Subject, Schedule } from '@/utils/storage';

import {
Card,
CardContent,
CardHeader,
CardTitle
} from '@/components/ui/card';

import {
Calendar,
Clock,
User
} from 'lucide-react';

const DAYS = [
'Monday',
'Tuesday',
'Wednesday',
'Thursday',
'Friday',
'Saturday',
'Sunday'
];

interface StudentCalendarProps {
  subjects: Subject[];
}

export default function StudentCalendar({ subjects }: StudentCalendarProps) {

  const groupedByDay =
    subjects.reduce((acc, subject) => {

      if(subject.schedules){

        subject.schedules.forEach(schedule => {

          if(!acc[schedule.day]){

            acc[schedule.day] = [];

          }

          acc[schedule.day].push({
            ...subject,
            ...schedule
          });

        });

      }

      return acc;

    }, {} as Record<string,(Subject & Schedule)[]>);

  /* Sort schedules by start time */

  Object.keys(groupedByDay).forEach(day => {

    groupedByDay[day].sort(
      (a,b) => a.startTime.localeCompare(b.startTime)
    );

  });

  return (

    <div className="space-y-6">

      {/* Header */}

      <div>

        <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">

          <Calendar size={20} />

          Weekly Schedule

        </h2>

        <p className="text-muted-foreground text-sm">

          Your enrolled class timetable

        </p>

      </div>

      {/* Calendar Grid */}

      <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-3
      gap-5
      ">

        {DAYS.map(day => {

          const daySubjects = groupedByDay[day] || [];

          return (

            <Card key={day} className="border">

              <CardHeader className="pb-3 border-b bg-muted/30">

                <CardTitle className="text-base font-semibold">

                  {day}

                </CardTitle>

              </CardHeader>

              <CardContent className="pt-4 space-y-3">

                {daySubjects.length === 0 ? (

                  <p className="
                  text-sm
                  text-muted-foreground
                  text-center
                  py-6
                  italic
                  ">

                    No classes

                  </p>

                ) : (

                  daySubjects.map((subject,index)=>(

                    <div
                      key={`${subject.id}-${index}`}
                      className="
                      border
                      rounded-lg
                      p-3
                      hover:shadow-sm
                      transition
                      "
                    >

                      {/* Subject */}

                      <p className="
                      font-semibold
                      text-primary
                      ">

                        {subject.name}

                      </p>

                      {/* Time */}

                      <p className="
                      flex
                      items-center
                      gap-1
                      text-sm
                      text-muted-foreground
                      mt-1
                      ">

                        <Clock size={14} />

                        {subject.startTime} - {subject.dismissalTime}

                      </p>

                      {/* Teacher */}

                      <p className="
                      flex
                      items-center
                      gap-1
                      text-xs
                      text-muted-foreground
                      mt-1
                      ">

                        <User size={12} />

                        {subject.teacherName || 'Instructor'}

                      </p>

                    </div>

                  ))

                )}

              </CardContent>

            </Card>

          );

        })}

      </div>

    </div>

  );

}