'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
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
    }, 20000);

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

  const contextValue = useMemo(() => ({
    user, login, logout, updateCurrentUser, loading
  }), [user, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {loading && !user ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            <div className="animate-pulse flex flex-col items-center">
                <a 
                  href="https://myportfolio-48bb2.web.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-primary rounded-2xl mb-4 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-sm">AMS:AMACC</p>
                <p className="text-[8px] font-bold text-primary/40 mt-2 tracking-[0.3em] uppercase">Secure Channel Establishing...</p>
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
