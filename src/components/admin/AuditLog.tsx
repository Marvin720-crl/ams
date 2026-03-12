"use client";

import React, { useState, useEffect } from "react";
import { FileText, Loader2, Download } from "lucide-react";
import { getAuditLogsAction } from "@/app/actions/dbActions";
import { AuditLog } from "@/utils/storage";

const PAGE_SIZE = 20;

export default function AuditLogPage() {

  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);

    try {
      const auditLogs = await getAuditLogsAction();
      setLogs(auditLogs);
    } catch {
      console.error("Failed to load logs");
    }

    setLoading(false);
  };

  /* ------------------------------
     FILTER BY DATE FIRST
  ------------------------------ */

  const logsByDate = selectedDate
    ? logs.filter(
        (log) =>
          new Date(log.timestamp).toISOString().split("T")[0] === selectedDate
      )
    : [];

  const filteredLogs = logsByDate.filter((log) =>
    log.action.toLowerCase().includes(filter.toLowerCase()) ||
    log.userName.toLowerCase().includes(filter.toLowerCase()) ||
    log.userId.toLowerCase().includes(filter.toLowerCase()) ||
    log.details.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLogs.length / PAGE_SIZE);

  const paginatedLogs = filteredLogs.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ------------------------------
     ACTION BADGE COLORS
  ------------------------------ */

  const getActionColor = (action: string) => {

    const a = action.toLowerCase();

    if (a.includes("delete")) return "bg-red-100 text-red-700";
    if (a.includes("update")) return "bg-yellow-100 text-yellow-700";
    if (a.includes("create") || a.includes("add"))
      return "bg-green-100 text-green-700";

    return "bg-blue-100 text-blue-700";
  };

  /* ------------------------------
     EXPORT CSV
  ------------------------------ */

  const exportCSV = () => {

    if (!filteredLogs.length) return;

    const rows = filteredLogs.map((log) => ({
      Timestamp: new Date(log.timestamp).toLocaleString(),
      User: log.userName,
      UserID: log.userId,
      Action: log.action,
      Details: log.details,
    }));

    const csv =
      Object.keys(rows[0]).join(",") +
      "\n" +
      rows
        .map((r) => Object.values(r).join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `audit-logs-${selectedDate}.csv`;

    a.click();
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h2 className="text-3xl font-bold">Audit Logs</h2>
        <p className="text-gray-500">
          View system activities by selecting a date
        </p>
      </div>

      {/* DATE PICKER */}

      <div className="bg-white p-5 rounded-xl shadow border flex flex-col sm:flex-row gap-4 items-center justify-between">

        <div className="flex items-center gap-3">

          <FileText className="text-primary" size={22} />

          <div>
            <p className="text-sm text-gray-500">Select Date</p>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setPage(1);
              }}
              className="border rounded-lg px-3 py-2"
            />

          </div>

        </div>

        {filteredLogs.length > 0 && (

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Download size={16} />
            Export CSV
          </button>

        )}

      </div>

      {/* SEARCH */}

      {selectedDate && (

        <input
          type="text"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          placeholder="Search logs..."
          className="w-full border rounded-lg px-4 py-3"
        />

      )}

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <div className="overflow-x-auto">

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

              {loading && (
                <tr>
                  <td colSpan={4} className="text-center p-10">
                    <Loader2 className="animate-spin mx-auto" />
                  </td>
                </tr>
              )}

              {!selectedDate && !loading && (
                <tr>
                  <td colSpan={4} className="text-center p-10 text-gray-500">
                    Please select a date to view logs
                  </td>
                </tr>
              )}

              {!loading &&
                paginatedLogs.map((log) => (

                  <tr key={log.id} className="border-t hover:bg-gray-50">

                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>

                    <td className="px-4 py-4">
                      <div className="font-medium">{log.userName}</div>
                      <div className="text-sm text-gray-500">{log.userId}</div>
                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getActionColor(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>

                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {log.details}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="flex justify-between items-center">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>

        </div>

      )}

    </div>
  );
}