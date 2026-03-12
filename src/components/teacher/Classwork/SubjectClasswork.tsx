'use client';

import React, { useState, useEffect } from 'react';
import { Subject, Classwork } from '@/utils/storage';
import { getClassworksAction } from '@/app/actions/dbActions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, BookOpen, Loader2, Edit, Users } from 'lucide-react';
import { format } from 'date-fns';
import CreateClassworkDialog from './CreateClassworkDialog';
import EditClassworkDialog from './EditClassworkDialog';
import SubmissionsView from './SubmissionView';

interface SubjectClassworkProps {
  subject: Subject;
  onBack: () => void;
}

export default function SubjectClasswork({ subject, onBack }: SubjectClassworkProps) {
  const [classworks, setClassworks] = useState<Classwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingClasswork, setEditingClasswork] = useState<Classwork | null>(null);
  const [selectedClasswork, setSelectedClasswork] = useState<Classwork | null>(null);

  useEffect(() => {
    loadClassworks();
  }, [subject]);

  const loadClassworks = async () => {
    setLoading(true);
    const allClassworks = await getClassworksAction();
    setClassworks(allClassworks.filter(cw => cw.subjectId === subject.id).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setLoading(false);
  };
  
  if (selectedClasswork) {
    return <SubmissionsView classwork={selectedClasswork} onBack={() => setSelectedClasswork(null)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Subjects
          </Button>
          <h2 className="text-3xl font-bold">{subject.name}</h2>
          <p className="text-gray-600">Manage all classwork and submissions for this subject.</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-6">
          <Plus className="h-4 w-4" /> Create Classwork
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary h-10 w-10" /></div>
      ) : classworks.length === 0 ? (
        <div className="text-center py-16 bg-white border-2 border-dashed rounded-3xl">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-500">No Assignments Yet</h3>
          <p className="text-sm text-gray-400">Click "Create Classwork" to start posting tasks for your students.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {classworks.map(cw => (
            <div key={cw.id} className="bg-white rounded-3xl border border-primary/5 shadow-sm p-6 hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{cw.type}</p>
                  <h3 className="font-black text-xl text-primary leading-tight uppercase group-hover:text-primary/80 transition-colors">
                    {cw.title}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 mt-1">
                    DUE: {format(new Date(cw.dueDate), "MMMM do, yyyy 'at' h:mm a")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setEditingClasswork(cw)}
                    className="h-10 rounded-full gap-2 border-primary/10 hover:border-primary/20"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedClasswork(cw)}
                    className="h-10 rounded-full gap-2 border-primary/10 hover:bg-primary/5 hover:text-primary"
                  >
                    <Users className="h-4 w-4" />
                    View Submissions
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isCreating && (
        <CreateClassworkDialog
          subjectId={subject.id}
          onClose={() => setIsCreating(false)}
          onCreated={() => {
            setIsCreating(false);
            loadClassworks();
          }}
        />
      )}

      {editingClasswork && (
        <EditClassworkDialog
          classwork={editingClasswork}
          onClose={() => setEditingClasswork(null)}
          onUpdated={() => {
            setEditingClasswork(null);
            loadClassworks();
          }}
        />
      )}
    </div>
  );
}
