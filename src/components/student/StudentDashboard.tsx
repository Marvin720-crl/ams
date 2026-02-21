'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../shared/Layout';
import { Calendar, BookOpen, Monitor, User } from 'lucide-react';
import { motion } from 'framer-motion';
import MySubjects from './MySubjects';
import MakeRequest from './MakeRequest';
import MyRequests from './MyRequests';
import MySessions from './MySessions';
import EnrollSubject from './EnrollSubject';
import Library from './Library';
import { getEnrollmentsAction, getSubjectsAction, getLabRequestsAction } from '@/app/actions/dbActions';
import { Enrollment, Subject, LabRequest } from '@/utils/storage';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && currentView === 'home') {
      loadTodayClasses();
    } else {
        setLoading(false);
    }
  }, [currentView, user]);

  const loadTodayClasses = async () => {
    if (!user) return;
    setLoading(true);

    const [enrollments, subjects, requests] = await Promise.all([
      getEnrollmentsAction(),
      getSubjectsAction(),
      getLabRequestsAction()
    ]);

    const myEnrollments = enrollments.filter(
      (e: Enrollment) => e.studentId === user.id && e.status === 'approved'
    );
    const mySubjectIds = myEnrollments.map((e: Enrollment) => e.subjectId);
    const mySubjects = subjects.filter((s: Subject) => mySubjectIds.includes(s.id));
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayDay = days[new Date().getDay()];
    const now = new Date();

    const regularClasses: TodayClass[] = mySubjects.filter(subject => {
        if (!subject.day) return false;
        const dayAbbreviation = todayDay.substring(0, 3);
        // Check for full day name match OR if the day string includes the abbreviation.
        // This covers "Friday" === "Friday" and "Mon/Wed".includes("Mon").
        return subject.day === todayDay || subject.day.includes(dayAbbreviation);
      })
      .map(subject => {
        const [startHour, startMin] = subject.startTime.split(':').map(Number);
        const [endHour, endMin] = subject.dismissalTime.split(':').map(Number);
        
        const startTime = new Date();
        startTime.setHours(startHour, startMin, 0, 0);
        
        const endTime = new Date();
        endTime.setHours(endHour, endMin, 0, 0);

        let status: 'ongoing' | 'upcoming' | 'ended' = 'upcoming';
        if (now >= startTime && now <= endTime) {
          status = 'ongoing';
        } else if (now > endTime) {
          status = 'ended';
        }

        return {
            name: subject.name,
            time: `${subject.startTime} - ${subject.dismissalTime}`,
            teacher: subject.teacherName,
            type: 'class' as const,
            status,
        };
      });
      
    const todayStr = now.toISOString().split('T')[0];
    const approvedRequests: TodayClass[] = requests
      .filter(r => r.studentId === user.id && r.status === 'approved' && r.startTime.startsWith(todayStr))
      .map(r => {
        const subject = mySubjects.find(s => s.id === r.subjectId);
        const startTime = new Date(r.startTime);
        const endTime = new Date(r.endTime);

        let status: 'ongoing' | 'upcoming' | 'ended' = 'upcoming';
        if (now >= startTime && now <= endTime) {
          status = 'ongoing';
        } else if (now > endTime) {
          status = 'ended';
        }

        return {
          name: subject?.name || 'Lab Session',
          time: `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          teacher: subject?.teacherName || 'N/A',
          type: 'lab' as const,
          status
        }
      });

    const combined = [...regularClasses, ...approvedRequests].sort((a,b) => a.time.localeCompare(b.time));

    setTodayClasses(combined);
    setLoading(false);
  };

  const renderHome = () => (
    <div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl mb-2">Hello, {user?.name}</h2>
        <p className="text-gray-600 text-lg mb-8">Student Dashboard</p>
      </motion.div>

      <motion.div 
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h3 
          className="text-2xl mb-6 flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Calendar className="text-[#b40000]" />
          Today's Classes
        </motion.h3>

        {loading ? <p>Loading schedule...</p> :
        todayClasses.length === 0 ? (
          <motion.div 
            className="text-center py-12 text-gray-500"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <BookOpen size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No classes scheduled for today.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {todayClasses.map((item, index) => (
                <div key={index} className={`p-4 rounded-xl border-l-4 ${
                    item.status === 'ongoing' ? 'border-green-500 bg-green-50' : 
                    item.status === 'ended' ? 'border-gray-400 bg-gray-50' :
                    'border-blue-500 bg-blue-50'
                }`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className={`px-3 py-1 text-xs rounded-full ${
                                item.status === 'ongoing' ? 'bg-green-200 text-green-800' :
                                item.status === 'ended' ? 'bg-gray-200 text-gray-700' :
                                'bg-blue-200 text-blue-800'
                            }`}>{item.status}</span>
                            <h4 className="font-bold text-lg mt-2">{item.name}</h4>
                            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                {item.type === 'class' ? <BookOpen size={14}/> : <Monitor size={14}/>}
                                {item.time}
                            </p>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-semibold flex items-center gap-2"><User size={14}/> {item.teacher}</p>
                        </div>
                    </div>
                </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return renderHome();
      case 'subjects':
        return <MySubjects />;
      case 'make-request':
        return <MakeRequest />;
      case 'my-requests':
        return <MyRequests />;
      case 'my-sessions':
        return <MySessions />;
      case 'enroll':
        return <EnrollSubject />;
      case 'library':
        return <Library />;
      default:
        return renderHome();
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </Layout>
  );
}
