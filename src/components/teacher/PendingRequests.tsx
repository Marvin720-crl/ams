
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, CheckCircle, XCircle } from 'lucide-react';
import { getLabRequestsAction, updateLabRequestAction, addAttendanceAction, getSubjectsAction, getUsersAction } from '@/app/actions/dbActions';
import { LabRequest } from '@/utils/storage';
import { toast } from 'sonner';

export default function PendingRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadRequests();
  }, [user]);

  const loadRequests = async () => {
    if (!user) return;
    setLoading(true);
    const allRequests = await getLabRequestsAction();
    const allSubjects = await getSubjectsAction();
    const allUsers = await getUsersAction();
    
    const teacherSubjects = allSubjects.filter(s => s.teacherId === user.id);
    const teacherSubjectIds = teacherSubjects.map(s => s.id);
    
    const pending = allRequests.filter(
      (r: any) => teacherSubjectIds.includes(r.subjectId) && r.status === 'pending'
    ).map(r => {
        const student = allUsers.find(u => u.id === r.studentId);
        const subject = teacherSubjects.find(s => s.id === r.subjectId);
        return {...r, student_name: student?.name, subject_name: subject?.name }
    });

    setRequests(pending);
    setLoading(false);
  };

  const handleApprove = async (request: LabRequest) => {
    try {
      await updateLabRequestAction(request.id, { status: 'approved' });
      
      const attendanceEntry = {
        studentId: request.studentId,
        subjectId: request.subjectId,
        date: new Date(request.startTime).toISOString(),
        status: 'present' as const,
        timeIn: new Date(request.startTime).toLocaleTimeString('en-US', { hour12: false }),
        sessionId: `SESS-REQ-${request.id}`,
        locationId: request.labId,
        locationType: 'lab' as const,
        pcId: request.pcId,
      };
      await addAttendanceAction(attendanceEntry);
      
      toast.success('Request approved and session created!');
      loadRequests();
    } catch {
      toast.error('Failed to approve request.');
    }
  };

  const handleDecline = async (requestId: string) => {
    if (!window.confirm('Decline this request?')) return;
    try {
        await updateLabRequestAction(requestId, { status: 'declined' });
        toast.info('Request declined');
        loadRequests();
    } catch {
        toast.error('Failed to decline request.');
    }
  };

  if(loading) return <p>Loading requests...</p>

  return (
    <div>
      <h2 className="text-3xl mb-2">Pending Requests</h2>
      <p className="text-gray-600 mb-8">Review and approve lab/room requests from students</p>

      {requests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <FileText size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg">No pending requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl mb-2">{request.subject_name}</h3>
                  <p className="text-gray-600 mb-1">
                    Student: {request.student_name} ({request.studentId})
                  </p>
                  <p className="text-gray-600 mb-1">
                    Lab: {request.labId} - PC: {request.pcId?.split('-').pop()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: {new Date(request.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})} - {new Date(request.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}
                  </p>
                  {request.reason && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="">Reason:</span> {request.reason}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleApprove(request)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(request.id)}
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
