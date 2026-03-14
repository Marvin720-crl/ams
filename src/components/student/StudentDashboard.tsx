'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../shared/Layout';

import {
  Calendar,
  BookOpen,
  Monitor,
  GraduationCap,
  Loader2,
  ArrowRight,
  Users,
  QrCode,
  X,
  Book,
  ClipboardList,
  UserPlus,
  Library as LibraryIcon,
  Bell,
  Clock
} from 'lucide-react';

import { motion } from 'framer-motion';
import { format, isFuture, parseISO } from 'date-fns';

import MySubjects from './MySubjects';
import MakeRequest from './MakeRequest';
import MyRequests from './MyRequests';
import MySessions from './MySessions';
import EnrollSubject from './EnrollSubject';
import Library from './Library';
import Classwork from './Classwork';
import GradeSlip from './GradeSlip';
import ProfileView from '../shared/ProfileView';

import {
  getEnrollmentsAction,
  getSubjectsAction,
  getLabRequestsAction,
  getTermsAction,
  getTermEnrollmentsAction,
  requestTermEnrollmentAction,
  getClassworksAction,
  getSubmissionsAction
} from '@/app/actions/dbActions';

import {
  Term,
  TermEnrollment,
  Classwork as ClassworkType,
  Submission
} from '@/utils/storage';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { QRCodeSVG as QRCode } from 'qrcode.react';

import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TodayClass {
  name: string;
  time: string;
  teacher: string;
  type: 'class' | 'lab';
  status: 'ongoing' | 'upcoming' | 'ended';
}

function ActionCard({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) {
  return (
    <Card 
      onClick={onClick}
      className="flex flex-col items-start justify-center p-6 sm:p-8 bg-white rounded-[2rem] shadow-xl border-none hover:shadow-2xl transition-all cursor-pointer group hover:-translate-y-1 min-h-[140px]"
    >
      <Icon className="text-primary mb-4 h-6 w-6 group-hover:scale-110 transition-transform" />
      <span className="font-black text-[11px] sm:text-xs uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
        {label}
      </span>
    </Card>
  );
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [todayClasses, setTodayClasses] = useState<TodayClass[]>([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<ClassworkType[]>([]);
  const [activeTerms, setActiveTerms] = useState<Term[]>([]);
  const [myTermEnrollments, setMyTermEnrollments] = useState<TermEnrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.id;

  useEffect(() => {
    if (userId) loadData();
  }, [currentView, userId]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const [
        terms,
        termEnrollments,
        enrollments,
        subjects,
        requests,
        allClassworks,
        allSubmissions
      ] = await Promise.all([
        getTermsAction(),
        getTermEnrollmentsAction(),
        getEnrollmentsAction(),
        getSubjectsAction(),
        getLabRequestsAction(),
        getClassworksAction(),
        getSubmissionsAction()
      ]);

      const active = terms.filter(t => t.status === 'active');
      setActiveTerms(active);

      const myTerms = termEnrollments.filter(e => e.studentId === user.id);
      setMyTermEnrollments(myTerms);

      const myEnrollments = enrollments.filter(
        e => e.studentId === user.id && e.status === 'approved'
      );
      const mySubjectIds = myEnrollments.map(e => e.subjectId);
      const mySubjects = subjects.filter(s => mySubjectIds.includes(s.id));

      if (currentView === 'home') {
        // Handle Today's Classes
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayDay = days[new Date().getDay()];
        const now = new Date();

        const regularClasses: TodayClass[] = mySubjects.flatMap(subject => {
          if (!subject.schedules) return [];
          return subject.schedules
            .filter(s => s.day === todayDay)
            .map(s => {
              const start = new Date();
              const end = new Date();
              const [sh, sm] = s.startTime.split(':').map(Number);
              const [eh, em] = s.dismissalTime.split(':').map(Number);
              start.setHours(sh, sm, 0);
              end.setHours(eh, em, 0);

              let status: 'ongoing' | 'upcoming' | 'ended' = 'upcoming';
              if (now >= start && now <= end) status = 'ongoing';
              else if (now > end) status = 'ended';

              return {
                name: subject.name,
                time: `${s.startTime} - ${s.dismissalTime}`,
                teacher: subject.teacherName,
                type: 'class',
                status
              };
            });
        });

        const todayStr = now.toISOString().split('T')[0];
        const labClasses: TodayClass[] = requests
          .filter(r => r.studentId === user.id && r.status === 'approved' && r.startTime.startsWith(todayStr))
          .map(r => {
            const subject = mySubjects.find(s => s.id === r.subjectId);
            const start = new Date(r.startTime);
            const end = new Date(r.endTime);
            let status: 'ongoing' | 'upcoming' | 'ended' = 'upcoming';
            if (now >= start && now <= end) status = 'ongoing';
            else if (now > end) status = 'ended';

            return {
              name: subject?.name || 'Lab Session',
              time: `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              teacher: subject?.teacherName || 'N/A',
              type: 'lab',
              status
            };
          });

        setTodayClasses([...regularClasses, ...labClasses].sort((a, b) => a.time.localeCompare(b.time)));

        // Handle Upcoming Deadlines
        const mySubmissions = allSubmissions.filter(s => s.studentId === user.id);
        const upcoming = allClassworks
          .filter(cw => mySubjectIds.includes(cw.subjectId) && cw.status === 'published')
          .filter(cw => {
            const hasSubmitted = mySubmissions.some(s => s.classworkId === cw.id);
            return !hasSubmitted && isFuture(parseISO(cw.dueDate));
          })
          .sort((a, b) => parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime())
          .slice(0, 5); // Show top 5

        setUpcomingDeadlines(upcoming);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleTermEnroll = async (termId: string) => {
    try {
      await requestTermEnrollmentAction(user!.id, termId);
      toast.success("Enrollment request submitted.");
      loadData();
    } catch (e) {
      toast.error("Failed to submit request.");
    }
  };

  const renderHome = () => {
    const unenrolledTerms = activeTerms.filter(t => !myTermEnrollments.some(e => e.termId === t.id));
    const pendingTerms = activeTerms.filter(t => myTermEnrollments.some(e => e.termId === t.id && e.status === 'pending'));
    const approvedTermIds = myTermEnrollments.filter(e => e.status === 'approved').map(e => e.termId);
    const approvedTerms = activeTerms.filter(t => approvedTermIds.includes(t.id));

    return (
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">
              Student Hub
            </h2>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">
              Welcome back, {user?.name}
            </p>
          </motion.div>

          <div className="flex gap-3 flex-wrap">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-10 rounded-full font-black uppercase text-[10px] tracking-widest gap-2 bg-white shadow-sm border-primary/10 hover:bg-primary hover:text-white transition-all">
                  <QrCode className="h-4 w-4" />
                  Quick ID Scan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
                <div className="bg-white p-10 flex flex-col items-center text-center relative">
                  <DialogClose className="absolute top-6 right-6 h-10 w-10 rounded-full border border-primary/10 flex items-center justify-center hover:bg-muted transition-colors">
                    <X className="h-5 w-5 text-primary" />
                  </DialogClose>
                  <div className="space-y-1 mb-10">
                    <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-foreground">Identity QR Code</DialogTitle>
                    <DialogDescription className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Present for Campus Entry & Services</DialogDescription>
                  </div>
                  <div className="p-10 bg-white rounded-[2.5rem] border-2 border-primary/5 shadow-2xl shadow-primary/5 mb-8">
                    <QRCode value={user?.id || ''} size={240} includeMargin level="H" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-lg text-primary uppercase tracking-tight">{user?.name}</p>
                    <p className="font-bold text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{user?.id}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {approvedTerms.map(term => (
              <Badge key={term.id} className="bg-green-600 text-white font-black uppercase text-[10px] tracking-widest px-4 py-1.5 rounded-full border-none">
                Enrolled: {term.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <ActionCard icon={Book} label="My Subjects" onClick={() => setCurrentView('subjects')} />
          <ActionCard icon={ClipboardList} label="Classwork" onClick={() => setCurrentView('classwork')} />
          <ActionCard icon={UserPlus} label="Enroll" onClick={() => setCurrentView('enroll')} />
          <ActionCard icon={LibraryIcon} label="Library" onClick={() => setCurrentView('library')} />
        </div>

        {/* Enrollment Alerts */}
        {(unenrolledTerms.length > 0 || pendingTerms.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {unenrolledTerms.map(term => (
              <Card key={term.id} className="p-8 rounded-[2rem] border-primary/5 shadow-xl flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><GraduationCap /></div>
                  <div>
                    <h3 className="font-black text-lg uppercase tracking-tight">{term.name}</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Academic Term</p>
                  </div>
                </div>
                <Button onClick={() => handleTermEnroll(term.id)} className="h-12 rounded-xl font-black uppercase text-xs tracking-widest">Join Academic Term</Button>
              </Card>
            ))}
            {pendingTerms.map(term => (
              <Card key={term.id} className="p-8 rounded-[2rem] bg-amber-50 border-amber-100 flex items-center gap-6">
                <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600"><Loader2 className="animate-spin" /></div>
                <div>
                  <p className="font-black text-lg uppercase tracking-tight">{term.name}</p>
                  <p className="text-[10px] font-black text-amber-700/60 uppercase tracking-widest">Awaiting admin approval</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-8">
            <Card className="h-full p-8 rounded-[2.5rem] border-primary/5 shadow-xl space-y-8 bg-white">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-xl uppercase tracking-tighter flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar size={20} />
                  </div>
                  Today's Schedule
                </h3>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  {new Date().toDateString()}
                </span>
              </div>

              {loading ? (
                <div className="py-10 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></div>
              ) : todayClasses.length === 0 ? (
                <div className="py-16 text-center bg-muted/20 rounded-[2rem] border-2 border-dashed">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No classes scheduled today</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todayClasses.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border border-primary/5 rounded-[1.5rem] p-5 hover:bg-muted/20 transition-colors bg-muted/5">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                          {item.type === 'class' ? <BookOpen size={20} /> : <Monitor size={20} />}
                        </div>
                        <div>
                          <p className="font-black text-primary uppercase leading-tight">{item.name}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{item.time} • {item.teacher}</p>
                        </div>
                      </div>
                      <Badge className={cn("rounded-full px-3 font-black text-[9px] uppercase tracking-widest", item.status === 'ongoing' ? "bg-green-500" : "bg-primary/10 text-primary")}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Upcoming Deadlines (Matches Screenshot Design) */}
          <div className="lg:col-span-4">
            <Card className="h-full p-8 rounded-[2.5rem] border-primary/5 shadow-xl bg-white space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center text-primary">
                  <Bell size={24} />
                </div>
                <h3 className="font-black text-xl uppercase tracking-tighter leading-tight">
                  UPCOMING<br />DEADLINES
                </h3>
              </div>

              <div className="space-y-8">
                {upcomingDeadlines.length === 0 ? (
                  <p className="text-center text-sm font-bold text-muted-foreground uppercase tracking-widest py-10 opacity-40">No pending tasks</p>
                ) : (
                  upcomingDeadlines.map((cw) => {
                    const dueDate = parseISO(cw.dueDate);
                    return (
                      <div key={cw.id} className="flex items-start gap-6">
                        <div className="flex flex-col items-center min-w-[40px]">
                          <span className="text-2xl font-black text-primary leading-none">{format(dueDate, 'dd')}</span>
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">{format(dueDate, 'MMM')}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="font-black text-foreground uppercase text-sm leading-tight">{cw.title}</p>
                          <p className="text-[11px] font-bold text-muted-foreground/60">Due by {format(dueDate, 'hh:mm a')}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <Button 
                variant="ghost" 
                className="w-full h-14 rounded-2xl border-2 border-dashed font-black uppercase text-[10px] tracking-widest text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/20 mt-4"
                onClick={() => setCurrentView('classwork')}
              >
                View All Classwork
              </Button>
            </Card>
          </div>
        </div>

        {/* Bottom Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 rounded-[2.5rem] border-primary/5 shadow-xl bg-primary text-white flex justify-between items-center group cursor-pointer" onClick={() => setCurrentView('view-card')}>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Academic Status</p>
              <h4 className="text-2xl font-black uppercase tracking-tighter">View Official Grade Slip</h4>
            </div>
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
              <ArrowRight size={24} />
            </div>
          </Card>

          <Card className="p-8 rounded-[2.5rem] border-primary/5 shadow-xl bg-white flex justify-between items-center group cursor-pointer" onClick={() => setCurrentView('profile')}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-primary"><Users size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Identity Registry</p>
                <h4 className="text-2xl font-black uppercase tracking-tighter text-foreground">Digital ID & Profile</h4>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={24} />
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home': return renderHome();
      case 'subjects': return <MySubjects />;
      case 'make-request': return <MakeRequest />;
      case 'my-requests': return <MyRequests />;
      case 'my-sessions': return <MySessions />;
      case 'enroll': return <EnrollSubject />;
      case 'library': return <Library />;
      case 'classwork': return <Classwork />;
      case 'view-card': return <GradeSlip />;
      case 'profile': return <ProfileView />;
      default: return renderHome();
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      <div className="h-full">{renderContent()}</div>
    </Layout>
  );
}