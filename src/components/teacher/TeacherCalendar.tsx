'use client';

import { Subject, Schedule } from '@/utils/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

interface TeacherCalendarProps {
  subjects: Subject[];
}

export default function TeacherCalendar({ subjects }: TeacherCalendarProps) {

  const groupedByDay = subjects.reduce((acc, subject) => {

    if (subject.schedules) {
      subject.schedules.forEach(schedule => {

        if (!acc[schedule.day]) {
          acc[schedule.day] = [];
        }

        acc[schedule.day].push({
          ...subject,
          ...schedule
        });

      });
    }

    return acc;

  }, {} as Record<string, (Subject & Schedule)[]>);

  /* Sort schedules by start time */

  Object.keys(groupedByDay).forEach(day => {
    groupedByDay[day]?.sort((a, b) => {
      if (a.startTime && b.startTime) {
        return a.startTime.localeCompare(b.startTime);
      }
      return 0;
    });
  });

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Schedule
        </h2>

        <p className="text-gray-500 mt-1">
          Your weekly class schedule overview
        </p>
      </div>


      {/* Schedule Grid */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {DAYS.map((day) => (

          <Card
            key={day}
            className="
              rounded-2xl
              shadow-sm
              border
              hover:shadow-lg
              transition
            "
          >

            {/* Day Header */}

            <CardHeader className="pb-3 border-b">

              <CardTitle className="
                text-lg
                font-semibold
                text-gray-700
                flex
                items-center
                justify-between
              ">
                {day}

                <span className="
                  text-xs
                  text-gray-400
                  font-normal
                ">
                  {groupedByDay[day]?.length || 0} classes
                </span>

              </CardTitle>

            </CardHeader>


            {/* Day Content */}

            <CardContent className="pt-4">

              {groupedByDay[day] && groupedByDay[day].length > 0 ? (

                <div className="space-y-3">

                  {groupedByDay[day].map((subject, index) => (

                    <div
                      key={`${subject.id}-${index}`}
                      className="
                        group
                        p-4
                        rounded-xl
                        border
                        hover:border-primary/40
                        hover:bg-primary/5
                        transition
                      "
                    >

                      <div className="flex items-center justify-between">

                        {/* Subject Name */}

                        <div className="flex-1">

                          <p className="
                            font-semibold
                            text-gray-800
                          ">
                            {subject.name}
                          </p>

                          <div className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-gray-500
                            mt-1
                          ">

                            <Clock size={14} />

                            <span>
                              {subject.startTime} - {subject.dismissalTime}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  py-10
                  text-gray-400
                ">

                  <Clock size={28} className="mb-2 opacity-60" />

                  <p className="text-sm">
                    No classes scheduled
                  </p>

                </div>

              )}

            </CardContent>

          </Card>

        ))}

      </div>

    </div>
  );
}