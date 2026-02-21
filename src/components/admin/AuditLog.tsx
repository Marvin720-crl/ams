
"use client";
import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { getAuditLogsAction } from '@/app/actions/dbActions';
import { AuditLog } from '@/utils/storage';

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    const auditLogs = await getAuditLogsAction();
    setLogs(auditLogs); // Already presorted
    setLoading(false);
  };

  const filteredLogs = logs.filter(log =>
    log.action.toLowerCase().includes(filter.toLowerCase()) ||
    log.userName.toLowerCase().includes(filter.toLowerCase()) ||
    log.userId.toLowerCase().includes(filter.toLowerCase()) ||
    log.details.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl mb-2">Audit Log</h2>
      <p className="text-gray-600 mb-8">View all recorded system events</p>

      <div className="mb-6">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter logs by user, action, or details..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-left">Timestamp</th>
              <th className="px-4 py-4 text-left">User</th>
              <th className="px-4 py-4 text-left">Action</th>
              <th className="px-4 py-4 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={4} className="text-center p-4">Loading...</td></tr>}
            {!loading && filteredLogs.slice(0, 200).map((log) => (
              <tr key={log.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-4">
                    <div className="font-medium">{log.userName}</div>
                    <div className="text-sm text-muted-foreground">{log.userId}</div>
                </td>
                <td className="px-4 py-4">
                    <span className={`capitalize px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800`}>
                        {log.action}
                    </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{log.details}</td>
              </tr>
            ))}
             {!loading && filteredLogs.length === 0 && (
                <tr><td colSpan={4} className="text-center p-8 text-gray-500">No logs match your filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
