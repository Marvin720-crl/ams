
'use client';

import { useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/components/auth/LoginPage';
import TeacherDashboard from '@/components/teacher/TeacherDashboard';
import StudentDashboard from '@/components/student/StudentDashboard';
import AdminDashboard from '@/components/admin/AdminDashboard';
import LibraryDashboard from '@/components/library/LibraryDashboard';
import { Toaster } from 'sonner';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted/10 p-4">
            <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-primary rounded-2xl mb-4" />
                <p className="text-muted-foreground font-black uppercase tracking-widest">AMS:AMACC</p>
            </div>
        </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'student':
      return <StudentDashboard />;
    case 'library_admin':
      return <LibraryDashboard />;
    default:
      return <LoginPage />;
  }
};

const App = () => {
  return (
    <>
      <AppContent />
      <Toaster position="top-center" richColors />
    </>
  );
};

export default App;
