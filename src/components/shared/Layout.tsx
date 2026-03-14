
'use client';

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home, Book, FileText, Calendar, Users, Settings, LogOut,
  BookOpen, BarChart3, FileCheck, Menu, X, Monitor, MapPin, Scan, GraduationCap, MessageCircle, School, ShieldAlert, HelpCircle, Palette
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
          { id: 'lab-view', label: 'Lab View', icon: Monitor },
          { id: 'attendance-records', label: 'Attendance Records', icon: FileCheck },
        ];
      case 'admin':
        return [
          { id: 'home', label: 'Dashboard', icon: Home },
          { id: 'design', label: 'Design Lab', icon: Palette },
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
    <div className="min-h-screen bg-[#CED3D7]/20 flex flex-col">
      {/* HEADER: Controlled by Header Variable */}
      <header 
        style={{ backgroundColor: 'hsl(var(--header))' }}
        className="text-white h-28 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shadow-xl print:hidden"
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg lg:hidden"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="AMA Student Portal" 
              width={280} 
              height={72} 
              className="h-20 w-auto" 
              priority
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setGuideOpen(true)}
            className="hidden md:flex h-12 px-6 items-center gap-2 bg-accent text-white hover:bg-accent/90 rounded-full transition-all border border-accent/10 shadow-lg"
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
              className="fixed inset-0 bg-secondary/60 z-40 lg:hidden backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* ASIDE: Controlled by Sidebar Variable */}
        <aside 
          style={{ backgroundColor: 'hsl(var(--sidebar))' }}
          className={cn(
            "fixed inset-y-0 left-0 z-[60] lg:z-40 lg:sticky lg:top-28 lg:h-[calc(100vh-7rem)] border-r border-white/5 w-72 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 print:hidden shadow-2xl lg:shadow-none",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div 
            onClick={() => handleNav('profile')}
            className="pt-12 pb-10 px-6 flex flex-col items-center bg-gradient-to-b from-primary/10 to-transparent cursor-pointer group"
          >
            <div className="w-24 h-24 rounded-[2rem] bg-primary flex items-center justify-center text-4xl text-white font-black shadow-xl shadow-primary/20 rotate-3 mb-6 transition-transform group-hover:rotate-0 overflow-hidden border-4 border-accent/20">
              {user?.profilePic ? (
                <img src={user.profilePic} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0) || 'S'
              )}
            </div>
            <h2 className="text-sm font-black uppercase tracking-tight text-center leading-tight text-white px-4 group-hover:text-accent transition-colors">
              {user?.name}
            </h2>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 text-center">
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
                      ? "bg-white/10 text-accent border-l-4 border-accent shadow-lg scale-[1.02]" 
                      : "text-white/40 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon size={18} className={cn(
                    "transition-colors",
                    isActive ? "text-accent" : "text-white/20 group-hover:text-white"
                  )} />
                  {item.label}
                </button>
              );
            })}

            <div className="pt-6 mt-6 border-t border-white/5">
              <button
                onClick={() => setGuideOpen(true)}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-accent hover:bg-white/5 transition-all"
              >
                <HelpCircle size={18} />
                User Guide
              </button>
            </div>
          </nav>
        </aside>

        <main className="flex-1 min-w-0 bg-secondary/[0.02] p-4 md:p-10">
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
