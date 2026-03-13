'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../shared/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Calendar, Monitor, User, BookOpen, School, ClipboardList } from 'lucide-react';
import ManageUsers from './ManageUsers';
import AllRequests from './AllRequests';
import AttendanceReports from './AttendanceReports';
import LabManagement from './LabManagement';
import AuditLog from './AuditLog';
import SystemSettings from './SystemSettings';
import TermManagement from './TermManagement';
import ProfileView from '../shared/ProfileView';
import { getUsersAction, getEnrollmentsAction, getLabRequestsAction, getTermsAction } from '@/app/actions/dbActions';

function StatCard({ icon, label, value, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[2.5rem] shadow-xl p-8 transition-all group hover:-translate-y-1 ${
        onClick ? 'cursor-pointer hover:shadow-2xl' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
            {icon}
        </div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <p className="text-4xl font-black text-primary tracking-tighter">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('home');

  const [stats, setStats] = useState({
    totalUsers: 0,
    teachers: 0,
    students: 0,
    enrollments: 0,
    activeSessions: 0,
    activeTerms: 0
  });

  useEffect(() => {
    if (currentView === 'home') {
      loadStats();
    }
  }, [currentView]);

  const loadStats = async () => {
    try {
      const [users, enrollments, requests, terms] = await Promise.all([
        getUsersAction(),
        getEnrollmentsAction(),
        getLabRequestsAction(),
        getTermsAction()
      ]);

      const totalUsers = users.length;
      const teachers = users.filter((u: any) => u.role === 'teacher').length;
      const students = users.filter((u: any) => u.role === 'student').length;
      const activeSessions = requests.filter(r => r.status === 'approved').length;
      const activeTermsCount = terms.filter(t => t.status === 'active').length;

      setStats({
        totalUsers,
        teachers,
        students,
        enrollments: enrollments.length,
        activeSessions,
        activeTerms: activeTermsCount
      });
    } catch (error) {
      console.error('Failed to load dashboard stats', error);
    }
  };

  const renderHome = () => (
    <div className="space-y-10">
      <div>
        <h2 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">System Control</h2>
        <p className="text-muted-foreground font-bold text-[10px] tracking-[0.2em] mt-2 uppercase">Root Management v1.0</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard
          icon={<School size={28} />}
          label="Active Trimesters"
          value={stats.activeTerms}
          onClick={() => setCurrentView('terms')}
        />
        <StatCard
          icon={<Users size={28} />}
          label="Total Identity Registry"
          value={stats.totalUsers}
          onClick={() => setCurrentView('users')}
        />
        <StatCard
          icon={<Monitor size={28} />}
          label="Global Lab Sessions"
          value={stats.activeSessions}
          onClick={() => setCurrentView('requests')}
        />
        <StatCard
          icon={<User size={28} className="text-blue-600" />}
          label="Certified Faculty"
          value={stats.teachers}
          onClick={() => setCurrentView('users')}
        />
        <StatCard
          icon={<User size={28} className="text-green-600" />}
          label="Verified Students"
          value={stats.students}
          onClick={() => setCurrentView('users')}
        />
        <StatCard
          icon={<ClipboardList size={28} className="text-orange-600" />}
          label="Total Subject Enrollments"
          value={stats.enrollments}
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'home': return renderHome();
      case 'users': return <ManageUsers />;
      case 'requests': return <AllRequests />;
      case 'attendance': return <AttendanceReports />;
      case 'labs': return <LabManagement />;
      case 'terms': return <TermManagement />;
      case 'audit': return <AuditLog />;
      case 'settings': return <SystemSettings />;
      case 'profile': return <ProfileView />;
      default: return renderHome();
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      <div className="h-full">
        {renderContent()}
      </div>
    </Layout>
  );
}
