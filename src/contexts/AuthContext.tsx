
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../utils/storage';
import { getUserByIdAction, updateLastSeenAction } from '@/app/actions/dbActions';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateCurrentUser: (updates: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
        // 1. QUICK LOAD: Check localStorage first for instant access
        const cachedUser = localStorage.getItem('cached_user_profile');
        const currentUserId = localStorage.getItem('currentUserId');
        
        if (cachedUser) {
            setUser(JSON.parse(cachedUser));
            setLoading(false); // Disable loading immediately if we have a cache
        }

        if (currentUserId) {
            if (currentUserId === 'admin') {
                const admin = {
                  id: 'admin',
                  name: 'System Administrator',
                  email: 'admin@school.edu',
                  password: 'ADMIN@2026',
                  role: 'admin' as const
                };
                setUser(admin);
                localStorage.setItem('cached_user_profile', JSON.stringify(admin));
            } else {
                try {
                    // 2. BACKGROUND SYNC: Refresh data from server in background
                    const currentUser = await getUserByIdAction(currentUserId);
                    if (currentUser) {
                        setUser(currentUser);
                        localStorage.setItem('cached_user_profile', JSON.stringify(currentUser));
                    }
                } catch (e) {
                    console.warn("Network weak, using cached profile.");
                }
            }
        }
        setLoading(false);
    };
    checkUser();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'currentUserId') {
        checkUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Real-time presence heartbeat
  useEffect(() => {
    if (!user || user.id === 'admin') return;

    // Initial heartbeat
    updateLastSeenAction(user.id);

    const interval = setInterval(() => {
      updateLastSeenAction(user.id);
    }, 30000); // 30 seconds heartbeat

    return () => clearInterval(interval);
  }, [user]);

  const login = (userToLogin: User) => {
    localStorage.setItem('currentUserId', userToLogin.id);
    localStorage.setItem('cached_user_profile', JSON.stringify(userToLogin));
    setUser(userToLogin);
  };

  const logout = () => {
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('cached_user_profile');
    setUser(null);
    window.location.href = '/';
  };

  const updateCurrentUser = (updates: Partial<User>) => {
    if (user) {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('cached_user_profile', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateCurrentUser, loading }}>
      {loading && !user ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted/10 p-4">
            <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-primary rounded-2xl mb-4" />
                <p className="text-muted-foreground font-black uppercase tracking-widest">AMS:AMACC</p>
                <p className="text-[8px] font-bold text-primary/40 mt-2 tracking-[0.3em]">OPTIMIZING CONNECTION...</p>
            </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
