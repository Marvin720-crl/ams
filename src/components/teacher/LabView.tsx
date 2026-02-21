
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Monitor, User, Clock, Calendar } from 'lucide-react';
import { getLabsAction, getPcsAction, getAttendancesAction, cleanupExpiredSessionsAction } from '@/app/actions/dbActions';
import { Lab, Pc, Attendance } from '@/utils/storage';

export default function LabView() {
  const { user } = useAuth();
  const [labs, setLabs] = useState<Lab[]>([]);
  const [selectedLab, setSelectedLab] = useState<any>(null);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);

  useEffect(() => {
    const initializeView = async () => {
      await cleanupExpiredSessionsAction();
      loadLabs();
      loadActiveSessions();
    };
    initializeView();
  }, []);

  const loadLabs = async () => {
    const labsData = await getLabsAction();
    setLabs(labsData);
  };

  const loadActiveSessions = async () => {
    const allAttendances = await getAttendancesAction();
    const active = allAttendances.filter(a => !a.timeOut);
    setActiveSessions(active);
  };

  const viewLabDetails = async (lab: Lab) => {
    const allPcs = await getPcsAction();
    const labPcs = allPcs.filter(p => p.labId === lab.id);

    const updatedPcs = labPcs.map(pc => {
      const session = activeSessions.find(s => s.pcId === pc.id);
      if (session) {
        return {
          ...pc,
          status: 'in-use',
          currentUser: session.studentName,
          currentSubject: session.subjectName,
          startTime: session.timeIn
        };
      }
      return { ...pc, status: 'available' };
    });

    setSelectedLab({ ...lab, pcs: updatedPcs });
  };


  if (selectedLab) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl mb-2">{selectedLab.name}</h2>
            <p className="text-gray-600">PC Status and Usage</p>
          </div>
          <button
            onClick={() => setSelectedLab(null)}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            ← Back to Labs
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {selectedLab.pcs.map((pc: any) => (
            <div
              key={pc.id}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                pc.status === 'in-use'
                  ? 'bg-blue-100 border-2 border-blue-500 hover:shadow-lg'
                  : 'bg-green-50 border-2 border-green-300 hover:bg-green-100'
              }`}
            >
              <div className="flex flex-col items-center">
                <Monitor
                  size={32}
                  className={pc.status === 'in-use' ? 'text-blue-600' : 'text-green-600'}
                />
                <p className="mt-2">PC {pc.pcNumber}</p>
                {pc.currentUser ? (
                  <>
                    <p className="text-xs mt-2 text-center text-blue-900">{pc.currentUser}</p>
                    <p className="text-xs text-blue-700">{pc.currentSubject}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {pc.startTime}
                    </p>
                  </>
                ) : (
                  <p className="text-xs mt-2 text-green-700">Available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl mb-2">Lab View</h2>
      <p className="text-gray-600 mb-8">Monitor your students' lab usage in real-time</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {labs.map((lab) => {
          const inUseCount = activeSessions.filter(s => s.labId === lab.id).length;

          return (
            <div
              key={lab.id}
              onClick={() => viewLabDetails(lab)}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl flex items-center gap-2">
                  <Monitor className="text-[#b40000]" />
                  {lab.name}
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Capacity:</span>
                  <span>{lab.capacity} PCs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">In Use:</span>
                  <span className="text-blue-600">{inUseCount} PCs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available:</span>
                  <span className="text-green-600">{lab.capacity - inUseCount} PCs</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(inUseCount / lab.capacity) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {Math.round((inUseCount / lab.capacity) * 100)}% occupied
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
