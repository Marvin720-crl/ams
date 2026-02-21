
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TeacherDashboard from '@/components/teacher/TeacherDashboard';
import StudentDashboard from '@/components/student/StudentDashboard';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted/10 p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-primary rounded-2xl mb-4" />
          <p className="text-muted-foreground font-black uppercase tracking-widest">AMS:AMACC</p>
        </div>
      </div>
    );
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      );
  }
}
