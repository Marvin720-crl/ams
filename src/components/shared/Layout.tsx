'use client';

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home, Book, FileText, Calendar, Users, Settings, LogOut,
  BookOpen, BarChart3, FileCheck, Menu, X, Monitor, MapPin, Scan, GraduationCap, MessageCircle, School, ShieldAlert, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ChatContainer from '../Chat/ChatContainer';
import { cn } from '@/lib/utils';
import UserGuide from './UserGuide';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Layout({ children, currentView, onNavigate }: LayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const getMenuItems = () => {
    if (!user) return [];
    switch (user.role) {
      case 'student':
        return [
          { id: 'home', label: 'Dashboard', icon: Home },
          { id: 'chat', label: 'Messages', icon: MessageCircle },
          { id: 'view-card', label: 'Grade Slip', icon: GraduationCap },
          { id: 'subjects', label: 'My Subjects', icon: Book },
          { id: 'classwork', label: 'Classwork', icon: FileCheck },
          { id: 'make-request', label: 'Make Request', icon: FileText },
          { id: 'my-requests', label: 'My Requests', icon: FileCheck },
          { id: 'my-sessions', label: 'My Sessions', icon: Calendar },
          { id: 'enroll', label: 'Enrollment', icon: Users },
          { id: 'library', label: 'Library', icon: BookOpen },
        ];
      case 'teacher':
        return [
          { id: 'home', label: 'Dashboard', icon: Home },
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
          { id: 'security', label: 'Security Center', icon: ShieldAlert },
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
      <header className="bg-primary text-white h-24 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shadow-md print:hidden">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg lg:hidden"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center">
            <Image src="/logo.png" alt="AMA Student Portal" width={160} height={42} className="h-12 w-auto" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setGuideOpen(true)}
            className="hidden md:flex h-10 px-4 items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/10"
          >
            <HelpCircle size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Tutorial</span>
          </button>
          <button 
            onClick={logout}
            className="p-2 hover:bg-white/10 rounded-full transition-all group"
            title="Logout"
          >
            <LogOut size={28} className="opacity-70 group-hover:opacity-100" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
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

        <aside className={cn(
          "fixed inset-y-0 left-0 z-[60] lg:z-40 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] bg-[#f8f8f8] border-r w-72 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 print:hidden shadow-2xl lg:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div 
            onClick={() => handleNav('profile')}
            className="pt-12 pb-10 px-6 flex flex-col items-center bg-gradient-to-b from-primary/5 to-transparent cursor-pointer group"
          >
            <div className="w-24 h-24 rounded-[1.75rem] bg-primary flex items-center justify-center text-4xl text-white font-black shadow-xl shadow-primary/20 rotate-3 mb-6 transition-transform group-hover:rotate-0 overflow-hidden">
              {user?.profilePic ? (
                <img src={user.profilePic} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0) || 'S'
              )}
            </div>
            <h2 className="text-sm font-black uppercase tracking-tight text-center leading-tight text-foreground px-4 group-hover:text-primary transition-colors">
              {user?.name}
            </h2>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-center">
              {user?.role === 'admin' ? 'SYSTEM ADMINISTRATOR' : user?.role?.replace('_', ' ')}
            </p>
          </div>
          
          <nav className="flex-1 overflow-y-auto px-4 pb-8 space-y-1 no-scrollbar scroll-smooth">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group",
                    isActive 
                      ? "bg-white text-primary border-l-4 border-primary shadow-sm scale-[1.02]" 
                      : "text-muted-foreground hover:bg-white/50 hover:text-primary"
                  )}
                >
                  <Icon size={18} className={cn(
                    "transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  )} />
                  {item.label}
                </button>
              );
            })}

            <div className="pt-6 mt-6 border-t border-primary/5">
              <button
                onClick={() => setGuideOpen(true)}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-all"
              >
                <HelpCircle size={18} />
                User Guide
              </button>
            </div>
          </nav>
        </aside>

        <main className="flex-1 min-w-0 bg-muted/5 p-4 md:p-10">
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

      <UserGuide open={guideOpen} onOpenChange={setGuideOpen} />
    </div>
  );
}
