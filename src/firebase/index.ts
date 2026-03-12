'use client';

/**
 * MOCK FIREBASE IMPLEMENTATION
 * This file replaces the real Firebase SDK calls with a LocalStorage-based system.
 */

import { useState, useEffect, useMemo } from 'react';

// Mock DB Utility
const getStorage = (key: string) => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export function initializeFirebase() {
  return {
    app: {} as any,
    firestore: {} as any,
    auth: {
      signOut: async () => {
        localStorage.removeItem('currentUser');
        window.dispatchEvent(new Event('storage'));
      }
    } as any
  };
}

export function getAuth() {
  return initializeFirebase().auth;
}

export function getFirestore() {
  return initializeFirebase().firestore;
}

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        const u = JSON.parse(stored);
        setUser(u);
        const users = getStorage('users');
        const p = users.find((item: any) => item.uid === u.uid || item.email === u.email);
        setProfile(p || u);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  return { user, profile, loading };
}

export function useCollection(queryObj: { collection: string; teacherId?: string; studentId?: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Memoize parameters to avoid infinite loops if an inline object is passed
  const queryKey = useMemo(() => JSON.stringify(queryObj), [queryObj]);

  useEffect(() => {
    const parsedQuery = JSON.parse(queryKey);
    const key = parsedQuery.collection || 'subjects';
    const items = getStorage(key);
    
    let filtered = items;
    if (parsedQuery.teacherId) {
      filtered = filtered.filter((i: any) => i.teacherId === parsedQuery.teacherId);
    }
    if (parsedQuery.studentId && key === 'enrollments') {
      filtered = filtered.filter((i: any) => i.studentId === parsedQuery.studentId);
    }

    setData(filtered);
    setLoading(false);
  }, [queryKey]);

  return { data, loading };
}

export function useDoc(docPath: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!docPath) return;
    const parts = docPath.split('/');
    if (parts.length < 2) return;
    
    const collection = parts[0];
    const id = parts[1];
    const items = getStorage(collection);
    setData(items.find((i: any) => i.uid === id || i.id === id) || null);
    setLoading(false);
  }, [docPath]);

  return { data, loading };
}

export { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from './provider';
export { FirebaseClientProvider } from './client-provider';
