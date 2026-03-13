'use client';

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home, Book, FileText, Calendar, Users, Settings, LogOut,
  BookOpen, BarChart3, FileCheck, Menu, X, Monitor, MapPin, Scan, GraduationCap, MessageCircle, School
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ChatContainer from '../Chat/ChatContainer';
import { cn } from '@/lib/utils';

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
      {/* Top Header */}
      <header className="bg-primary text-white h-16 flex items-center justify-between px-4 sticky top-0 z-50 shadow-md print:hidden">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg lg:hidden"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Image src="/logo.png" alt="AMA" width={120} height={32} className="h-8 w-auto" />
        </div>
        <div className="hidden lg:block text-[10px] font-black uppercase tracking-[0.3em] opacity-50">
          Academic Management System v1.0
        </div>
        <Link href="/profile" className="flex items-center gap-2 hover:bg-white/10 p-1 rounded-full pr-3 transition-colors">
          <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center overflow-hidden">
            {user?.profilePic ? (
              <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold">{user?.name.charAt(0)}</span>
            )}
          </div>
          <span className="text-xs font-bold hidden sm:inline">{user?.name.split(' ')[0]}</span>
        </Link>
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

        {/* Sidebar */}
        <aside className={cn(
          "fixed lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] z-40 bg-white border-r w-64 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 print:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-6 border-b flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center text-primary text-2xl font-black mb-3 border-2 border-primary/10 overflow-hidden">
              {user?.profilePic ? (
                <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-black">{user?.name.charAt(0)}</span>
              )}
            </div>
            <h3 className="font-black text-sm uppercase tracking-tight text-center truncate w-full">{user?.name}</h3>
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">{user?.role.replace('_', ' ')}</p>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
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

          <div className="p-4 border-t mt-auto">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive text-xs font-black uppercase tracking-widest transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
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
