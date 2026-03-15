
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Subject, Classwork, Submission, Material } from '@/utils/storage';
import { getClassworksAction, getSubmissionsAction, getMaterialsAction } from '@/app/actions/dbActions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, CheckCircle, FileText, Download, ClipboardList } from 'lucide-react';
import { format, isPast } from 'date-fns';
import SubmitWorkDialog from './SubmitWorkDialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SubjectClassworkProps {
  subject: Subject;
  onBack: () => void;
}

export default function SubjectClasswork({ subject, onBack }: SubjectClassworkProps) {
  const { user } = useAuth();
  const [classworks, setClassworks] = useState<Classwork[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingWork, setSubmittingWork] = useState<Classwork | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    const [allClassworks, allSubmissions, allMaterials] = await Promise.all([
      getClassworksAction(),
      getSubmissionsAction(),
      getMaterialsAction()
    ]);

    setClassworks(allClassworks.filter(cw => cw.subjectId === subject.id && cw.status === 'published'));
    setMaterials(allMaterials.filter(m => m.subjectId === subject.id));
    setSubmissions(allSubmissions.filter(sub => sub.studentId === user.id));
    setLoading(false);
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary h-10 w-10" /></div>;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-start justify-between mb-10">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2 -ml-2 hover:bg-primary/5 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Load
          </Button>
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter leading-none">{subject.name}</h2>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">Course Resource Hub</p>
        </div>
      </div>

      <Tabs defaultValue="assessments" className="w-full">
        <TabsList className="bg-white border-2 border-primary/5 h-14 p-1.5 rounded-full mb-10 inline-flex">
          <TabsTrigger value="assessments" className="rounded-full font-black uppercase text-[10px] tracking-widest px-8 data-[state=active]:bg-primary data-[state=active]:text-white">Pending Tasks</TabsTrigger>
          <TabsTrigger value="modules" className="rounded-full font-black uppercase text-[10px] tracking-widest px-8 data-[state=active]:bg-primary data-[state=active]:text-white">Learning Modules</TabsTrigger>
        </TabsList>

        <TabsContent value="assessments">
          {classworks.length === 0 ? (
            <div className="text-center py-20 bg-white border-4 border-dashed rounded-[3rem] border-primary/5">
              <ClipboardList size={56} className="mx-auto text-primary opacity-10 mb-6" />
              <h3 className="text-xl font-black uppercase tracking-tighter text-muted-foreground">Clear Dashboard</h3>
              <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-2">Walang nakatakdang activities sa subject na ito.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {classworks.map(cw => {
                const submission = submissions.find(s => s.classworkId === cw.id);
                const dueDate = new Date(cw.dueDate);
                const isLate = isPast(dueDate) && !submission;

                return (
                  <div key={cw.id} className="bg-white rounded-[2.5rem] shadow-xl border border-primary/5 p-8 md:p-10 transition-all hover:shadow-2xl">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="h-7 px-4 font-black text-[9px] uppercase tracking-widest border-primary/10 bg-primary/5 text-primary">{cw.type.replace('_', ' ')}</Badge>
                          <Badge variant="outline" className="h-7 px-4 font-black text-[9px] uppercase tracking-widest border-primary/10">{cw.totalPoints} POINTS</Badge>
                          {isLate && <Badge variant="destructive" className="h-7 px-4 font-black text-[9px] uppercase tracking-widest animate-pulse">LATE</Badge>}
                        </div>
                        
                        <div>
                          <h3 className="text-3xl font-black text-foreground leading-none uppercase tracking-tight mb-2">{cw.title}</h3>
                          <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                            <Clock className="h-3 w-3 text-primary" />
                            DEADLINE: {format(dueDate, "MMM dd, yyyy • h:mm a")}
                          </div>
                        </div>

                        <div className="bg-muted/20 rounded-[1.5rem] p-6 text-sm font-medium text-muted-foreground leading-relaxed">
                          {cw.description || "No specific instructions provided."}
                        </div>

                        {cw.attachments && cw.attachments.length > 0 && (
                          <div className="space-y-3">
                            <p className="text-[9px] font-black uppercase tracking-widest text-primary/60 ml-1">REFERENCE MATERIALS</p>
                            <div className="flex flex-wrap gap-2">
                              {cw.attachments.map((att, index) => (
                                <Button key={index} variant="outline" size="sm" asChild className="h-10 rounded-xl px-4 text-[10px] font-bold gap-2 hover:bg-primary hover:text-white transition-all">
                                  <a href={att.url} target="_blank" rel="noopener noreferrer">
                                    <Download className="h-3.5 w-3.5" /> {att.name}
                                  </a>
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="lg:w-80 shrink-0">
                        {!submission ? (
                          <Button 
                            onClick={() => setSubmittingWork(cw)} 
                            disabled={isLate}
                            className="w-full h-20 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:grayscale"
                          >
                            {isLate ? 'CLOSED' : 'SUBMIT ASSET'}
                          </Button>
                        ) : (
                           <div className="bg-green-50 border-2 border-green-100 rounded-[2rem] p-8 text-center space-y-4">
                              <div className="h-12 w-12 rounded-2xl bg-green-500 text-white flex items-center justify-center mx-auto shadow-lg"><CheckCircle /></div>
                              <div>
                                <p className="font-black text-green-900 uppercase text-xs tracking-widest">TRANSMISSION OK</p>
                                <p className="text-[9px] font-bold text-green-600 uppercase mt-1">{format(new Date(submission.submittedAt), "MMM dd, yyyy")}</p>
                              </div>
                              {submission.status === 'graded' && (
                                <div className="pt-4 border-t border-green-100">
                                    <p className="text-[9px] font-black uppercase text-green-600 tracking-[0.2em] mb-1">SCORE REACHED</p>
                                    <p className="text-4xl font-black text-green-900 tracking-tighter">
                                        {submission.grade}<span className="text-lg opacity-30">/{cw.totalPoints}</span>
                                    </p>
                                </div>
                              )}
                           </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="modules">
          {materials.length === 0 ? (
            <div className="text-center py-20 bg-white border-4 border-dashed rounded-[3rem] border-primary/5">
              <FileText size={56} className="mx-auto text-primary opacity-10 mb-6" />
              <h3 className="text-xl font-black uppercase tracking-tighter text-muted-foreground">Library Empty</h3>
              <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-2">Walang learning modules na naka-upload para sa subject na ito.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {materials.map(m => (
                <div key={m.id} className="bg-white rounded-[2.5rem] border border-primary/5 shadow-xl p-8 hover:shadow-2xl transition-all group">
                  <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-inner mb-6">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="font-black text-xl text-foreground leading-tight uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium line-clamp-2 mb-8">
                    {m.description || "Instructional material for self-study."}
                  </p>
                  <div className="space-y-3">
                    {m.attachments.map((att, i) => (
                        <a key={i} href={att.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-muted/20 rounded-2xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10 group/item">
                            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm group-hover/item:scale-110 transition-transform">
                                <Download size={14} />
                            </div>
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

      {submittingWork && (
        <SubmitWorkDialog
          classwork={submittingWork}
          onClose={() => setSubmittingWork(null)}
          onSubmitted={() => {
            setSubmittingWork(null);
            loadData();
          }}
        />
      )}
    </div>
  );
}
