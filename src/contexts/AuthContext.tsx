'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../utils/storage';
import { getUserByIdAction, updateLastSeenAction } from '@/app/actions/dbActions';
import { toast } from 'sonner';

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

  const logout = () => {
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('cached_user_profile');
    setUser(null);
    window.location.href = '/';
  };

  useEffect(() => {
    const checkUser = async () => {
        const currentUserId = localStorage.getItem('currentUserId');
        
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
            } else {
                try {
                    const currentUser = await getUserByIdAction(currentUserId);
                    if (currentUser) {
                        if (currentUser.isBanned) {
                            toast.error("SECURITY PROTOCOL: Your account has been permanently terminated due to suspicious activity.");
                            logout();
                            return;
                        }
                        setUser(currentUser);
                        localStorage.setItem('cached_user_profile', JSON.stringify(currentUser));
                    } else {
                        logout();
                    }
                } catch (e: any) {
                    if (e.message?.includes('BANNED') || e.message?.includes('BREACH')) {
                        toast.error("SECURITY ALERT: Session Terminated & Account Locked.");
                        logout();
                    }
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

  // Real-time presence heartbeat + Security check
  useEffect(() => {
    if (!user || user.id === 'admin') return;

    const interval = setInterval(async () => {
      try {
          const freshUser = await getUserByIdAction(user.id);
          if (freshUser?.isBanned) {
              toast.error("IRON WALL: Account access revoked.");
              logout();
              return;
          }
          await updateLastSeenAction(user.id);
      } catch (e: any) {
          if (e.message?.includes('BANNED') || e.message?.includes('BREACH')) {
              toast.error("IRON WALL: Malicious behavior detected. Session locked.");
              logout();
          }
      }
    }, 20000); // More frequent check (20s) for aggressive security

    return () => clearInterval(interval);
  }, [user]);

  const login = (userToLogin: User) => {
    if (userToLogin.isBanned) {
        toast.error("ACCESS DENIED: Account is permanently blacklisted.");
        return;
    }
    localStorage.setItem('currentUserId', userToLogin.id);
    localStorage.setItem('cached_user_profile', JSON.stringify(userToLogin));
    setUser(userToLogin);
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
                <p className="text-[8px] font-bold text-primary/40 mt-2 tracking-[0.3em]">SECURE CHANNEL ESTABLISHING...</p>
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
