'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUsersAction, getSubjectsAction, getEnrollmentsAction, updateEnrollmentAction } from '@/app/actions/dbActions';
import { Users as UsersIcon, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function PendingEnrollments() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    if (user) loadEnrollments();
  }, [user]);

  const loadEnrollments = async () => {
    if (!user) return;
    const allEnrollments = await getEnrollmentsAction();
    const allSubjects = await getSubjectsAction();
    const allUsers = await getUsersAction();
    
    const teacherSubjects = allSubjects.filter(s => s.teacherId === user.id);
    const teacherSubjectIds = teacherSubjects.map(s => s.id);

    const pending = allEnrollments.filter(
      (e: any) => teacherSubjectIds.includes(e.subjectId) && e.status === 'pending'
    ).map(e => {
        const student = allUsers.find(u => u.id === e.studentId);
        const subject = teacherSubjects.find(s => s.id === e.subjectId);
        return {...e, student_name: student?.name, subject_name: subject?.name}
    });
    setEnrollments(pending);
  };

  const handleAction = async (enrollmentId: string, approve: boolean) => {
    const status = approve ? 'approved' : 'rejected';
    try {
        await updateEnrollmentAction(enrollmentId, { status });
        toast.success(`Enrollment has been ${status}.`);
        loadEnrollments();
    } catch {
        toast.error("Failed to update enrollment.");
    }
  };

  return (
    <div>
      <h2 className="text-3xl mb-2">Pending Enrollments</h2>
      <p className="text-gray-600 mb-8">Review student enrollment requests</p>

      {enrollments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <UsersIcon size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg">No pending enrollments</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl mb-2">{enrollment.subject_name}</h3>
                  <p className="text-gray-600">
                    {enrollment.student_name} ({enrollment.studentId})
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Requested: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(enrollment.id, true)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(enrollment.id, false)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <XCircle size={18} />
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
