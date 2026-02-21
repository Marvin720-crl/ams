
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Send, AlertCircle } from 'lucide-react';
import { getEnrollmentsAction, getUsersAction, getSubjectsAction, getLabsAction, getRoomsAction, getPcsAction, addLabRequestAction } from '@/app/actions/dbActions';
import { Subject, User } from '@/utils/storage';
import { toast } from 'sonner';

export default function MakeRequest() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [labs, setLabs] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [availablePCs, setAvailablePCs] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    teacher: '',
    subject: '',
    type: 'lab' as 'lab' | 'room',
    labOrRoom: '',
    pc: '',
    startTime: '',
    endTime: '',
    reason: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if(user) {
      loadInitialData();
    }
  }, [user]);

  useEffect(() => {
    if (formData.teacher) {
      loadSubjectsForTeacher(formData.teacher);
    } else {
      setSubjects([]);
    }
  }, [formData.teacher]);

  useEffect(() => {
    if (formData.type === 'lab' && formData.labOrRoom) {
      loadAvailablePCs(formData.labOrRoom);
    }
  }, [formData.labOrRoom, formData.type]);

  const loadInitialData = async () => {
    if (!user) return;
    const allUsers = await getUsersAction();
    const allSubjects = await getSubjectsAction();
    
    const teacherUsers = allUsers.filter(u => u.role === 'teacher');
    
    // Manually create an admin user object to be included as an instructor
    const adminUser = {
        id: 'admin',
        name: 'System Admin',
        email: 'admin@school.edu',
        role: 'admin' as const,
        password: ''
    };
    
    const allPotentialInstructors = [...teacherUsers, adminUser];

    const instructorsWithSubjects = allPotentialInstructors.filter(instructor => 
        allSubjects.some(s => s.teacherId === instructor.id)
    );

    setTeachers(instructorsWithSubjects);
    setLabs(await getLabsAction());
    setRooms(await getRoomsAction());
  };

  const loadSubjectsForTeacher = async (teacherId: string) => {
    const allSubjects = await getSubjectsAction();
    
    if(!user) return;
    
    let subjectsForSelectedTeacher = allSubjects.filter(s => s.teacherId === teacherId);

    // If not admin, filter subjects by enrollment
    if (teacherId !== 'admin') {
      const myEnrollments = await getEnrollmentsAction();
      const myApprovedEnrollments = myEnrollments.filter(e => e.studentId === user.id && e.status === 'approved');
      const mySubjectIds = myApprovedEnrollments.map(e => e.subjectId);
      subjectsForSelectedTeacher = subjectsForSelectedTeacher.filter(s => mySubjectIds.includes(s.id));
    }
    
    setSubjects(subjectsForSelectedTeacher);
  };

  const loadAvailablePCs = async (labId: string) => {
    const allPcs = await getPcsAction();
    const available = allPcs.filter(pc => pc.labId === labId && pc.status === 'available');
    setAvailablePCs(available);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) return;

    // Check for Personal Use reason
    const selectedSubject = subjects.find(s => s.id === formData.subject);
    if (selectedSubject?.name === 'Personal Use' && !formData.reason.trim()) {
        setError('A reason is required for Personal Use requests.');
        return;
    }
    
    if (!formData.teacher || !formData.subject || !formData.labOrRoom || !formData.startTime || !formData.endTime) {
      setError('Please fill out all required fields.');
      return;
    }

    if (formData.type === 'lab' && !formData.pc) {
      setError('Please select an available PC for the lab.');
      return;
    }
    
    const today = new Date();
    const startDate = new Date(today);
    const [startHours, startMinutes] = formData.startTime.split(':').map(Number);
    startDate.setHours(startHours, startMinutes, 0, 0);

    const endDate = new Date(today);
    const [endHours, endMinutes] = formData.endTime.split(':').map(Number);
    endDate.setHours(endHours, endMinutes, 0, 0);

    const newRequest = {
      studentId: user.id,
      teacherId: formData.teacher,
      subjectId: formData.subject,
      labId: formData.labOrRoom,
      pcId: formData.type === 'lab' ? formData.pc : undefined,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
      reason: formData.reason,
      status: 'pending' as const
    };
    
    try {
        await addLabRequestAction(newRequest);
        toast.success("Request submitted successfully!", { description: "Your teacher or admin has been notified."});
        // Reset form
        setFormData({
            teacher: '',
            subject: '',
            type: 'lab',
            labOrRoom: '',
            pc: '',
            startTime: '',
            endTime: '',
            reason: ''
        });
    } catch {
        toast.error("Failed to submit request.");
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl mb-2">Make Lab Request</h2>
      <p className="text-gray-600 mb-8">Request access to lab or room for a class, exam, or personal use.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Instructor / Office</label>
            <select
              value={formData.teacher}
              onChange={(e) => setFormData({ ...formData, teacher: e.target.value, subject: '' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b40000] focus:border-transparent outline-none"
              required
            >
              <option value="">Select Instructor</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Subject / Purpose</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b40000] focus:border-transparent outline-none"
              required
              disabled={!formData.teacher}
            >
              <option value="">Select Subject/Purpose</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-700">Request Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="lab"
                checked={formData.type === 'lab'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'lab' | 'room', labOrRoom: '', pc: ''})}
                className="w-4 h-4 text-[#b40000]"
              />
              <span>Lab (with PC)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="room"
                checked={formData.type === 'room'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'lab' | 'room', labOrRoom: '', pc: ''})}
                className="w-4 h-4 text-[#b40000]"
              />
              <span>Room</span>
            </label>
          </div>
        </div>

        {formData.type === 'lab' ? (
          <>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Lab</label>
              <select
                value={formData.labOrRoom}
                onChange={(e) => setFormData({ ...formData, labOrRoom: e.target.value, pc: '' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b40000] focus:border-transparent outline-none"
                required
              >
                <option value="">Select Lab</option>
                {labs.map((lab) => (
                  <option key={lab.id} value={lab.id}>
                    {lab.name} (Capacity: {lab.capacity})
                  </option>
                ))}
              </select>
            </div>

            {formData.labOrRoom && (
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Available PCs ({availablePCs.length} available)
                </label>
                <select
                  value={formData.pc}
                  onChange={(e) => setFormData({ ...formData, pc: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b40000] focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select PC</option>
                  {availablePCs.map((pc) => (
                    <option key={pc.id} value={pc.id}>
                      PC {pc.pcNumber}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        ) : (
          <div>
            <label className="block text-sm mb-2 text-gray-700">Room</label>
            <select
              value={formData.labOrRoom}
              onChange={(e) => setFormData({ ...formData, labOrRoom: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b40000] focus:border-transparent outline-none"
              required
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} (Capacity: {room.capacity})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Start Time</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b40000] focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">End Time</label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b40000] focus:border-transparent outline-none"
              required
            />
          </div>
        </div>

        <div>
            <label className="block text-sm mb-2 text-gray-700">Reason</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b40000] focus:border-transparent outline-none"
              rows={3}
              placeholder={subjects.find(s => s.id === formData.subject)?.name === 'Personal Use' ? 'Please provide a reason for your request...' : 'Optional'}
              required={subjects.find(s => s.id === formData.subject)?.name === 'Personal Use'}
            />
          </div>

        <button
          type="submit"
          className="w-full bg-[#b40000] hover:bg-[#8b0000] text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Send size={20} />
          Submit Request
        </button>
      </form>
    </div>
  );
}
