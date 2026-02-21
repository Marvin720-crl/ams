
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Monitor, User, Clock } from 'lucide-react';
import { Attendance, Subject } from '@/utils/storage';
import { getAttendancesAction, getSubjectsAction } from '@/app/actions/dbActions';

type PopulatedSession = Attendance & {
  subjectName: string;
};

export default function MySessions() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<PopulatedSession[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      loadSessions();
    }
  }, [user]);

  const loadSessions = async () => {
    if(!user) return;
    setLoading(true);
    const allAttendances = await getAttendancesAction();
    const allSubjects = await getSubjectsAction();

    const mySessions = allAttendances.filter((s:any) => s.studentId === user.id);

    const populatedSessions = mySessions.map(session => {
        const subject = allSubjects.find(s => s.id === session.subjectId);
        return {
            ...session,
            subjectName: subject?.name || "Unknown Subject"
        }
    })

    setSessions(populatedSessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setLoading(false);
  };

  if (loading) return <p>Loading sessions...</p>

  return (
    <div>
      <h2 className="text-3xl mb-2">My Sessions</h2>
      <p className="text-gray-600 mb-8">View your lab usage history</p>

      {sessions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Calendar size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg">No sessions yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl mb-2 flex items-center gap-2">
                    <Monitor size={20} className="text-[#b40000]" />
                    {session.subjectName}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock size={14} />
                    {new Date(session.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })} - {session.timeOut ? new Date(session.timeOut).toLocaleString([], { timeStyle: 'short' }) : 'Active'}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-4 py-2 rounded-full text-sm ${session.timeOut ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                    {session.timeOut ? 'Ended' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
