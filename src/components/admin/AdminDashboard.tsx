
'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../shared/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Calendar, Monitor, User, BookOpen } from 'lucide-react';
import ManageUsers from './ManageUsers';
import AllRequests from './AllRequests';
import AttendanceReports from './AttendanceReports';
import LabManagement from './LabManagement';
import AuditLog from './AuditLog';
import SystemSettings from './SystemSettings';
import { getUsersAction, getEnrollmentsAction, getLabRequestsAction } from '@/app/actions/dbActions';

function StatCard({ icon, label, value, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg p-6 transition-shadow ${
        onClick ? 'cursor-pointer hover:shadow-xl' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        {icon}
      </div>
      <p className="text-gray-600 text-sm mb-2">{label}</p>
      <p className="text-3xl font-semibold">{value}</p>
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
    sessionsToday: 0
  });

  useEffect(() => {
    if (currentView === 'home') {
      loadStats();
    }
  }, [currentView]);

  const loadStats = async () => {
    try {
      const [users, enrollments, requests] = await Promise.all([
        getUsersAction(),
        getEnrollmentsAction(),
        getLabRequestsAction()
      ]);

      const totalUsers = users.length;
      const teachers = users.filter((u: any) => u.role === 'teacher').length;
      const students = users.filter((u: any) => u.role === 'student').length;

      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];

      const activeSessions = requests.filter(r => {
          const startTime = new Date(r.startTime);
          const endTime = new Date(r.endTime);
          return r.status === 'approved' && now >= startTime && now <= endTime;
      }).length;
      
      const sessionsToday = requests.filter(r => r.startTime.startsWith(todayStr)).length;

      setStats({
        totalUsers,
        teachers,
        students,
        enrollments: enrollments.length,
        activeSessions,
        sessionsToday
      });
    } catch (error) {
      console.error('Failed to load dashboard stats', error);
    }
  };

  const renderHome = () => (
    <div>
      <h2 className="text-3xl mb-2">Admin Dashboard</h2>
      <p className="text-gray-600 mb-8">System overview and statistics</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<Users className="text-[#b40000]" size={32} />}
          label="Total Users"
          value={stats.totalUsers}
          onClick={() => setCurrentView('users')}
        />
        <StatCard
          icon={<User className="text-blue-600" size={32} />}
          label="Teachers"
          value={stats.teachers}
          onClick={() => setCurrentView('users')}
        />
        <StatCard
          icon={<User className="text-green-600" size={32} />}
          label="Students"
          value={stats.students}
          onClick={() => setCurrentView('users')}
        />
        <StatCard
          icon={<BookOpen className="text-purple-600" size={32} />}
          label="Enrollments"
          value={stats.enrollments}
        />
        <StatCard
          icon={<Monitor className="text-cyan-600" size={32} />}
          label="Active Sessions"
          value={stats.activeSessions}
          onClick={() => setCurrentView('attendance')}
        />
        <StatCard
          icon={<Calendar className="text-orange-600" size={32} />}
          label="Sessions Today"
          value={stats.sessionsToday}
          onClick={() => setCurrentView('attendance')}
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return renderHome();
      case 'users':
        return <ManageUsers />;
      case 'requests':
        return <AllRequests />;
      case 'attendance':
        return <AttendanceReports />;
      case 'labs':
        return <LabManagement />;
      case 'audit':
        return <AuditLog />;
      case 'settings':
        return <SystemSettings />;
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
