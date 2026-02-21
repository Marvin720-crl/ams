'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getSubjectsAction, deleteSubjectAction } from '@/app/actions/dbActions';
import { Subject } from '@/utils/storage';
import { Book, Plus, Trash2, Edit, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import AddSubjectDialog from './AddSubjectDialog';
import EditSubjectDialog from './EditSubjectDialog';
import { Button } from '@/components/ui/button';

export default function ManageSubjects() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const loadSubjects = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const allSubjects = await getSubjectsAction();
      const teacherSubjects = allSubjects.filter(s => s.teacherId === user.id);
      setSubjects(teacherSubjects);
    } catch (e) {
      toast.error("Failed to load subjects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, [user]);

  const handleDelete = async (subject: Subject) => {
    if (!window.confirm(`Are you sure you want to delete ${subject.name}? This cannot be undone.`)) return;
    try {
      await deleteSubjectAction(subject.id);
      toast.success("Subject deleted.");
      loadSubjects();
    } catch (e) {
      toast.error("Failed to delete subject.");
    }
  };
  
  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary" size={48} /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl mb-2">Manage Subjects</h2>
          <p className="text-gray-600">Add, edit, or delete your course subjects.</p>
        </div>
        <AddSubjectDialog onSubjectAdded={loadSubjects} />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        {subjects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Book size={48} className="mx-auto mb-4 opacity-50 text-primary" />
            <p className="text-lg font-semibold mb-2">No Subjects Found</p>
            <p className="text-sm">Click "Provision Subject" to add your first course.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="p-4 rounded-xl flex items-center justify-between transition-colors bg-primary/5 border border-primary/10"
              >
                <div>
                  <p className="font-bold text-lg text-primary">{subject.name}</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                    {subject.day} • {subject.startTime} - {subject.dismissalTime}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => setEditingSubject(subject)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" className="h-10 w-10" onClick={() => handleDelete(subject)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingSubject && (
        <EditSubjectDialog
          subject={editingSubject}
          onClose={() => setEditingSubject(null)}
          onSubjectUpdated={() => {
            setEditingSubject(null);
            loadSubjects();
          }}
        />
      )}
    </div>
  );
}
