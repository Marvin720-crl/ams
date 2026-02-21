'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUsersAction, getEnrollmentsAction, getSubjectsAction } from '@/app/actions/dbActions';
import { User, Subject } from '@/utils/storage';
import { Users as UsersIcon } from 'lucide-react';

export default function EnrolledStudents() {
  const { user } = useAuth();
  const [enrolledStudents, setEnrolledStudents] = useState<Array<{student: User, subject: Subject}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadEnrolledStudents();
    }
  }, [user]);

  const loadEnrolledStudents = async () => {
    if (!user) return;
    setLoading(true);
    const allUsers = await getUsersAction();
    const allSubjects = await getSubjectsAction();
    const allEnrollments = await getEnrollmentsAction();
    
    const teacherSubjects = allSubjects.filter(s => s.teacherId === user.id);
    const teacherSubjectIds = teacherSubjects.map(s => s.id);

    const approvedEnrollments = allEnrollments.filter(e => 
      teacherSubjectIds.includes(e.subjectId) && e.status === 'approved'
    );

    const studentsWithSubjects = approvedEnrollments.map(enrollment => {
      const student = allUsers.find(u => u.id === enrollment.studentId);
      const subject = teacherSubjects.find(s => s.id === enrollment.subjectId);
      return { student: student!, subject: subject! };
    }).filter(item => item.student && item.subject);
    
    setEnrolledStudents(studentsWithSubjects);
    setLoading(false);
  };
  
  if (loading) {
    return <div>Loading students...</div>
  }

  return (
    <div>
      <h2 className="text-3xl mb-2">Enrolled Students</h2>
      <p className="text-gray-600 mb-8">View all students in your classes</p>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-4 text-left">Student</th>
                    <th className="px-4 py-4 text-left">Program</th>
                    <th className="px-4 py-4 text-left">Year</th>
                    <th className="px-4 py-4 text-left">Enrolled In</th>
                </tr>
            </thead>
            <tbody>
                {enrolledStudents.map(({student, subject}, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-4">{student.name} ({student.id})</td>
                        <td className="px-4 py-4">{student.program || 'N/A'}</td>
                        <td className="px-4 py-4">{student.year || 'N/A'}</td>
                        <td className="px-4 py-4">{subject.name}</td>
                    </tr>
                ))}
                {enrolledStudents.length === 0 && (
                    <tr>
                        <td colSpan={4} className="text-center p-8 text-gray-500">
                            No students are enrolled in your subjects yet.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
}
