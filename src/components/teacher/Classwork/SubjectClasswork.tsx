'use client';

import React, { useState, useEffect } from 'react';
import { Subject, Classwork, Material } from '@/utils/storage';
import { getClassworksAction, getMaterialsAction, deleteMaterialAction } from '@/app/actions/dbActions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, BookOpen, Loader2, Edit, Users, FileText, Trash2, Download, ClipboardList } from 'lucide-react';
import { format } from 'date-fns';
import CreateClassworkDialog from './CreateClassworkDialog';
import EditClassworkDialog from './EditClassworkDialog';
import CreateMaterialDialog from './CreateMaterialDialog';
import SubmissionsView from './SubmissionView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SubjectClassworkProps {
  subject: Subject;
  onBack: () => void;
}

export default function SubjectClasswork({ subject, onBack }: SubjectClassworkProps) {
  const [classworks, setClassworks] = useState<Classwork[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingMaterial, setIsCreatingMaterial] = useState(false);
  const [editingClasswork, setEditingClasswork] = useState<Classwork | null>(null);
  const [selectedClasswork, setSelectedClasswork] = useState<Classwork | null>(null);

  useEffect(() => {
    loadData();
  }, [subject]);

  const loadData = async () => {
    setLoading(true);
    const [allClassworks, allMaterials] = await Promise.all([
      getClassworksAction(),
      getMaterialsAction()
    ]);
    
    setClassworks(allClassworks.filter(cw => cw.subjectId === subject.id).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setMaterials(allMaterials.filter(m => m.subjectId === subject.id).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setLoading(false);
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this learning material?")) return;
    try {
      await deleteMaterialAction(id);
      loadData();
    } catch (e) {
      console.error(e);
    }
  };
  
  if (selectedClasswork) {
    return <SubmissionsView classwork={selectedClasswork} onBack={() => setSelectedClasswork(null)} />;
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2 -ml-2 hover:bg-primary/5 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Load
          </Button>
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter leading-none">{subject.name}</h2>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">Instructional Resource Hub</p>
        </div>
        
        <div className="flex gap-3">
            <Button onClick={() => setIsCreatingMaterial(true)} variant="outline" className="rounded-full h-12 px-6 border-primary/10 hover:bg-primary/5 font-black uppercase text-[10px] tracking-widest gap-2">
                <FileText className="h-4 w-4" /> Upload Module
            </Button>
            <Button onClick={() => setIsCreating(true)} className="rounded-full h-12 px-8 bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 font-black uppercase text-[10px] tracking-widest gap-2">
                <Plus className="h-4 w-4" /> Post Assessment
            </Button>
        </div>
      </div>

      <Tabs defaultValue="assessments" className="w-full">
        <TabsList className="bg-white border-2 border-primary/5 h-14 p-1.5 rounded-full mb-10 inline-flex">
          <TabsTrigger value="assessments" className="rounded-full font-black uppercase text-[10px] tracking-widest px-8 data-[state=active]:bg-primary data-[state=active]:text-white">Assessments</TabsTrigger>
          <TabsTrigger value="modules" className="rounded-full font-black uppercase text-[10px] tracking-widest px-8 data-[state=active]:bg-primary data-[state=active]:text-white">Learning Modules</TabsTrigger>
        </TabsList>

        <TabsContent value="assessments">
          {loading ? (
            <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary h-10 w-10" /></div>
          ) : classworks.length === 0 ? (
            <div className="text-center py-20 bg-white border-4 border-dashed rounded-[3rem] border-primary/5">
              <BookOpen size={56} className="mx-auto text-primary opacity-10 mb-6" />
              <h3 className="text-xl font-black uppercase tracking-tighter text-muted-foreground">No Assessments Yet</h3>
              <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-2">Start creating activities or quizzes for your students.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classworks.map(cw => (
                <div key={cw.id} className="bg-white rounded-[2.5rem] border border-primary/5 shadow-xl p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <ClipboardList size={80} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary mb-2 bg-primary/5 inline-block px-3 py-1 rounded-full">{cw.type.replace('_', ' ')}</p>
                    <h3 className="font-black text-2xl text-foreground leading-tight uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                      {cw.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-8">
                      <span className="text-red-500">DUE:</span>
                      {format(new Date(cw.dueDate), "MMM dd, yyyy • h:mm a")}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingClasswork(cw)}
                        className="flex-1 h-12 rounded-2xl gap-2 font-black uppercase text-[10px] tracking-widest border-primary/10 hover:bg-primary/5"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Modify
                      </Button>
                      <Button 
                        onClick={() => setSelectedClasswork(cw)}
                        className="flex-1 h-12 rounded-2xl gap-2 bg-primary text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/10"
                      >
                        <Users className="h-3.5 w-3.5" />
                        Submissions
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="modules">
          {loading ? (
            <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary h-10 w-10" /></div>
          ) : materials.length === 0 ? (
            <div className="text-center py-20 bg-white border-4 border-dashed rounded-[3rem] border-primary/5">
              <FileText size={56} className="mx-auto text-primary opacity-10 mb-6" />
              <h3 className="text-xl font-black uppercase tracking-tighter text-muted-foreground">No Modules Published</h3>
              <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-2">Upload study materials and lecture guides for your students.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map(m => (
                <div key={m.id} className="bg-white rounded-[2.5rem] border border-primary/5 shadow-xl p-8 hover:shadow-2xl transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-inner">
                      <FileText size={24} />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteMaterial(m.id)} className="rounded-full h-10 w-10 text-muted-foreground hover:text-red-600 hover:bg-red-50">
                        <Trash2 size={18} />
                    </Button>
                  </div>
                  <h3 className="font-black text-xl text-foreground leading-tight uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium line-clamp-2 mb-6">
                    {m.description || "No instructional notes provided."}
                  </p>
                  <div className="space-y-2">
                    {m.attachments.map((att, i) => (
                        <a key={i} href={att.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10">
                            <Download size={14} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-tight truncate flex-1">{att.name}</span>
                        </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {isCreating && (
        <CreateClassworkDialog
          subjectId={subject.id}
          onClose={() => setIsCreating(false)}
          onCreated={() => {
            setIsCreating(false);
            loadData();
          }}
        />
      )}

      {isCreatingMaterial && (
        <CreateMaterialDialog
          subjectId={subject.id}
          onClose={() => setIsCreatingMaterial(false)}
          onCreated={() => {
            setIsCreatingMaterial(false);
            loadData();
          }}
        />
      )}

      {editingClasswork && (
        <EditClassworkDialog
          classwork={editingClasswork}
          onClose={() => setEditingClasswork(null)}
          onUpdated={() => {
            setEditingClasswork(null);
            loadData();
          }}
        />
      )}
    </div>
  );
}
