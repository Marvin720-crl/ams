
"use client";
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { getAttendancesAction, getUsersAction, getSubjectsAction } from '@/app/actions/dbActions';
import { Attendance } from '@/utils/storage';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AttendanceReports() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const [attendances, users, subjects] = await Promise.all([
                getAttendancesAction(),
                getUsersAction(),
                getSubjectsAction()
            ]);

            const populatedRecords = attendances.map(att => {
                const student = users.find(u => u.id === att.studentId);
                const subject = subjects.find(s => s.id === att.subjectId);
                return {
                    ...att,
                    studentName: student?.name || 'Unknown',
                    subjectName: subject?.name || 'Unknown',
                    teacherName: subject?.teacherName || 'Unknown',
                };
            }).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setRecords(populatedRecords);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
  }, []);

  const isValidDate = (date: any) => {
    return date && !isNaN(new Date(date).getTime());
  }

  return (
    <div>
      <h2 className="text-3xl mb-2">Attendance Reports</h2>
      <p className="text-gray-600 mb-8">View all student lab sessions</p>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-left">Student</th>
              <th className="px-4 py-4 text-left">Subject</th>
              <th className="px-4 py-4 text-left">Teacher</th>
              <th className="px-4 py-4 text-left">Time In</th>
              <th className="px-4 py-4 text-left">Time Out</th>
              <th className="px-4 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="text-center p-4">Loading...</td></tr>}
            {!loading && records.map((rec) => (
              <tr key={rec.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-4">{rec.studentName}</td>
                <td className="px-4 py-4">{rec.subjectName}</td>
                <td className="px-4 py-4">{rec.teacherName}</td>
                <td className="px-4 py-4 text-sm">
                  {new Date(rec.date).toLocaleString()}
                </td>
                <td className="px-4 py-4 text-sm">
                  {isValidDate(rec.timeOut) ? new Date(rec.timeOut).toLocaleString() : '-'}
                </td>
                <td className="px-4 py-4">
                  <Badge variant={rec.status === 'present' ? 'secondary' : 'destructive'} 
                      className={rec.status === 'present' ? 'text-green-800 bg-green-100' : ''}>
                      {rec.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
