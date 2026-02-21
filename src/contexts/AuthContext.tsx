
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../utils/storage';
import { getUserByIdAction } from '@/app/actions/dbActions';

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
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId) {
            if (currentUserId === 'admin') {
                setUser({
                  id: 'admin',
                  name: 'System Administrator',
                  email: 'admin@school.edu',
                  password: 'ADMIN@2026',
                  role: 'admin'
                });
            } else {
                try {
                    const currentUser = await getUserByIdAction(currentUserId);
                    setUser(currentUser);
                } catch (e) {
                    console.error("Failed to fetch user, logging out.");
                    localStorage.removeItem('currentUserId');
                    setUser(null);
                }
            }
        }
        setLoading(false);
    };
    checkUser();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'currentUserId') {
        setLoading(true);
        checkUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (userToLogin: User) => {
    localStorage.setItem('currentUserId', userToLogin.id);
    setUser(userToLogin);
  };

  const logout = () => {
    localStorage.removeItem('currentUserId');
    setUser(null);
    // Full page reload to reset all state
    window.location.href = '/';
  };

  const updateCurrentUser = (updates: Partial<User>) => {
    if (user) {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateCurrentUser, loading }}>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted/10 p-4">
            <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-primary rounded-2xl mb-4" />
                <p className="text-muted-foreground font-black uppercase tracking-widest">AMS:AMACC</p>
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
