'use client';

import React, { useState, useEffect } from 'react';
import { Classwork, Submission, User, Enrollment } from '@/utils/storage';
import { getSubmissionsAction, getUsersAction, getEnrollmentsAction, updateSubmissionAction } from '@/app/actions/dbActions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, User as UserIcon, Download, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
        toast.success("Grade saved and locked!");
        loadSubmissions();
    } catch (e) {
        toast.error("Failed to save grade.");
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary h-10 w-10" /></div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-4 hover:bg-primary/5 rounded-full">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Classwork
        </Button>
        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter leading-none">{classwork.title}</h2>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">Instructional Evaluation Console</p>
      </div>

      <div className="space-y-6">
        {studentsWithSubmissions.map(({ student, submission }) => {
          const isGraded = submission?.status === 'graded';
          
          return (
            <div key={student.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              {/* Header: Avatar, Name, ID, Badge */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center border">
                    {student.profilePic ? (
                      <img src={student.profilePic} className="h-full w-full object-cover rounded-full" alt={student.name}/>
                    ) : (
                      <UserIcon className="text-gray-400 h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">{student.name}</h3>
                    <p className="text-xs text-gray-500">ID: {student.id}</p>
                  </div>
                </div>
                {submission && (
                  <Badge className="bg-green-50 text-green-600 hover:bg-green-50 border border-green-100 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {isGraded ? "Graded" : "Submitted"}
                  </Badge>
                )}
              </div>

              {/* Horizontal Line */}
              <div className="border-t border-gray-100 pt-4">
                {submission ? (
                  <div className="space-y-6">
                    {/* Submission Date */}
                    <p className="text-[11px] text-gray-400">
                      Submitted on: {format(new Date(submission.submittedAt), "MMMM do, yyyy h:mm a")}
                    </p>

                    {/* Student Answer */}
                    <div className="space-y-2">
                      <h4 className="font-black text-xs text-gray-800 uppercase tracking-tight">STUDENT ANSWER:</h4>
                      <div className="bg-gray-50 rounded-2xl p-5 text-sm font-medium text-gray-700 min-h-[60px]">
                        {submission.textAnswer || <span className="italic text-gray-400 font-normal">No text content provided.</span>}
                      </div>
                    </div>

                    {/* Digital Assets / Files */}
                    {submission.files && submission.files.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-black text-[10px] text-gray-400 uppercase tracking-widest">DIGITAL ASSETS:</h4>
                        <div className="flex flex-wrap gap-2">
                          {submission.files.map((file, i) => (
                            <Button key={i} variant="outline" size="sm" asChild className="h-9 rounded-full px-4 text-xs font-bold gap-2">
                              <a href={file.url} target="_blank" rel="noopener noreferrer">
                                <Download size={14} /> {file.name}
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Grading Box (Matches Screenshot) */}
                    <div className="bg-red-50/30 border border-red-100 rounded-2xl p-5 flex flex-col md:flex-row items-end md:items-center gap-6">
                      <div className="flex-none w-full md:w-auto space-y-1.5">
                        <Label className="text-[10px] font-black text-red-600 uppercase ml-2">SCORE /</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Score"
                            value={grades[submission.id] || ''}
                            disabled={isGraded}
                            onChange={(e) => setGrades(g => ({...g, [submission.id]: e.target.value}))}
                            className="h-11 rounded-full border-gray-200 bg-white text-center font-bold w-full md:w-32 focus:ring-red-200"
                          />
                          <span className="text-gray-400 font-black text-lg">/</span>
                          <span className="text-gray-400 text-sm font-bold pr-2">{classwork.totalPoints}</span>
                        </div>
                      </div>

                      <div className="flex-1 w-full space-y-1.5">
                        <Label className="text-[10px] font-black text-red-600 uppercase ml-2">FEEDBACK</Label>
                        <Input
                          placeholder="Provide feedback to student..."
                          value={feedbacks[submission.id] || ''}
                          disabled={isGraded}
                          onChange={(e) => setFeedbacks(f => ({...f, [submission.id]: e.target.value}))}
                          className="h-11 rounded-full border-gray-200 bg-white px-6 font-medium focus:ring-red-200"
                        />
                      </div>

                      {!isGraded ? (
                        <Button 
                          onClick={() => handleGradeSubmission(submission.id)} 
                          className="h-11 px-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-black uppercase text-[10px] tracking-[0.1em] gap-2 shadow-lg shadow-red-200"
                        >
                          <Send size={14} /> Save Grade
                        </Button>
                      ) : (
                        <Button 
                          disabled 
                          className="h-11 px-8 rounded-full bg-green-500 text-white font-black uppercase text-[10px] tracking-[0.1em] gap-2 opacity-100"
                        >
                          <CheckCircle2 size={16} /> Grade Finalized
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center border-2 border-dashed rounded-2xl border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No submission record detected</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
