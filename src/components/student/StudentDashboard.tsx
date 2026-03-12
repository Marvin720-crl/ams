'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../shared/Layout';
import { Calendar, BookOpen, Monitor, User, AlertCircle, CheckCircle, ArrowRight, GraduationCap, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import MySubjects from './MySubjects';
import MakeRequest from './MakeRequest';
import MyRequests from './MyRequests';
import MySessions from './MySessions';
import EnrollSubject from './EnrollSubject';
import Library from './Library';
import Classwork from './Classwork';
import GradeSlip from './GradeSlip';
import { getEnrollmentsAction, getSubjectsAction, getLabRequestsAction, getTermsAction, getTermEnrollmentsAction, requestTermEnrollmentAction } from '@/app/actions/dbActions';
import { Enrollment, Subject, LabRequest, Term, TermEnrollment } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TodayClass {
  name: string;
  time: string;
  teacher: string;
  type: 'class' | 'lab';
  status: 'ongoing' | 'upcoming' | 'ended';
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [todayClasses, setTodayClasses] = useState<TodayClass[]>([]);
  const [activeTerms, setActiveTerms] = useState<Term[]>([]);
  const [myTermEnrollments, setMyTermEnrollments] = useState<TermEnrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadData();
  }, [currentView, user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
        const [terms, termEn, enrollments, subjects, requests] = await Promise.all([
            getTermsAction(),
            getTermEnrollmentsAction(),
            getEnrollmentsAction(),
            getSubjectsAction(),
            getLabRequestsAction()
        ]);

        const active = terms.filter(t => t.status === 'active');
        setActiveTerms(active);
        setMyTermEnrollments(termEn.filter(e => e.studentId === user.id));

        if (currentView === 'home') {
            const myEnrollments = enrollments.filter(e => e.studentId === user.id && e.status === 'approved');
            const mySubjectIds = myEnrollments.map(e => e.subjectId);
            const mySubjects = subjects.filter(s => mySubjectIds.includes(s.id));
            const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            const todayDay = days[new Date().getDay()];
            const now = new Date();

            const regularClasses: TodayClass[] = mySubjects.flatMap(subject => {
                if (!subject.schedules) return [];
                return subject.schedules.filter(s => s.day === todayDay).map(s => {
                    const start = new Date();
                    const end = new Date();
                    const [sh, sm] = s.startTime.split(':').map(Number);
                    const [eh, em] = s.dismissalTime.split(':').map(Number);
                    start.setHours(sh, sm, 0); end.setHours(eh, em, 0);
                    let status: 'ongoing' | 'upcoming' | 'ended' = 'upcoming';
                    if (now >= start && now <= end) status = 'ongoing';
                    else if (now > end) status = 'ended';
                    return { name: subject.name, time: `${s.startTime} - ${s.dismissalTime}`, teacher: subject.teacherName, type: 'class', status };
                });
            });

            const todayStr = now.toISOString().split('T')[0];
            const labClasses: TodayClass[] = requests.filter(r => r.studentId === user.id && r.status === 'approved' && r.startTime.startsWith(todayStr)).map(r => {
                const subject = mySubjects.find(s => s.id === r.subjectId);
                const start = new Date(r.startTime); const end = new Date(r.endTime);
                let status: 'ongoing' | 'upcoming' | 'ended' = 'upcoming';
                if (now >= start && now <= end) status = 'ongoing';
                else if (now > end) status = 'ended';
                return { name: subject?.name || 'Lab Session', time: `${start.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} - ${end.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`, teacher: subject?.teacherName || 'N/A', type: 'lab', status };
            });

            setTodayClasses([...regularClasses, ...labClasses].sort((a,b) => a.time.localeCompare(b.time)));
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
          toast.success("Enrollment request submitted! Awaiting Admin approval.");
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}}>
                    <h2 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">Student Hub</h2>
                    <p className="text-muted-foreground font-bold text-[10px] tracking-[0.2em] mt-2 uppercase">Welcome back, {user?.name}</p>
                </motion.div>
                
                <div className="flex gap-3">
                    {approvedTerms.map(term => (
                        <Badge key={term.id} className="h-10 px-6 rounded-full bg-green-500 text-white font-black uppercase text-[10px] tracking-widest border-0">
                            Enrolled: {term.name}
                        </Badge>
                    ))}
                </div>
            </div>

            {(unenrolledTerms.length > 0 || pendingTerms.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {unenrolledTerms.map(term => (
                        <Card key={term.id} className="rounded-[2.5rem] p-8 border-primary/10 shadow-2xl bg-primary text-white overflow-hidden relative group">
                            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform duration-500"><GraduationCap size={200} /></div>
                            <div className="relative z-10 space-y-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Enrollment Open</p>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight">{term.name}</h3>
                                </div>
                                <Button onClick={() => handleTermEnroll(term.id)} className="rounded-full bg-white text-primary hover:bg-white/90 font-black uppercase text-[10px] tracking-widest px-8 h-12 shadow-xl">Join Academic Term</Button>
                            </div>
                        </Card>
                    ))}
                    {pendingTerms.map(term => (
                        <Card key={term.id} className="rounded-[2.5rem] p-8 border-amber-200 shadow-xl bg-amber-50 relative overflow-hidden">
                            <div className="relative z-10 space-y-4">
                                <div className="h-12 w-12 rounded-2xl bg-amber-200/50 flex items-center justify-center text-amber-600"><Loader2 className="animate-spin" /></div>
                                <div>
                                    <h3 className="text-xl font-black text-amber-900 uppercase tracking-tighter">{term.name}</h3>
                                    <p className="text-sm font-bold text-amber-700/70 mt-1 uppercase tracking-widest">Status: Waiting for Admin Approval</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="rounded-[2.5rem] p-10 border-primary/5 shadow-xl bg-white">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-black text-primary uppercase tracking-tighter flex items-center gap-3"><Calendar /> Today's Itinerary</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{new Date().toDateString()}</p>
                        </div>
                        
                        {loading ? (
                            <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></div>
                        ) : todayClasses.length === 0 ? (
                            <div className="py-20 text-center bg-muted/20 rounded-[2rem] border-2 border-dashed">
                                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-4" />
                                <p className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest">No classes scheduled for today</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {todayClasses.map((item, idx) => (
                                    <div key={idx} className={`p-6 rounded-[2rem] border-2 transition-all hover:scale-[1.02] flex items-center justify-between ${
                                        item.status === 'ongoing' ? 'bg-green-50 border-green-100' : 
                                        item.status === 'ended' ? 'bg-muted/30 border-muted/50 opacity-60' : 
                                        'bg-blue-50 border-blue-100'
                                    }`}>
                                        <div className="flex items-center gap-6">
                                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg ${
                                                item.status === 'ongoing' ? 'bg-green-500 text-white' : 
                                                item.status === 'ended' ? 'bg-gray-400 text-white' : 
                                                'bg-blue-500 text-white'
                                            }`}>
                                                {item.type === 'class' ? <BookOpen /> : <Monitor />}
                                            </div>
                                            <div>
                                                <p className="font-black text-lg text-primary uppercase leading-tight">{item.name}</p>
                                                <div className="flex items-center gap-4 mt-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.time}</span>
                                                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {item.teacher}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge className={`rounded-full h-8 px-4 font-black uppercase text-[9px] tracking-widest ${
                                            item.status === 'ongoing' ? 'bg-green-600' : 
                                            item.status === 'ended' ? 'bg-gray-500' : 
                                            'bg-blue-600'
                                        }`}>{item.status}</Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="rounded-[2.5rem] bg-primary text-white p-8 border-0 shadow-2xl shadow-primary/20">
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] opacity-60 mb-6">Current Standing</h4>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Approved Terms</p>
                                <p className="text-3xl font-black">{approvedTerms.length}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Enrolled Subjects</p>
                                <p className="text-3xl font-black">{approvedTermIds.length > 0 ? todayClasses.length : 0}</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-10 rounded-full bg-white/10 border-white/20 hover:bg-white/20 text-white font-black uppercase tracking-widest text-[9px] h-12" onClick={() => setCurrentView('view-card')}>
                            Access Grade Slip <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
  };

  const renderContent = () => {
    switch(currentView){
      case 'home': return renderHome();
      case 'subjects': return <MySubjects/>;
      case 'make-request': return <MakeRequest/>;
      case 'my-requests': return <MyRequests/>;
      case 'my-sessions': return <MySessions/>;
      case 'enroll': return <EnrollSubject/>;
      case 'library': return <Library/>;
      case 'classwork': return <Classwork />;
      case 'view-card': return <GradeSlip />;
      default: return renderHome();
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </Layout>
  );
}
