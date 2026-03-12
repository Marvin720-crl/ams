'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Subject, Attendance } from '@/utils/storage';
import { getAttendancesAction } from '@/app/actions/dbActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, BookOpen, Calendar as CalendarIcon, CheckCircle, XCircle, Clock, QrCode } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { toast } from 'sonner';

interface SubjectDetailsStudentProps {
  subject: Subject;
  onBack: () => void;
}

export default function SubjectDetailsStudent({ subject, onBack }: SubjectDetailsStudentProps) {
  const { user } = useAuth();
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  useEffect(() => {
    if(user && subject){
        loadData();
    }
  }, [user, subject]);

  const loadData = async () => {
    if (!user) return;
    setIsLoading(true);
    const allAttendances = await getAttendancesAction();
    const myAttendances = allAttendances.filter(a => a.studentId === user.id && a.subjectId === subject.id);
    setAttendances(myAttendances);

    const todaysAttendance = myAttendances.find(a => 
        new Date(a.date).toDateString() === new Date().toDateString() && a.timeIn
    );
    setHasCheckedIn(!!todaysAttendance);
    
    setIsLoading(false);
  };
  
  if(!user) return null;

  const qrValue = user.id;
  const presentCount = attendances.filter(a => a.status === 'present').length;
  const lateCount = attendances.filter(a => a.status === 'late').length;
  const totalClasses = attendances.length;

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Button variant="ghost" onClick={onBack} size="icon" className="hover:bg-primary/5 hover:text-primary rounded-xl">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-black text-primary tracking-tighter leading-none">{subject.name}</h1>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.3em] mt-2">
                {subject.schedules?.map(s => `${s.day} \u2022 ${s.startTime}`).join(' | ')}
              </p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="bg-primary hover:bg-primary/90 text-white font-black rounded-full px-8 h-12 gap-3 uppercase tracking-widest text-xs shadow-xl shadow-primary/20 disabled:opacity-50"
                    disabled={isLoading}
                >
                    <QrCode className="h-4 w-4" />
                    {hasCheckedIn ? 'Checked In Today' : ''}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Scan for Attendance</DialogTitle>
                    <DialogDescription>
                        Have your teacher scan this QR code to mark your attendance for the current class.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center p-4 bg-white rounded-lg">
                    <QRCode value={qrValue} size={256} />
                </div>
            </DialogContent>
        </Dialog>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 space-y-10 max-w-6xl">
        <div className="hero-landscape p-12">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-40 h-40 rounded-[2.5rem] bg-white/20 border-4 border-white/30 flex items-center justify-center overflow-hidden shadow-2xl rotate-2">
              {user?.profilePic ? (
                <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-20 h-20 text-white" />
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 mb-2">Verified Academic Record</p>
              <h3 className="text-5xl font-black mt-1 drop-shadow-lg">{user?.name}</h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-6">
                <div className="glass-card px-6 py-3">
                  <p className="text-[9px] font-black uppercase text-white/60 tracking-widest">Identity Marker</p>
                  <p className="font-black text-lg">{user?.id}</p>
                </div>
                <div className="glass-card px-6 py-3">
                  <p className="text-[9px] font-black uppercase text-white/60 tracking-widest">Year Level</p>
                  <p className="font-black text-lg">Year {user?.year}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Card className="border-primary/5 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-primary/5 border-b border-primary/10 p-8">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                Session Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Primary Faculty</p>
                <p className="font-black text-2xl tracking-tight">{subject.teacherName}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Schedule Matrix</p>
                {subject.schedules?.map((s, i) => (
                    <p key={i} className="font-black text-2xl tracking-tight text-primary">{s.day} • {s.startTime}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/5 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-primary/5 border-b border-primary/10 p-8">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <CalendarIcon className="w-6 h-6 text-primary" />
                Retention Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-6 rounded-[2rem] bg-green-50 border border-green-100 shadow-sm">
                  <p className="text-[9px] font-black uppercase text-green-600 tracking-widest">Confirmed</p>
                  <p className="text-4xl font-black text-green-700 mt-1">{presentCount}</p>
                </div>
                <div className="text-center p-6 rounded-[2rem] bg-amber-50 border border-amber-100 shadow-sm">
                  <p className="text-[9px] font-black uppercase text-amber-600 tracking-widest">Delayed</p>
                  <p className="text-4xl font-black text-amber-700 mt-1">{lateCount}</p>
                </div>
                <div className="text-center p-6 rounded-[2rem] bg-red-50 border border-red-100 shadow-sm">
                  <p className="text-[9px] font-black uppercase text-red-600 tracking-widest">Total</p>
                  <p className="text-4xl font-black text-red-700 mt-1">{totalClasses}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
