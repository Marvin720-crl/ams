
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus, AlertCircle } from 'lucide-react';
import { addEnrollmentAction, getSubjectsAction, getUsersAction, getEnrollmentsAction } from '@/app/actions/dbActions';

export default function EnrollSubject() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedTeacher) {
      loadSubjectsForTeacher(selectedTeacher);
    } else {
      setSubjects([]);
    }
  }, [selectedTeacher]);

  const loadInitialData = async () => {
    const allUsers = await getUsersAction();
    const allSubjects = await getSubjectsAction();
    const teacherUsers = allUsers.filter(u => u.role === 'teacher');
    
    const teachersWithSubjects = teacherUsers.filter(t => 
        allSubjects.some(s => s.teacherId === t.id)
    );

    setTeachers(teachersWithSubjects);
  };
  
  const loadSubjectsForTeacher = async (teacherId: string) => {
    const allSubjects = await getSubjectsAction();
    const teacherSubjects = allSubjects.filter(s => s.teacherId === teacherId);
    setSubjects(teacherSubjects);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user || !selectedTeacher || !selectedSubject) {
      setError('Please select both teacher and subject');
      return;
    }
    
    const enrollments = await getEnrollmentsAction();
    const existing = enrollments.find(
      (en: any) => en.studentId === user.id && en.subjectId === selectedSubject
    );

    if (existing) {
      setError(`You already have an enrollment request with status: ${existing.status}`);
      return;
    }

    const newEnrollment = {
      id: `ENR-${Date.now()}`,
      studentId: user.id,
      subjectId: selectedSubject,
      enrolledAt: new Date().toISOString(),
      status: 'pending' as const
    };

    await addEnrollmentAction(newEnrollment);

    alert('Enrollment request submitted! Wait for teacher approval.');
    setSelectedTeacher('');
    setSelectedSubject('');
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl mb-2">Enroll in Subject</h2>
      <p className="text-gray-600 mb-8">Request enrollment in a teacher's subject</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div>
          <label className="block text-sm mb-2 text-gray-700">Teacher</label>
          <select
            value={selectedTeacher}
            onChange={(e) => {
              setSelectedTeacher(e.target.value);
              setSelectedSubject('');
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b40000] focus:border-transparent outline-none"
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-700">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b40000] focus:border-transparent outline-none"
            required
            disabled={!selectedTeacher}
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#b40000] hover:bg-[#8b0000] text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <UserPlus size={20} />
          Submit Enrollment Request
        </button>
      </form>
    </div>
  );
}
