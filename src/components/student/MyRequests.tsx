
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { getLabRequestsAction, getSubjectsAction, getLabsAction, getRoomsAction } from '@/app/actions/dbActions';
import { LabRequest, Subject, Lab, Room } from '@/utils/storage';

type PopulatedRequest = LabRequest & {
    subjectName: string;
    locationName: string;
    pcNumber?: string;
};

export default function MyRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<PopulatedRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadRequests();
    }
  }, [user]);

  const loadRequests = async () => {
    if(!user) return;
    setLoading(true);
    const [allRequests, allSubjects, allLabs, allRooms] = await Promise.all([
        getLabRequestsAction(),
        getSubjectsAction(),
        getLabsAction(),
        getRoomsAction(),
    ]);

    const myRequests = allRequests.filter((r) => r.studentId === user.id);
    
    const populated = myRequests.map(req => {
        const subject = allSubjects.find(s => s.id === req.subjectId);
        const location = req.pcId 
            ? allLabs.find(l => l.id === req.labId)
            : allRooms.find(r => r.id === req.labId);
        
        return {
            ...req,
            subjectName: subject?.name || 'Unknown Subject',
            locationName: location?.name || 'Unknown Location',
            pcNumber: req.pcId?.split('-').pop()
        }
    });

    setRequests(populated.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()));
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'declined':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-yellow-500" size={20} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      declined: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  if(loading) return <p>Loading requests...</p>

  return (
    <div>
      <h2 className="text-3xl mb-2">My Requests</h2>
      <p className="text-gray-600 mb-8">View all your lab and room requests</p>

      {requests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <FileText size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg">No requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(request.status)}
                    <h3 className="text-xl">{request.subjectName}</h3>
                  </div>
                  <p className="text-gray-600 mb-1">
                    {request.locationName} {request.pcNumber ? `- PC ${request.pcNumber}`: ''}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(request.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(request.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-4 py-2 rounded-full text-sm capitalize ${getStatusBadge(request.status)}`}>
                    {request.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(request.startTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {request.reason && (
                <div className="border-t pt-3 mt-3">
                  <p className="text-sm text-gray-600">
                    <span>Reason:</span> {request.reason}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
