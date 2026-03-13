'use client';

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home, Book, FileText, Calendar, Users, Settings, LogOut,
  BookOpen, BarChart3, FileCheck, Menu, X, Monitor, MapPin, Scan, GraduationCap, MessageCircle, School
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ChatContainer from '../Chat/ChatContainer';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Layout({ children, currentView, onNavigate }: LayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getMenuItems = () => {
    if (!user) return [];
    switch (user.role) {
      case 'student':
        return [
          { id: 'home', label: 'Home', icon: Home },
          { id: 'chat', label: 'Messages', icon: MessageCircle },
          { id: 'view-card', label: 'View Card', icon: GraduationCap },
          { id: 'subjects', label: 'My Subjects', icon: Book },
          { id: 'classwork', label: 'Classwork', icon: FileCheck },
          { id: 'make-request', label: 'Make Request', icon: FileText },
          { id: 'my-requests', label: 'My Requests', icon: FileCheck },
          { id: 'my-sessions', label: 'My Sessions', icon: Calendar },
          { id: 'enroll', label: 'Enroll in Subject', icon: Users },
          { id: 'library', label: 'Library', icon: BookOpen },
        ];
      case 'teacher':
        return [
          { id: 'home', label: 'Home', icon: Home },
          { id: 'chat', label: 'Messages', icon: MessageCircle },
          { id: 'grading', label: 'Grading Setup', icon: BarChart3 },
          { id: 'schedule', label: 'My Schedule', icon: Calendar },
          { id: 'scanner', label: 'QR Scanner', icon: Scan },
          { id: 'manage-subjects', label: 'Manage Subjects', icon: Book },
          { id: 'classwork', label: 'Classwork', icon: FileCheck },
          { id: 'reservations', label: 'Room Reservations', icon: MapPin },
          { id: 'pending-requests', label: 'Pending Requests', icon: FileText },
          { id: 'pending-enrollments', label: 'Pending Enrollments', icon: Users },
          { id: 'enrolled-students', label: 'Enrolled Students', icon: Users },
          { id: 'lab-view', label: 'Lab View', icon: Monitor },
          { id: 'attendance-records', label: 'Attendance Records', icon: FileCheck },
        ];
      case 'admin':
        return [
          { id: 'home', label: 'Dashboard', icon: Home },
          { id: 'terms', label: 'Term Management', icon: School },
          { id: 'users', label: 'Manage Users', icon: Users },
          { id: 'requests', label: 'All Requests', icon: FileText },
          { id: 'attendance', label: 'Attendance Reports', icon: Calendar },
          { id: 'labs', label: 'Lab Management', icon: Monitor },
          { id: 'audit', label: 'Audit Log', icon: BarChart3 },
          { id: 'settings', label: 'System Settings', icon: Settings },
        ];
      case 'library_admin':
        return [
          { id: 'home', label: 'Dashboard', icon: Home },
          { id: 'books', label: 'Manage Books', icon: BookOpen },
          { id: 'scan-lend', label: 'Scan & Lend', icon: Scan },
          { id: 'borrow-requests', label: 'Borrow Requests', icon: FileText },
          { id: 'borrow-records', label: 'Borrow Records', icon: FileCheck },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const handleNav = (id: string) => {
    onNavigate(id);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const renderContent = () => {
    if (currentView === 'chat') return <ChatContainer />;
    return children;
  }

  return (
    <div className="min-h-screen bg-muted/10 flex flex-col">
      {/* Top Header - Pic 1 Style */}
      <header className="bg-primary text-white h-16 flex items-center justify-between px-4 sticky top-0 z-50 shadow-md print:hidden">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg lg:hidden"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="AMA Student Portal" width={140} height={36} className="h-9 w-auto" />
          </div>
        </div>
        
        {/* Logout Trigger - Right Side */}
        <button 
          onClick={logout}
          className="flex items-center gap-2 group transition-all"
          title="Logout"
        >
          <Avatar className="h-10 w-10 border-2 border-white/20 group-hover:border-white transition-colors">
            <AvatarImage src={user?.profilePic} />
            <AvatarFallback className="bg-white/20 text-white font-bold uppercase">{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <LogOut size={18} className="hidden sm:block opacity-50 group-hover:opacity-100" />
        </button>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Sidebar - Pic 2 Minimal Style */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-[60] lg:z-40 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] bg-white border-r w-64 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 print:hidden shadow-2xl lg:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* No Header inside Sidebar as per Pic 2 */}
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar scroll-smooth overscroll-contain">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* No Footer inside Sidebar as per Pic 2 (Logout moved to Header) */}
        </aside>

        {/* Main Content - Pic 3 Context */}
        <main className="flex-1 min-w-0 bg-muted/5 p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}