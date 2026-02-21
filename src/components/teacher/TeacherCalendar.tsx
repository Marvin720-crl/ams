'use client';

import { Subject } from '@/utils/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface TeacherCalendarProps {
  subjects: Subject[];
}

export default function TeacherCalendar({ subjects }: TeacherCalendarProps) {
  const groupedByDay = subjects.reduce((acc, subject) => {
    if (!acc[subject.day]) {
      acc[subject.day] = [];
    }
    acc[subject.day].push(subject);
    return acc;
  }, {} as Record<string, Subject[]>);

  // Sort subjects by time within each day
  Object.keys(groupedByDay).forEach(day => {
    if (groupedByDay[day]) {
      groupedByDay[day].sort((a, b) => {
        if (a.startTime && b.startTime) {
          return a.startTime.localeCompare(b.startTime);
        }
        return 0;
      });
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">My Schedule</h2>
        <p className="text-muted-foreground">Your weekly class schedule</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {DAYS.map((day) => (
          <Card key={day}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{day}</CardTitle>
            </CardHeader>
            <CardContent>
              {groupedByDay[day] && groupedByDay[day].length > 0 ? (
                <div className="space-y-3">
                  {groupedByDay[day].map((subject) => (
                    <div
                      key={subject.id}
                      className="p-3 rounded-lg border-l-4"
                      style={{ borderLeftColor: '#E30613', backgroundColor: 'rgba(227, 6, 19, 0.05)' }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{subject.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {subject.startTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">No classes scheduled</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
