'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Subject, Classwork, Submission } from '@/utils/storage';
import { getClassworksAction, getSubmissionsAction } from '@/app/actions/dbActions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, CheckCircle, FileText, Download } from 'lucide-react';
import { format, isPast } from 'date-fns';
import SubmitWorkDialog from './SubmitWorkDialog';
import { Badge } from '@/components/ui/badge';

interface SubjectClassworkProps {
  subject: Subject;
  onBack: () => void;
}

export default function SubjectClasswork({ subject, onBack }: SubjectClassworkProps) {
  const { user } = useAuth();
  const [classworks, setClassworks] = useState<Classwork[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingWork, setSubmittingWork] = useState<Classwork | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    const [allClassworks, allSubmissions] = await Promise.all([
      getClassworksAction(),
      getSubmissionsAction(),
    ]);

    setClassworks(allClassworks.filter(cw => cw.subjectId === subject.id && cw.status === 'published'));
    setSubmissions(allSubmissions.filter(sub => sub.studentId === user.id));
    setLoading(false);
  };

  const getSubmissionStatus = (classworkId: string) => {
    const submission = submissions.find(s => s.classworkId === classworkId);
    if (submission) {
      return submission.status;
    }
    return 'pending';
  };
  
  if (loading) return <div>Loading classwork...</div>;

  return (
    <div>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Subjects
      </Button>
      <h2 className="text-3xl font-bold mb-2">{subject.name}</h2>
      <p className="text-gray-600 mb-8">All assigned tasks and activities for this subject.</p>

      {classworks.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <BookOpen size={48} className="mx-auto mb-4" />
          No classwork has been posted for this subject yet.
        </div>
      ) : (
        <div className="space-y-6">
          {classworks.map(cw => {
            const submission = submissions.find(s => s.classworkId === cw.id);
            const dueDate = new Date(cw.dueDate);
            const isLate = isPast(dueDate) && !submission;

            return (
              <div key={cw.id} className="bg-white rounded-xl shadow-md border p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="capitalize">{cw.type}</Badge>
                      <Badge variant="outline" className="font-bold border-primary text-primary">Points: {cw.totalPoints}</Badge>
                      {isLate && <Badge variant="destructive">Overdue</Badge>}
                    </div>
                    <h3 className="text-xl font-bold text-primary">{cw.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      <Clock className="inline-block h-4 w-4 mr-1" />
                      Due: {format(dueDate, "PPP, p")}
                    </p>
                    <p className="mt-4 text-gray-700 whitespace-pre-wrap">{cw.description}</p>
                    {cw.attachments && cw.attachments.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-2">Attachments</h4>
                        <div className="flex flex-col gap-2">
                          {cw.attachments.map((att, index) => (
                            <Button key={index} variant="outline" size="sm" asChild>
                              <a href={att.url} target="_blank" rel="noopener noreferrer" className="gap-2 justify-start">
                                <Download className="h-4 w-4" /> {att.name}
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:pl-6 mt-4 md:mt-0">
                    {!submission ? (
                      <Button onClick={() => setSubmittingWork(cw)} disabled={isLate}>
                        {isLate ? 'Past Due' : 'Submit Work'}
                      </Button>
                    ) : (
                       <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                          <p className="font-bold text-green-800 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Submitted on {format(new Date(submission.submittedAt), "MMM d")}
                          </p>
                          {submission.status === 'graded' && (
                            <div className="mt-2 p-3 bg-white rounded border border-green-100">
                                <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Your Score</p>
                                <p className="text-2xl font-black text-primary">
                                    {submission.grade} <span className="text-sm text-muted-foreground">/ {cw.totalPoints}</span>
                                </p>
                            </div>
                          )}
                       </div>
                    )}
                  </div>
                </div>
                 {submission && (
                   <div className="border-t mt-4 pt-4">
                      <h4 className="font-semibold text-sm mb-2">Your Submission</h4>
                      {submission.files && submission.files.length > 0 && (
                         <div className="flex flex-col gap-2">
                          {submission.files.map((file, i) => (
                            <Button key={i} variant="secondary" asChild size="sm">
                              <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                            </Button>
                          ))}
                         </div>
                      )}
                      {submission.textAnswer && (
                        <p className="text-sm bg-gray-100 p-3 rounded-md mt-2">{submission.textAnswer}</p>
                      )}
                      {submission.feedback && (
                        <div className="mt-3">
                           <h5 className="font-semibold text-xs mb-1">Feedback from Teacher:</h5>
                           <p className="text-sm bg-blue-50 p-3 rounded-md">{submission.feedback}</p>
                        </div>
                      )}
                   </div>
                 )}
              </div>
            );
          })}
        </div>
      )}
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
