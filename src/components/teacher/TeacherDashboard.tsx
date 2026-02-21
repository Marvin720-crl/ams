
'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../shared/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { Book, Users, School, Loader2 } from 'lucide-react';
import PendingRequests from './PendingRequests';
import PendingEnrollments from './PendingEnrollments';
import EnrolledStudents from './EnrolledStudents';
import ManageSubjects from './ManageSubjects';
import LabView from './LabView';
import RoomReservations from './RoomReservations';
import AttendanceRecords from './AttendanceRecords';
import { getSubjectsAction, getEnrollmentsAction } from '@/app/actions/dbActions';
import TeacherCalendar from './TeacherCalendar';
import QRScanner from './QRScanner';
import SubjectDetails from './SubjectDetails';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);

  useEffect(() => {
    if (user) {
      loadSubjects();
    }
  }, [user]);

  const loadSubjects = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const data = await getSubjectsAction();
      const teacherSubjects = data.filter(s => s.teacherId === user.id);
      
      const enrollments = await getEnrollmentsAction();
      const subjectsWithCounts = teacherSubjects.map(subject => {
        const studentCount = enrollments.filter(e => e.subjectId === subject.id && e.status === 'approved').length;
        return {...subject, studentCount};
      });

      setSubjects(subjectsWithCounts);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBackFromSubject = () => {
    setSelectedSubject(null);
    setCurrentView('home'); // or whichever view you prefer
    loadSubjects(); // Reload subjects in case data changed
  };

  const renderHome = () => (
    <div>
      <h2 className="text-3xl mb-2">Welcome, {user?.name}</h2>
      <p className="text-gray-600 text-lg mb-8">Your Subjects</p>

      {loading ? (
         <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary" size={48} /></div>
      ) : subjects.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg">
            <Book size={64} className="mx-auto mb-4 opacity-50 text-primary" />
            <p className="text-lg font-bold mb-4">No Subjects Found</p>
            <p className="text-sm mb-6">You have not created any subjects yet.</p>
            <button
              onClick={() => setCurrentView('manage-subjects')}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Manage Subjects
            </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] border-b-4 border-primary"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <School className="text-primary h-6 w-6"/>
                </div>
                <h3 className="text-xl font-bold text-gray-800 flex-1">{subject.name}</h3>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-500 font-semibold">{subject.day} &bull; {subject.startTime}</p>
                <div className="flex items-center gap-2 font-bold text-primary">
                    <Users size={16} />
                    <span>{subject.studentCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (selectedSubject) {
      return <SubjectDetails subject={selectedSubject} onBack={handleBackFromSubject} />;
    }
    switch (currentView) {
      case 'home':
        return renderHome();
      case 'schedule':
        return <TeacherCalendar subjects={subjects} />;
      case 'scanner':
        return <QRScanner />;
      case 'pending-requests':
        return <PendingRequests />;
      case 'pending-enrollments':
        return <PendingEnrollments />;
      case 'enrolled-students':
        return <EnrolledStudents />;
      case 'lab-view':
        return <LabView />;
      case 'manage-subjects':
        return <ManageSubjects />;
      case 'reservations':
        return <RoomReservations />;
      case 'attendance-records':
        return <AttendanceRecords />;
      default:
        return renderHome();
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={(view) => {
      setSelectedSubject(null); // Deselect subject when navigating away
      setCurrentView(view);
    }}>
      {renderContent()}
    </Layout>
  );
}

