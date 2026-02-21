
"use client";
import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, Filter } from 'lucide-react';
import { getLabRequestsAction, updateLabRequestAction, getUsersAction, getSubjectsAction, getLabsAction } from '@/app/actions/dbActions';
import { LabRequest, User, Subject, Lab } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AllRequests() {
  const [requests, setRequests] = useState<LabRequest[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    try {
        const [reqs, usrs, subs, lbs] = await Promise.all([
            getLabRequestsAction(),
            getUsersAction(),
            getSubjectsAction(),
            getLabsAction(),
        ]);
        setRequests(reqs.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()));
        setUsers(usrs);
        setSubjects(subs);
        setLabs(lbs);
    } catch (e) {
        toast.error("Failed to load requests.");
    } finally {
        setLoading(false);
    }
  };

  const handleUpdateRequest = async (id: string, status: 'approved' | 'declined') => {
      try {
          await updateLabRequestAction(id, { status });
          toast.success(`Request has been ${status}.`);
          loadRequests(); // Refresh data
      } catch {
          toast.error("Failed to update request.");
      }
  };

  const filteredRequests = filter === 'All'
    ? requests
    : requests.filter(r => r.status === filter.toLowerCase());

  const getStatusBadge = (status: string) => {
    const colors: any = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      declined: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };
  
  const getName = (id: string, type: 'user' | 'subject' | 'lab') => {
      switch(type) {
          case 'user': return users.find(u => u.id === id)?.name || id;
          case 'subject': return subjects.find(s => s.id === id)?.name || id;
          case 'lab': return labs.find(l => l.id === id)?.name || id;
          default: return id;
      }
  }

  return (
    <div>
      <h2 className="text-3xl mb-2">All Requests</h2>
      <p className="text-gray-600 mb-8">View all lab and room requests</p>

      <div className="mb-6 flex gap-4">
        <div className="flex items-center gap-2">
          <Filter size={20} />
          <span>Status:</span>
        </div>
        {['All', 'Pending', 'Approved', 'Declined'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === status
                ? 'bg-[#b40000] text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-left">Student</th>
              <th className="px-4 py-4 text-left">Lab</th>
              <th className="px-4 py-4 text-left">PC#</th>
              <th className="px-4 py-4 text-left">Time</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="text-center p-4">Loading...</td></tr>}
            {!loading && filteredRequests.map((request) => (
              <tr
                key={request.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-4">
                    <div className="font-medium">{getName(request.studentId, 'user')}</div>
                    <div className="text-sm text-muted-foreground">{getName(request.subjectId, 'subject')}</div>
                </td>
                <td className="px-4 py-4">{getName(request.labId, 'lab')}</td>
                <td className="px-4 py-4">{request.pcId?.split('-').pop()}</td>
                <td className="px-4 py-4 text-sm">
                  {new Date(request.startTime).toLocaleTimeString()} - {new Date(request.endTime).toLocaleTimeString()}
                </td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusBadge(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {request.status === 'pending' && (
                       <div className="flex gap-2 justify-start">
                           <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:bg-green-50" onClick={() => handleUpdateRequest(request.id, 'approved')}><CheckCircle className="h-4 w-4"/></Button>
                           <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:bg-red-50" onClick={() => handleUpdateRequest(request.id, 'declined')}><XCircle className="h-4 w-4"/></Button>
                       </div>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
