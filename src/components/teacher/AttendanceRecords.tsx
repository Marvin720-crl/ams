'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Search, Loader, AlertTriangle } from 'lucide-react';
import { getAttendancesAction, getSubjectsAction, getUsersAction } from '@/app/actions/dbActions';
import { User, Subject, Attendance } from '@/utils/storage';

export default function AttendanceRecords() {
  const [records, setRecords] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filter, setFilter] = useState({ search: '', subject: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if(user) loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const [allAttendances, allSubjects, allUsers] = await Promise.all([
        getAttendancesAction(),
        getSubjectsAction(),
        getUsersAction()
      ]);

      const teacherSubjects = allSubjects.filter(s => s.teacherId === user.id);
      const teacherSubjectIds = teacherSubjects.map(s => s.id);
      
      const teacherAttendances = allAttendances.filter(a => teacherSubjectIds.includes(a.subjectId));

      const populatedRecords = teacherAttendances.map(rec => {
        const student = allUsers.find(u => u.id === rec.studentId);
        const subject = teacherSubjects.find(s => s.id === rec.subjectId);
        return {
          ...rec,
          student_name: student?.name || 'Unknown',
          student_usn: student?.id || 'Unknown',
          subject_name: subject?.name || 'Unknown',
        }
      });

      setRecords(populatedRecords);
      setSubjects(teacherSubjects);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(rec => {
    const subjectMatch = filter.subject ? rec.subjectId === filter.subject : true;
    const searchMatch = filter.search ? 
      rec.student_name?.toLowerCase().includes(filter.search.toLowerCase()) ||
      rec.student_usn?.toLowerCase().includes(filter.search.toLowerCase()) : true;
    return subjectMatch && searchMatch;
  });

  const calculateDuration = (start: string | null, end: string | null) => {
    if (!start || !end) return '-';
    // Assuming time is in HH:MM:SS format
    const dummyDate = '1970-01-01T';
    const startTime = new Date(dummyDate + start).getTime();
    const endTime = new Date(dummyDate + end).getTime();
    if (isNaN(startTime) || isNaN(endTime)) return '-';
    
    const duration = endTime - startTime;
    const minutes = Math.floor(duration / 60000);
    const hours = Math.floor(minutes / 60);
    return `${hours > 0 ? hours + 'h' : ''} ${minutes % 60}m`;
  };

  if (loading) {
    return <div className="flex justify-center items-center p-12"><Loader className="animate-spin text-[#b40000]" size={48} /></div>;
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2"><AlertTriangle size={20} /><span>{error}</span></div>;
  }

  return (
    <div>
      <h2 className="text-3xl mb-2">Attendance Records</h2>
      <p className="text-gray-600 mb-8">View all student session records.</p>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Search by Student</label>
            <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                 <input 
                    type="text" 
                    placeholder="Name or USN..."
                    onChange={e => setFilter({...filter, search: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-700">Filter by Subject</label>
            <select 
              value={filter.subject}
              onChange={e => setFilter({...filter, subject: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            >
              <option value="">All My Subjects</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-left">Student</th>
              <th className="px-4 py-4 text-left">Subject</th>
              <th className="px-4 py-4 text-left">Date</th>
              <th className="px-4 py-4 text-left">Time In</th>
              <th className="px-4 py-4 text-left">Time Out</th>
              <th className="px-4 py-4 text-left">Duration</th>
              <th className="px-4 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(rec => (
              <tr key={rec.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-4">
                    {rec.student_name}
                    <br/>
                    <span className="text-sm text-gray-500">({rec.student_usn})</span>
                </td>
                <td className="px-4 py-4">{rec.subject_name}</td>
                <td className="px-4 py-4">{new Date(rec.date).toLocaleDateString()}</td>
                <td className="px-4 py-4 text-sm">{rec.timeIn || '-'}</td>
                <td className="px-4 py-4 text-sm">{rec.timeOut || '-'}</td>
                <td className="px-4 py-4">{calculateDuration(rec.timeIn, rec.timeOut)}</td>
                <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                        rec.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                        {rec.status}
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
