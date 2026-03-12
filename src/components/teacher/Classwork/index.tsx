'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getSubjectsAction } from '@/app/actions/dbActions';
import { Subject } from '@/utils/storage';
import { Loader2, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SubjectClasswork from './SubjectClasswork';

export default function Classwork() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  useEffect(() => {
    if (user) {
      loadSubjects();
    }
  }, [user]);

  const loadSubjects = async () => {
    if (!user) return;
    setLoading(true);
    const allSubjects = await getSubjectsAction();
    const mySubjects = allSubjects.filter((s: Subject) => s.teacherId === user.id);
    setSubjects(mySubjects);
    setLoading(false);
  };
  
  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary"/></div>
  }

  if (selectedSubject) {
    return <SubjectClasswork subject={selectedSubject} onBack={() => setSelectedSubject(null)} />;
  }

  return (
    <div>
      <h2 className="text-3xl mb-2">Classwork Management</h2>
      <p className="text-gray-600 mb-8">Select a subject to manage tasks and view submissions.</p>

      {subjects.length === 0 ? (
         <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <BookOpen size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">You have not created any subjects.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
            {subjects.map(subject => (
                <Card 
                    key={subject.id} 
                    className="cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setSelectedSubject(subject)}
                >
                    <CardContent className="p-6">
                        <h3 className="font-bold text-lg text-primary">{subject.name}</h3>
                        <p className="text-sm text-muted-foreground">{subject.schedules?.map(s => s.day).join(', ')}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      )}
    </div>
  );
}
