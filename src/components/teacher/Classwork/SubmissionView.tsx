'use client';

import React, { useState, useEffect } from 'react';
import { Classwork, Submission, User, Enrollment } from '@/utils/storage';
import { getSubmissionsAction, getUsersAction, getEnrollmentsAction, updateSubmissionAction } from '@/app/actions/dbActions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, User as UserIcon, Download, Send } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from "@/components/ui/label";

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
        toast.success("Grade saved successfully!");
        loadSubmissions();
    } catch (e) {
        toast.error("Failed to save grade.");
    }
  };


  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Classwork
      </Button>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{classwork.title}</h2>
        <div className="flex items-center gap-4">
            <p className="text-gray-600">Review student submissions for this assignment.</p>
            <Badge variant="outline" className="font-bold border-primary text-primary">Total Points: {classwork.totalPoints}</Badge>
        </div>
      </div>

      <div className="space-y-4">
        {studentsWithSubmissions.map(({ student, submission }) => (
          <div key={student.id} className="bg-white rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {student.profilePic ? <img src={student.profilePic} className="w-full h-full object-cover" alt={student.name}/> : <UserIcon className="text-gray-500" />}
                    </div>
                    <div>
                        <p className="font-bold">{student.name}</p>
                        <p className="text-xs text-gray-500">ID: {student.id}</p>
                    </div>
                </div>
                {submission ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Submitted</Badge>
                ) : (
                  <Badge variant="destructive">Not Submitted</Badge>
                )}
            </div>

            {submission && (
                <div className="border-t mt-4 pt-4 space-y-4">
                    <p className="text-xs text-gray-500">Submitted on: {format(new Date(submission.submittedAt), "PPP p")}</p>
                    
                    {submission.files && submission.files.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-sm mb-2">Submitted Files:</h4>
                            <div className="flex flex-wrap gap-2">
                              {submission.files.map((file, i) => (
                                  <Button key={i} variant="secondary" size="sm" asChild>
                                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="gap-2"><Download className="h-4 w-4" />{file.name}</a>
                                  </Button>
                              ))}
                            </div>
                        </div>
                    )}

                    {submission.textAnswer && (
                        <div>
                            <h4 className="font-semibold text-sm mb-1">Student Answer:</h4>
                            <p className="text-sm p-3 bg-muted/50 rounded-md whitespace-pre-wrap">{submission.textAnswer}</p>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-4 bg-primary/5 p-4 rounded-xl border border-primary/10">
                        <div className="flex-1">
                            <Label htmlFor={`grade-${submission.id}`} className="text-xs font-bold uppercase tracking-widest text-primary">Score / {classwork.totalPoints}</Label>
                            <div className="flex items-center gap-2 mt-1">
                                <Input
                                    id={`grade-${submission.id}`}
                                    type="number"
                                    placeholder="Score"
                                    value={grades[submission.id] || ''}
                                    onChange={(e) => setGrades(g => ({...g, [submission.id]: e.target.value}))}
                                    className="h-10 text-center font-bold"
                                />
                                <span className="text-muted-foreground font-bold">/ {classwork.totalPoints}</span>
                            </div>
                        </div>
                        <div className="flex-[2]">
                            <Label htmlFor={`feedback-${submission.id}`} className="text-xs font-bold uppercase tracking-widest text-primary">Feedback</Label>
                            <Textarea
                                id={`feedback-${submission.id}`}
                                placeholder="Provide feedback to student..."
                                value={feedbacks[submission.id] || ''}
                                onChange={(e) => setFeedbacks(f => ({...f, [submission.id]: e.target.value}))}
                                className="h-10 mt-1 min-h-[40px]"
                            />
                        </div>
                        <div className="self-end">
                            <Button onClick={() => handleGradeSubmission(submission.id)} className="w-full md:w-auto gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-full">
                                <Send className="h-4 w-4"/>
                                Save Grade
                            </Button>
                        </div>
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
