'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Subject, Attendance } from '@/utils/storage';
import { getAttendancesAction } from '@/app/actions/dbActions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import {
  ArrowLeft,
  User,
  BookOpen,
  Calendar as CalendarIcon,
  QrCode
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog';

import { QRCodeSVG as QRCode } from 'qrcode.react';

interface SubjectDetailsStudentProps {
  subject: Subject;
  onBack: () => void;
}

export default function SubjectDetailsStudent({
  subject,
  onBack
}: SubjectDetailsStudentProps) {

  const { user } = useAuth();

  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && subject) {
      loadData();
    }
  }, [user, subject]);

  const loadData = async () => {

    if (!user) return;

    try {

      setLoading(true);
      setError("");

      const allAttendances = await getAttendancesAction();

      const myAttendances = allAttendances.filter(
        (a) =>
          a.studentId === user.id &&
          a.subjectId === subject.id
      );

      setAttendances(myAttendances);

      const today = new Date().toDateString();

      const todaysAttendance = myAttendances.find(
        (a) =>
          new Date(a.date).toDateString() === today &&
          a.timeIn
      );

      setHasCheckedIn(!!todaysAttendance);

    } catch (err) {

      console.error(err);
      setError("Failed to load attendance data.");

    } finally {

      setLoading(false);

    }
  };

  if (!user) return null;

  /* =============================
     ATTENDANCE METRICS
  ============================= */

  const presentCount = attendances.filter(
    (a) => a.status === "present"
  ).length;

  const lateCount = attendances.filter(
    (a) => a.status === "late"
  ).length;

  const totalClasses = attendances.length;

  const attendanceRate =
    totalClasses === 0
      ? 0
      : Math.round(
          ((presentCount + lateCount) / totalClasses) * 100
        );

  const qrValue = user.id;

  return (

    <div className="min-h-screen bg-muted/20 pb-20">

      {/* HEADER */}

      <header className="bg-background border-b sticky top-0 z-10">

        <div className="container mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <Button
              variant="ghost"
              onClick={onBack}
              size="icon"
              className="rounded-xl"
            >
              <ArrowLeft className="w-5 h-5"/>
            </Button>

            <div>

              <h1 className="text-2xl font-bold">
                {subject.name}
              </h1>

              <p className="text-xs text-muted-foreground">

                {subject.schedules
                  ?.map(
                    (s) => `${s.day} • ${s.startTime}`
                  )
                  .join(" | ")}

              </p>

            </div>

          </div>

          {/* QR BUTTON */}

          <Dialog>

            <DialogTrigger asChild>

              <Button
                className="gap-2"
                disabled={loading}
              >
                <QrCode className="h-4 w-4"/>

                {hasCheckedIn
                  ? "Checked In"
                  : "Show QR"}

              </Button>

            </DialogTrigger>

            <DialogContent className="sm:max-w-md">

              <DialogHeader>

                <DialogTitle>
                  Scan for Attendance
                </DialogTitle>

                <DialogDescription>
                  Ask your instructor to scan this QR code.
                </DialogDescription>

              </DialogHeader>

              <div className="flex justify-center p-4 bg-white rounded-lg">

                <QRCode
                  value={qrValue}
                  size={240}
                />

              </div>

            </DialogContent>

          </Dialog>

        </div>

      </header>

      {/* MAIN */}

      <main className="container mx-auto px-6 py-10 space-y-10 max-w-6xl">

        {/* STUDENT PROFILE */}

        <Card>

          <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">

            <div className="w-32 h-32 rounded-3xl bg-muted flex items-center justify-center overflow-hidden">

              {user.profilePic ? (

                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />

              ) : (

                <User className="w-12 h-12 text-muted-foreground"/>

              )}

            </div>

            <div>

              <h3 className="text-3xl font-bold">
                {user.name}
              </h3>

              <div className="flex gap-6 mt-4 text-sm">

                <div>

                  <p className="text-muted-foreground">
                    Student ID
                  </p>

                  <p className="font-semibold">
                    {user.id}
                  </p>

                </div>

                <div>

                  <p className="text-muted-foreground">
                    Year Level
                  </p>

                  <p className="font-semibold">
                    Year {user.year}
                  </p>

                </div>

              </div>

            </div>

          </CardContent>

        </Card>

        {/* SUBJECT + ATTENDANCE */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* SUBJECT INFO */}

          <Card>

            <CardHeader>

              <CardTitle className="flex items-center gap-2">

                <BookOpen className="w-5 h-5 text-primary"/>

                Subject Information

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              <div>

                <p className="text-sm text-muted-foreground">
                  Instructor
                </p>

                <p className="font-semibold">
                  {subject.teacherName}
                </p>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Schedule
                </p>

                {subject.schedules?.map((s,i)=>(
                  <p key={i} className="font-semibold">
                    {s.day} • {s.startTime}
                  </p>
                ))}

              </div>

            </CardContent>

          </Card>

          {/* ATTENDANCE METRICS */}

          <Card>

            <CardHeader>

              <CardTitle className="flex items-center gap-2">

                <CalendarIcon className="w-5 h-5 text-primary"/>

                Attendance Metrics

              </CardTitle>

            </CardHeader>

            <CardContent>

              {loading ? (

                <div className="grid grid-cols-3 gap-4">

                  <Skeleton className="h-20"/>
                  <Skeleton className="h-20"/>
                  <Skeleton className="h-20"/>

                </div>

              ) : error ? (

                <p className="text-red-500 text-sm">
                  {error}
                </p>

              ) : (

                <div className="grid grid-cols-3 gap-4 text-center">

                  <div className="p-4 rounded-xl bg-green-50">

                    <p className="text-xs text-green-600">
                      Present
                    </p>

                    <p className="text-3xl font-bold text-green-700">
                      {presentCount}
                    </p>

                  </div>

                  <div className="p-4 rounded-xl bg-yellow-50">

                    <p className="text-xs text-yellow-600">
                      Late
                    </p>

                    <p className="text-3xl font-bold text-yellow-700">
                      {lateCount}
                    </p>

                  </div>

                  <div className="p-4 rounded-xl bg-blue-50">

                    <p className="text-xs text-blue-600">
                      Rate
                    </p>

                    <p className="text-3xl font-bold text-blue-700">
                      {attendanceRate}%
                    </p>

                  </div>

                </div>

              )}

            </CardContent>

          </Card>

        </div>

      </main>

    </div>

  );

}