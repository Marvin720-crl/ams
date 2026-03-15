'use client';

import React, { useState, useEffect } from 'react';
import { Classwork, Submission, User, Enrollment } from '@/utils/storage';
import { getSubmissionsAction, getUsersAction, getEnrollmentsAction, updateSubmissionAction } from '@/app/actions/dbActions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, User as UserIcon, Download, Send, Lock, CheckCircle2 } from 'lucide-react';
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
    
    // Initialize grades and feedbacks state from existing submissions
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-4 hover:bg-primary/5 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Classwork
          </Button>
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter leading-none">{classwork.title}</h2>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">Submission & Grading Console</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border-2 border-primary/5 shadow-sm">
            <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest mb-1">Scale Matrix</p>
            <p className="font-black text-primary text-xl">MAX {classwork.totalPoints} PTS</p>
        </div>
      </div>

      <div className="space-y-6">
        {studentsWithSubmissions.map(({ student, submission }) => {
          const isGraded = submission?.status === 'graded';
          
          return (
            <div key={student.id} className={cn(
              "bg-white rounded-[2.5rem] border-2 p-8 shadow-xl transition-all",
              isGraded ? "border-green-100 bg-green-50/10" : "border-primary/5"
            )}>
              <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center overflow-hidden border-2 border-primary/5">
                          {student.profilePic ? (
                            <img src={student.profilePic} className="w-full h-full object-cover" alt={student.name}/>
                          ) : (
                            <UserIcon className="text-primary/40 w-8 h-8" />
                          )}
                      </div>
                      <div>
                          <p className="font-black text-xl text-primary uppercase tracking-tight leading-none">{student.name}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1.5">USN: {student.id}</p>
                      </div>
                  </div>
                  {submission ? (
                    <Badge className={cn(
                      "h-10 px-6 rounded-full font-black text-[9px] uppercase tracking-widest border-none shadow-md",
                      isGraded ? "bg-green-500 text-white" : "bg-primary text-white"
                    )}>
                      {isGraded ? "Grading Finalized" : "Pending Evaluation"}
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="h-10 px-6 rounded-full font-black text-[9px] uppercase tracking-widest">
                      Missing Output
                    </Badge>
                  )}
              </div>

              {submission && (
                  <div className="space-y-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-4">
                          <p className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.2em] flex items-center gap-2">
                            <Send size={12} /> Transmission Log: {format(new Date(submission.submittedAt), "MMM d, yyyy • h:mm a")}
                          </p>
                          
                          {submission.files && submission.files.length > 0 && (
                              <div className="space-y-3">
                                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/60">Digital Assets</h4>
                                  <div className="flex flex-wrap gap-3">
                                    {submission.files.map((file, i) => (
                                        <Button key={i} variant="outline" size="sm" asChild className="h-12 px-5 rounded-xl border-primary/10 hover:bg-primary hover:text-white transition-all font-bold">
                                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                                              <Download className="h-4 w-4" />
                                              {file.name}
                                            </a>
                                        </Button>
                                    ))}
                                  </div>
                              </div>
                          )}

                          {submission.textAnswer && (
                              <div className="space-y-3">
                                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/60">Response Text</h4>
                                  <div className="p-6 bg-muted/20 rounded-2xl border border-primary/5 text-sm font-medium leading-relaxed italic">
                                    "{submission.textAnswer}"
                                  </div>
                              </div>
                          )}
                        </div>

                        <div className={cn(
                          "flex-1 p-8 rounded-[2rem] border-2 transition-all relative overflow-hidden",
                          isGraded ? "bg-white border-green-200" : "bg-primary/5 border-primary/10"
                        )}>
                            {isGraded && (
                              <div className="absolute top-4 right-4 text-green-500/20">
                                <Lock size={48} />
                              </div>
                            )}

                            <div className="space-y-6">
                              <div className="space-y-2">
                                  <Label htmlFor={`grade-${submission.id}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Assigned Score</Label>
                                  <div className="flex items-center gap-4">
                                      <Input
                                          id={`grade-${submission.id}`}
                                          type="number"
                                          placeholder="0"
                                          value={grades[submission.id] || ''}
                                          disabled={isGraded}
                                          onChange={(e) => setGrades(g => ({...g, [submission.id]: e.target.value}))}
                                          className="h-16 text-center font-black text-2xl rounded-2xl border-none shadow-inner bg-white focus:ring-2 focus:ring-primary/20"
                                      />
                                      <span className="text-xl font-black text-primary/40">/ {classwork.totalPoints}</span>
                                  </div>
                              </div>

                              <div className="space-y-2">
                                  <Label htmlFor={`feedback-${submission.id}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Instructional Feedback</Label>
                                  <Textarea
                                      id={`feedback-${submission.id}`}
                                      placeholder="Leave a comment for the student..."
                                      value={feedbacks[submission.id] || ''}
                                      disabled={isGraded}
                                      onChange={(e) => setFeedbacks(f => ({...f, [submission.id]: e.target.value}))}
                                      className="rounded-2xl border-none shadow-inner bg-white min-h-[100px] p-4 font-bold focus:ring-2 focus:ring-primary/20"
                                  />
                              </div>

                              {!isGraded ? (
                                <Button 
                                  onClick={() => handleGradeSubmission(submission.id)} 
                                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 gap-3 transition-all active:scale-95"
                                >
                                    <Send className="h-5 w-5"/>
                                    Commit Grade
                                </Button>
                              ) : (
                                <div className="flex items-center justify-center gap-2 h-16 bg-green-500 text-white font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl shadow-lg shadow-green-500/20">
                                  <CheckCircle2 size={18} />
                                  GRADE RECORDED & LOCKED
                                </div>
                              )}
                            </div>
                        </div>
                      </div>
                  </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
