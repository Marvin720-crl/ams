
'use client';

import { Subject } from '@/utils/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface StudentCalendarProps {
  subjects: Subject[];
}

export default function StudentCalendar({ subjects }: StudentCalendarProps) {
  const groupedByDay = subjects.reduce((acc, subject) => {
    const day = subject.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(subject);
    return acc;
  }, {} as Record<string, Subject[]>);

  // Sort subjects by time within each day
  Object.keys(groupedByDay).forEach(day => {
    groupedByDay[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Academic Calendar</h2>
        <p className="text-muted-foreground">Your weekly schedule of enrolled subjects</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {DAYS.map((day) => (
          <Card key={day} className="border-primary/5">
            <CardHeader className="pb-3 border-b bg-accent/10">
              <CardTitle className="text-lg font-bold">{day}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {groupedByDay[day] && groupedByDay[day].length > 0 ? (
                <div className="space-y-3">
                  {groupedByDay[day].map((subject) => (
                    <div
                      key={subject.id}
                      className="p-4 rounded-xl border-l-4 bg-white shadow-sm"
                      style={{ borderLeftColor: '#E30613' }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-bold text-[#E30613]">{subject.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {subject.startTime} • Instructor: {subject.teacherName}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-6 text-center italic">No classes scheduled</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
