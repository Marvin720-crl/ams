'use client';

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home, Book, FileText, Calendar, Users, Settings, LogOut,
  BookOpen, BarChart3, FileCheck, Menu, X, RefreshCw, Monitor, MapPin, Scan, Sparkles, QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Layout({ children, currentView, onNavigate }: LayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getMenuItems = () => {
    if (!user) return [];
    switch (user.role) {
      case 'student':
        return [
          { id: 'home', label: 'Home', icon: Home },
          { id: 'subjects', label: 'My Subjects', icon: Book },
          { id: 'make-request', label: 'Make Request', icon: FileText },
          { id: 'my-requests', label: 'My Requests', icon: FileCheck },
          { id: 'my-sessions', label: 'My Sessions', icon: Calendar },
          { id: 'enroll', label: 'Enroll in Subject', icon: Users },
          { id: 'library', label: 'Library', icon: BookOpen },
        ];
      case 'teacher':
        return [
          { id: 'home', label: 'Home', icon: Home },
          { id: 'schedule', label: 'My Schedule', icon: Calendar },
          { id: 'scanner', label: 'QR Scanner', icon: QrCode },
          { id: 'manage-subjects', label: 'Manage Subjects', icon: Book },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-gray-50">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-[#b40000] via-[#c41010] to-[#b40000] text-white py-8 px-8 shadow-2xl relative overflow-hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
        <div className="flex items-center justify-between relative z-10">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Image src="/logo.png" alt="Logo" width={150} height={40} priority />
          </motion.div>
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.div>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed lg:sticky top-0 left-0 h-screen w-64 bg-white/80 backdrop-blur-xl shadow-2xl z-40 flex flex-col border-r border-gray-200/50"
            >
              {/* User Info */}
              <Link href="/profile">
                <motion.div 
                  className="p-6 border-b border-gray-200/50 hover:bg-gray-50/50 transition-colors"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-[#b40000] to-[#8b0000] rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {user?.profilePic ? (
                        <Image src={user.profilePic} alt={user.name} width={80} height={80} className="rounded-2xl object-cover" />
                    ) : (
                        user?.name.charAt(0).toUpperCase()
                    )}
                  </motion.div>
                  <h3 className="text-center mb-1">{user?.name}</h3>
                  <p className="text-center text-sm text-gray-500 capitalize">{user?.role.replace('_', ' ')}</p>
                </motion.div>
              </Link>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4">
                <motion.button
                  onClick={() => window.location.reload()}
                  className="w-full px-6 py-2 flex items-center gap-3 text-gray-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent transition-all duration-300 rounded-r-xl mr-4"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw size={18} />
                  <span>Refresh</span>
                </motion.button>
                
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2 mx-4" />

                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full px-6 py-3 flex items-center gap-3 transition-all duration-300 rounded-r-xl mr-4 relative ${
                        isActive
                          ? 'bg-gradient-to-r from-red-50 to-transparent text-[#b40000] shadow-sm'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent'
                      }`}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * index, duration: 0.3 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div 
                          className="absolute left-0 top-0 bottom-0 w-1 bg-[#b40000] rounded-r-full"
                          layoutId="activeTab"
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      )}
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Logout */}
              <motion.div 
                className="p-4 border-t border-gray-200/50"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.button
                  onClick={logout}
                  className="w-full px-4 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-red-50 hover:to-red-100 text-gray-700 hover:text-[#b40000] rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </motion.button>
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
