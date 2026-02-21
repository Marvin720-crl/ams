
'use client';

import { useState, useEffect } from 'react';
import { Subject, User, Attendance } from '@/utils/storage';
import { getUsersAction, getEnrollmentsAction, getAttendancesAction } from '@/app/actions/dbActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, CheckCircle, XCircle, Clock, School } from 'lucide-react';
import StudentInfoDialog from './StudentInfoDialog';

interface SubjectDetailsProps {
  subject: Subject;
  onBack: () => void;
}

export default function SubjectDetails({ subject, onBack }: SubjectDetailsProps) {
  const [enrolledStudents, setEnrolledStudents] = useState<User[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  useEffect(() => {
    loadData();
  }, [subject.id]);

  const loadData = async () => {
    const users = await getUsersAction();
    const enrollments = await getEnrollmentsAction();
    const allAttendances = await getAttendancesAction();
    
    const subjectEnrollments = enrollments.filter(e => 
      e.subjectId === subject.id && e.status === 'approved'
    );
    const studentIds = subjectEnrollments.map(e => e.studentId);
    const students = users.filter(u => studentIds.includes(u.id));
    
    setEnrolledStudents(students);
    setAttendances(allAttendances);
  };

  const getStudentAttendanceStats = (studentId: string) => {
    const studentAttendances = attendances.filter(
      a => a.studentId === studentId && a.subjectId === subject.id
    );
    
    const present = studentAttendances.filter(a => a.status === 'present').length;
    const late = studentAttendances.filter(a => a.status === 'late').length;
    const absent = studentAttendances.filter(a => a.status === 'absent').length;
    const total = studentAttendances.length;
    
    return { present, late, absent, total };
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-5">
          <Button variant="ghost" onClick={onBack} className="hover:bg-primary/5 hover:text-primary mb-4 h-10 rounded-xl font-black text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
              <School className="text-white h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-primary tracking-tighter leading-none">{subject.name}</h1>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.3em] mt-2">{subject.day} • {subject.startTime}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-7xl">
        <Card className="border-primary/5 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10 p-10">
            <CardTitle className="text-2xl font-black flex items-center gap-4">
              <Users className="w-8 h-8 text-primary" />
              Class Roster ({enrolledStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            {enrolledStudents.length === 0 ? (
              <div className="text-center py-24 bg-muted/20 rounded-[2rem] border-4 border-dashed border-primary/10">
                <Users className="h-16 w-16 text-primary/20 mx-auto mb-4" />
                <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Waiting for student enrollments</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledStudents.map((student) => {
                  const stats = getStudentAttendanceStats(student.id);
                  return (
                    <Card 
                      key={student.id}
                      className="cursor-pointer hover:shadow-2xl transition-all border-primary/5 hover:border-primary/20 group rounded-[2rem] bg-white"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <CardContent className="p-8">
                        <div className="flex flex-col space-y-6">
                          <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center border-2 border-white shadow-md overflow-hidden rotate-2 group-hover:rotate-0 transition-all">
                              {student.profilePic ? (
                                <img src={student.profilePic} alt={student.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-primary text-xl font-black">{student.name.charAt(0)}</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-lg group-hover:text-primary transition-colors tracking-tight truncate">{student.name}</p>
                              <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">ID: {student.id}</p>
                            </div>
                          </div>
                          
                          <div className="border-t border-primary/5 pt-6 space-y-4">
                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Live Statistics</p>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="text-center p-3 rounded-2xl bg-green-50 border border-green-100">
                                <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
                                <p className="text-xl font-black text-green-700 leading-none">{stats.present}</p>
                                <p className="text-[8px] font-black text-green-600 uppercase tracking-widest mt-1">Present</p>
                              </div>
                              <div className="text-center p-3 rounded-2xl bg-amber-50 border border-amber-100">
                                <Clock className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                                <p className="text-xl font-black text-amber-700 leading-none">{stats.late}</p>
                                <p className="text-[8px] font-black text-amber-600 uppercase tracking-widest mt-1">Late</p>
                              </div>
                              <div className="text-center p-3 rounded-2xl bg-red-50 border border-red-100">
                                <XCircle className="w-4 h-4 text-red-600 mx-auto mb-1" />
                                <p className="text-xl font-black text-red-700 leading-none">{stats.absent}</p>
                                <p className="text-[8px] font-black text-red-600 uppercase tracking-widest mt-1">Absent</p>
                              </div>
                            </div>
                            {stats.total > 0 && (
                              <div className="pt-4 border-t border-primary/5 flex justify-between items-center">
                                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Rate</span>
                                <span className="font-black text-xl text-primary">
                                  {Math.round(((stats.present + stats.late) / stats.total) * 100)}%
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {selectedStudent && (
        <StudentInfoDialog
          student={selectedStudent}
          subject={subject}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
