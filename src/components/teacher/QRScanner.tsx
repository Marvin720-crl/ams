
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, LogIn, LogOut as LogOutIcon, QrCode, ShieldCheck, Zap, Keyboard } from 'lucide-react';
import { toast } from 'sonner';
import { getAttendancesAction, addAttendanceAction, updateAttendanceAction, getUsersAction, getSubjectsAction, getEnrollmentsAction, getReservationsAction, updatePcAction } from '@/app/actions/dbActions';
import { ScannerComponent } from './ScannerComponent';
import SelectPCDialog from './SelectPCDialog';
import { User, Subject } from '@/utils/storage';

type ScanMode = 'in' | 'out';

export default function QRScanner() {
  const [scanMode, setScanMode] = useState<ScanMode>('in');
  const [qrData, setQrData] = useState('');
  const [lastScanned, setLastScanned] = useState<{ studentName: string; subjectName: string; mode: ScanMode } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [pcSelection, setPcSelection] = useState<{ labId: string; student: User; subject: Subject; } | null>(null);


  const handlePCSelected = async (pcId: string) => {
    if (!pcSelection) return;
    setLoading(true);

    const { student, subject, labId } = pcSelection;

    try {
        const attendance = {
            studentId: student.id,
            subjectId: subject.id,
            date: new Date().toISOString(),
            status: 'present' as const,
            timeIn: new Date().toLocaleTimeString('en-US', { hour12: false }),
            sessionId: `SESS-${Date.now()}`,
            locationId: labId,
            locationType: 'lab' as const,
            pcId: pcId
        };
        await addAttendanceAction(attendance);

        setLastScanned({ studentName: student.name, subjectName: subject.name, mode: 'in' });
        toast.success(`Welcome, ${student.name}! Assigned to PC ${pcId.split('-').pop()}`);
    } catch(error) {
        toast.error('System Capture Error');
    } finally {
        setPcSelection(null);
        setLoading(false);
        setQrData('');
        setShowManual(false);
    }
  }

  const processScan = async (data: string, mode: ScanMode) => {
    if (!data) return;
    setLoading(true);

    try {
      const [studentId, subjectId] = data.split('|');
      const users = await getUsersAction();
      const subjects = await getSubjectsAction();
      const enrollments = await getEnrollmentsAction();
      
      const student = users.find(u => u.id === studentId);
      const subject = subjects.find(s => s.id === subjectId);
      
      if (!student || !subject) {
        toast.error('Invalid ID: Record not recognized');
        setLoading(false);
        return;
      }

      const enrollment = enrollments.find(e => 
        e.studentId === studentId && 
        e.subjectId === subjectId && 
        e.status === 'approved'
      );

      if (!enrollment) {
        toast.error('Access Denied: Student not enrolled');
        setLoading(false);
        return;
      }

      const todayDate = new Date().toISOString().split('T')[0];
      const existingAttendances = await getAttendancesAction();

      if (mode === 'in') {
        const alreadyScannedIn = existingAttendances.find(a => 
          a.studentId === studentId && 
          a.subjectId === subjectId && 
          a.date.startsWith(todayDate) &&
          a.timeIn
        );

        if (alreadyScannedIn) {
          toast.warning('Duplicate: Entrance already recorded');
          setLoading(false);
          return;
        }

        const reservations = await getReservationsAction();
        const now = new Date();
        const teacher = users.find(u => u.id === subject.teacherId);

        if (!teacher) {
            toast.error("Cannot verify subject teacher.");
            setLoading(false);
            return;
        }

        const activeReservation = reservations.find(r => {
            if (r.teacherId !== teacher.id || r.subjectId !== subject.id) return false;
            try {
                const resDate = new Date(r.date + "T00:00:00");
                if (now.toDateString() !== resDate.toDateString()) return false;
                
                const startTime = new Date(`${r.date}T${r.startTime}`);
                const endTime = new Date(`${r.date}T${r.endTime}`);
                return now >= startTime && now <= endTime;
            } catch(e) {
                console.error("Error parsing reservation date/time", e);
                return false;
            }
        });

        if (activeReservation) {
            if (activeReservation.locationType === 'lab') {
                setLoading(false);
                setPcSelection({ labId: activeReservation.locationId, student, subject });
                return; 
            } else { // It's a room
                await addAttendanceAction({
                    studentId, subjectId,
                    date: new Date().toISOString(),
                    status: 'present' as const,
                    timeIn: new Date().toLocaleTimeString('en-US', { hour12: false }),
                    sessionId: `SESS-${Date.now()}`,
                    locationId: activeReservation.locationId,
                    locationType: activeReservation.locationType
                });
                setLastScanned({ studentName: student.name, subjectName: subject.name, mode: 'in' });
                toast.success(`Welcome, ${student.name}!`);
            }
        } else { // No active reservation
            await addAttendanceAction({
                studentId, subjectId,
                date: new Date().toISOString(),
                status: 'present' as const,
                timeIn: new Date().toLocaleTimeString('en-US', { hour12: false }),
                sessionId: `SESS-${Date.now()}`
            });
            setLastScanned({ studentName: student.name, subjectName: subject.name, mode: 'in' });
            toast.warning(`Welcome, ${student.name}! (No active room reservation found)`);
        }

      } else { // mode === 'out'
        const todayAttendance = existingAttendances.slice().reverse().find(a => 
          a.studentId === studentId && 
          a.subjectId === subjectId && 
          a.date.startsWith(todayDate) &&
          a.timeIn &&
          !a.timeOut
        );

        if (!todayAttendance) {
          toast.error('Error: No entrance record found');
          setLoading(false);
          return;
        }

        await updateAttendanceAction(todayAttendance.id, {
          timeOut: new Date().toLocaleTimeString('en-US', { hour12: false })
        });

        setLastScanned({ studentName: student.name, subjectName: subject.name, mode: 'out' });
        toast.success(`Goodbye, ${student.name}!`);
      }
      
      setQrData('');
      setShowManual(false);
    } catch (error) {
      console.error(error);
      toast.error('System Capture Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-8 pb-24">
        <div className="text-center py-6">
          <div className="inline-flex h-20 w-20 items-center justify-center bg-primary/10 rounded-[2.5rem] mb-6 shadow-2xl shadow-primary/10 rotate-3">
            <QrCode className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-primary uppercase">Attendance Capture</h2>
          <p className="text-muted-foreground font-bold italic mt-2 uppercase tracking-widest text-[10px]">Session Logging v1.0</p>
        </div>

        <Tabs value={scanMode} onValueChange={(v) => {
          setScanMode(v as ScanMode);
          setLastScanned(null);
        }}>
          <TabsList className="grid w-full grid-cols-2 bg-white border-2 border-primary/10 h-16 p-1.5 rounded-[1.5rem] shadow-sm">
            <TabsTrigger value="in" className="rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-2">
              <LogIn className="w-4 h-4" />
              Class Entrance
            </TabsTrigger>
            <TabsTrigger value="out" className="rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-2">
              <LogOutIcon className="w-4 h-4" />
              Class Dismissal
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <Card className="border-0 shadow-3xl rounded-[3rem] overflow-hidden bg-white">
              <div className="h-3 bg-primary" />
              <CardHeader className="text-center pb-0 pt-10 px-8">
                <CardTitle className="text-3xl font-black tracking-tighter uppercase">
                  {scanMode === 'in' ? 'Entrance Check' : 'Dismissal Log'}
                </CardTitle>
                <CardDescription className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
                  {scanMode === 'in' ? 'Mark Arrival Time' : 'Mark Departure Time'}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-12 space-y-10">
                
                <div className="space-y-8">
                  <ScannerComponent 
                    mode={scanMode} 
                    onScan={(data) => processScan(data, scanMode)} 
                  />
                  
                  <div className="flex flex-col gap-4">
                    {!showManual ? (
                      <Button 
                        variant="ghost" 
                        onClick={() => setShowManual(true)}
                        className="w-full h-14 rounded-2xl border-2 border-dashed border-muted-foreground/20 text-muted-foreground font-bold uppercase tracking-widest text-[10px] gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                      >
                        <Keyboard className="w-4 h-4" />
                        Type ID Manually
                      </Button>
                    ) : (
                      <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-2">
                          <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-2">Digital ID / Manual String</Label>
                          <Input
                            className="h-16 bg-muted/30 rounded-2xl text-center font-black text-xl tracking-widest border-primary/5 focus:border-primary transition-all placeholder:text-muted-foreground/20"
                            placeholder="STUDENT|SUBJECT"
                            value={qrData}
                            onChange={(e) => setQrData(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && processScan(qrData, scanMode)}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => setShowManual(false)}
                            variant="outline"
                            className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs"
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={() => processScan(qrData, scanMode)} 
                            disabled={loading || !qrData}
                            className="flex-[2] h-14 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl shadow-xl shadow-primary/20 uppercase gap-3 text-xs tracking-widest"
                          >
                            {loading ? 'Verifying...' : 'Confirm'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {lastScanned && (
                  <div className={`p-8 border-4 rounded-[2.5rem] animate-in zoom-in duration-500 shadow-2xl ${
                    lastScanned.mode === 'in' ? 'bg-green-50 border-green-100' : 'bg-primary/5 border-primary/10'
                  }`}>
                    <div className="flex items-center gap-6">
                      <div className={`h-16 w-16 rounded-[1.25rem] flex items-center justify-center shadow-xl ${
                        lastScanned.mode === 'in' ? 'bg-green-500 text-white' : 'bg-primary text-white'
                      }`}>
                        {lastScanned.mode === 'in' ? <CheckCircle className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className={`font-black uppercase text-[9px] tracking-[0.25em] mb-1 ${
                          lastScanned.mode === 'in' ? 'text-green-900' : 'text-primary'
                        }`}>
                          {lastScanned.mode === 'in' ? 'Session Authorized' : 'Exit Logged'}
                        </p>
                        <p className={`text-2xl font-black truncate leading-none ${
                          lastScanned.mode === 'in' ? 'text-green-800' : 'text-primary/80'
                        }`}>
                          {lastScanned.studentName}
                        </p>
                        <p className={`text-[10px] font-black uppercase tracking-widest mt-2 ${
                          lastScanned.mode === 'in' ? 'text-green-600' : 'text-primary/60'
                        }`}>
                          {lastScanned.subjectName}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </Tabs>

        <div className="px-8 py-6 bg-white/50 backdrop-blur-md rounded-[2.5rem] border-2 border-primary/5 text-center">
          <p className="text-[10px] font-bold text-muted-foreground leading-relaxed max-w-sm mx-auto uppercase tracking-tighter">
            <span className="text-primary font-black mr-2 tracking-widest">Protocol:</span> 
            Scan student ID for arrival & dismissal. Manual format: <code className="bg-primary/10 px-2 py-0.5 rounded text-primary font-black">ID|CODE</code>.
          </p>
        </div>
      </div>
      {pcSelection && (
        <SelectPCDialog
            labId={pcSelection.labId}
            studentName={pcSelection.student.name}
            subjectName={pcSelection.subject.name}
            onClose={() => setPcSelection(null)}
            onSubmit={handlePCSelected}
        />
      )}
    </>
  );
}
