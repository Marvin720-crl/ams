'use client';

import React, { useState, useEffect } from 'react';
import { Classwork, Submission, User, Enrollment } from '@/utils/storage';
import { getSubmissionsAction, getUsersAction, getEnrollmentsAction, updateSubmissionAction } from '@/app/actions/dbActions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, User as UserIcon, Download, Send, Lock, CheckCircle2, FileIcon } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

interface SubmissionsViewProps {
  classwork: Classwork;
  onBack: () => void;
}

type StudentWithSubmission = {
  student: User;
  submission: Submission | null;
};

export default function SubmissionsView({ classwork, onBack }: SubmissionsViewProps) {
  const [studentsWithSubmissions, setStudentsWithSubmissions] = useState<StudentWithSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});

  useEffect(() => {
    loadSubmissions();
  }, [classwork]);

  const loadSubmissions = async () => {
    setLoading(true);
    const [allSubmissions, allUsers, allEnrollments] = await Promise.all([
      getSubmissionsAction(),
      getUsersAction(),
      getEnrollmentsAction()
    ]);

    const enrolledStudents = allEnrollments
      .filter(en => en.subjectId === classwork.subjectId && en.status === 'approved')
      .map(en => allUsers.find(u => u.id === en.studentId))
      .filter((u): u is User => !!u);
      
    const classworkSubmissions = allSubmissions.filter(sub => sub.classworkId === classwork.id);

    const combinedData = enrolledStudents.map(student => {
      const submission = classworkSubmissions.find(s => s.studentId === student.id) || null;
      return { student, submission };
    });
    
    const initialGrades: Record<string, string> = {};
    const initialFeedbacks: Record<string, string> = {};
    combinedData.forEach(({ submission }) => {
        if(submission?.id) {
            initialGrades[submission.id] = submission.grade?.toString() || '';
            initialFeedbacks[submission.id] = submission.feedback || '';
        }
    });
    setGrades(initialGrades);
    setFeedbacks(initialFeedbacks);

    setStudentsWithSubmissions(combinedData);
    setLoading(false);
  };
  
  const handleGradeSubmission = async (submissionId: string) => {
    const grade = grades[submissionId];
    const feedback = feedbacks[submissionId];
    
    if(!grade) {
        toast.warning("Please enter a grade.");
        return;
    }

    try {
        await updateSubmissionAction(submissionId, {
            grade: parseFloat(grade),
            feedback: feedback,
            status: 'graded'
        });
        toast.success("Grade saved and locked successfully!");
        loadSubmissions();
    } catch (e) {
        toast.error("Failed to save grade.");
    }
  };


  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-4 hover:bg-primary/5 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Classwork
          </Button>
          <h2 className="text-3xl font-black text-primary uppercase tracking-tighter leading-none">{classwork.title}</h2>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">Instructional Evaluation Console</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border-2 border-primary/5 shadow-sm">
            <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest mb-1">Scale Matrix</p>
            <p className="font-black text-primary text-xl">MAX {classwork.totalPoints} PTS</p>
        </div>
      </div>

      <div className="space-y-10">
        {studentsWithSubmissions.map(({ student, submission }) => {
          const isGraded = submission?.status === 'graded';
          
          return (
            <div key={student.id} className={cn(
              "bg-[#f0f9f6]/50 rounded-[3rem] border-2 p-8 md:p-12 shadow-xl transition-all",
              isGraded ? "border-green-100" : "border-primary/5"
            )}>
              <div className="flex items-start justify-between mb-10">
                  <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-[1.5rem] bg-red-50 flex items-center justify-center overflow-hidden border-2 border-red-100 shadow-inner">
                          {student.profilePic ? (
                            <img src={student.profilePic} className="w-full h-full object-cover" alt={student.name}/>
                          ) : (
                            <UserIcon className="text-primary/20 w-10 h-10" />
                          )}
                      </div>
                      <div>
                          <p className="font-black text-2xl text-primary uppercase tracking-tight leading-none mb-2">{student.name}</p>
                          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">USN: {student.id}</p>
                      </div>
                  </div>
                  {submission ? (
                    <Badge className={cn(
                      "h-12 px-8 rounded-full font-black text-[10px] uppercase tracking-widest border-none shadow-lg",
                      isGraded ? "bg-green-500 text-white" : "bg-primary text-white"
                    )}>
                      {isGraded ? "Grading Finalized" : "Pending Evaluation"}
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="h-12 px-8 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">
                      Missing Output
                    </Badge>
                  )}
              </div>

              {submission ? (
                  <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 space-y-10">
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] flex items-center gap-2 mb-6">
                          <Send size={14} className="text-primary/40" /> Transmission Log: {format(new Date(submission.submittedAt), "MMM d, yyyy • h:mm a")}
                        </p>
                        
                        {submission.files && submission.files.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Digital Assets</h4>
                                <div className="flex flex-wrap gap-4">
                                  {submission.files.map((file, i) => (
                                      <Button key={i} variant="outline" size="lg" asChild className="h-14 px-8 rounded-full border-primary/10 hover:bg-primary hover:text-white transition-all font-black text-xs shadow-sm bg-white gap-3">
                                          <a href={file.url} target="_blank" rel="noopener noreferrer">
                                            <Download className="h-4 w-4" />
                                            {file.name}
                                          </a>
                                      </Button>
                                  ))}
                                </div>
                            </div>
                        )}

                        {submission.textAnswer && (
                            <div className="space-y-4 mt-8">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Response Text</h4>
                                <div className="p-8 bg-white rounded-[2rem] border-2 border-primary/5 text-sm font-bold text-foreground leading-relaxed italic shadow-inner">
                                  "{submission.textAnswer}"
                                </div>
                            </div>
                        )}
                      </div>
                    </div>

                    <div className={cn(
                      "w-full lg:w-[450px] p-10 rounded-[3rem] border-2 transition-all relative shadow-2xl bg-white",
                      isGraded ? "border-green-200" : "border-primary/10"
                    )}>
                        {isGraded && (
                          <div className="absolute top-8 right-8 text-green-500/20">
                            <Lock size={56} />
                          </div>
                        )}

                        <div className="space-y-8">
                          <div className="space-y-4">
                              <Label htmlFor={`grade-${submission.id}`} className="text-[11px] font-black uppercase tracking-[0.2em] text-primary ml-1">Assigned Score</Label>
                              <div className="flex items-center justify-center gap-4 bg-muted/10 p-6 rounded-2xl relative">
                                  <Input
                                      id={`grade-${submission.id}`}
                                      type="number"
                                      placeholder="0"
                                      value={grades[submission.id] || ''}
                                      disabled={isGraded}
                                      onChange={(e) => setGrades(g => ({...g, [submission.id]: e.target.value}))}
                                      className="h-20 text-center font-black text-5xl rounded-none border-none shadow-none bg-transparent focus:ring-0 p-0"
                                  />
                                  <div className="text-3xl font-black text-primary/30 flex items-center">
                                    <span className="mr-2">/</span>
                                    <span className="text-primary/40">{classwork.totalPoints}</span>
                                  </div>
                              </div>
                          </div>

                          <div className="space-y-4">
                              <Label htmlFor={`feedback-${submission.id}`} className="text-[11px] font-black uppercase tracking-[0.2em] text-primary ml-1">Instructional Feedback</Label>
                              <Textarea
                                  id={`feedback-${submission.id}`}
                                  placeholder="Leave a comment for the student..."
                                  value={feedbacks[submission.id] || ''}
                                  disabled={isGraded}
                                  onChange={(e) => setFeedbacks(f => ({...f, [submission.id]: e.target.value}))}
                                  className="rounded-[1.5rem] border-primary/5 shadow-inner bg-muted/5 min-h-[120px] p-6 font-bold text-sm focus:ring-2 focus:ring-primary/20"
                              />
                          </div>

                          {!isGraded ? (
                            <Button 
                              onClick={() => handleGradeSubmission(submission.id)} 
                              className="w-full h-20 bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-[0.3em] rounded-[1.5rem] shadow-xl shadow-primary/20 gap-4 transition-all active:scale-95"
                            >
                                <Send className="h-5 w-5"/>
                                Commit Grade Record
                            </Button>
                          ) : (
                            <div className="flex items-center justify-center gap-3 h-20 bg-green-500 text-white font-black uppercase text-[11px] tracking-[0.3em] rounded-[1.5rem] shadow-xl shadow-green-500/20">
                              <CheckCircle2 size={24} />
                              GRADE RECORDED & LOCKED
                            </div>
                          )}
                        </div>
                    </div>
                  </div>
              ) : (
                <div className="p-12 text-center border-2 border-dashed rounded-[2rem] border-primary/10">
                   <p className="font-black text-muted-foreground/40 uppercase tracking-[0.3em]">No submission payload detected</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
