"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Download,
  Loader2,
} from "lucide-react";

import {
  getLabRequestsAction,
  updateLabRequestAction,
  getUsersAction,
  getSubjectsAction,
  getLabsAction,
  addAttendanceAction,
} from "@/app/actions/dbActions";

import { LabRequest, User, Subject, Lab } from "@/utils/storage";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function AllRequests() {
  const [requests, setRequests] = useState<LabRequest[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [labs, setLabs] = useState<Lab[]>([]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

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

      setRequests(
        reqs.sort(
          (a, b) =>
            new Date(b.startTime).getTime() -
            new Date(a.startTime).getTime()
        )
      );

      setUsers(usrs);
      setSubjects(subs);
      setLabs(lbs);
    } catch {
      toast.error("Failed to load requests.");
    }

    setLoading(false);
  };

  /* ----------------------------------
     HELPERS
  ---------------------------------- */

  const getName = (id: string, type: "user" | "subject" | "lab") => {
    switch (type) {
      case "user":
        return users.find((u) => u.id === id)?.name || id;

      case "subject":
        return subjects.find((s) => s.id === id)?.name || id;

      case "lab":
        return labs.find((l) => l.id === id)?.name || id;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: any = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      declined: "bg-red-100 text-red-800",
    };

    return colors[status] || colors.pending;
  };

  /* ----------------------------------
     APPROVE / DECLINE
  ---------------------------------- */

  const handleUpdateRequest = async (
    request: LabRequest,
    status: "approved" | "declined"
  ) => {
    try {
      await updateLabRequestAction(request.id, { status });

      if (status === "approved") {
        const attendanceEntry = {
          studentId: request.studentId,
          subjectId: request.subjectId,
          date: new Date(request.startTime).toISOString(),
          status: "present" as const,
          timeIn: new Date(request.startTime).toLocaleTimeString(
            "en-US",
            { hour12: false }
          ),
          sessionId: `SESS-REQ-${request.id}`,
          locationId: request.labId,
          locationType: "lab" as const,
          pcId: request.pcId,
        };

        await addAttendanceAction(attendanceEntry);

        toast.success("Request approved and session created!");
      } else {
        toast.info("Request declined.");
      }

      loadRequests();
    } catch {
      toast.error("Failed to update request.");
    }
  };

  /* ----------------------------------
     FILTERING
  ---------------------------------- */

  const filtered = requests.filter((r) => {
    const student = getName(r.studentId, "user").toLowerCase();
    const subject = getName(r.subjectId, "subject").toLowerCase();
    const lab = getName(r.labId, "lab").toLowerCase();

    const searchMatch =
      student.includes(search.toLowerCase()) ||
      subject.includes(search.toLowerCase()) ||
      lab.includes(search.toLowerCase());

    const statusMatch =
      filter === "All" || r.status === filter.toLowerCase();

    const dateMatch =
      !dateFilter ||
      new Date(r.startTime).toISOString().split("T")[0] === dateFilter;

    return searchMatch && statusMatch && dateMatch;
  });

  /* ----------------------------------
     PAGINATION
  ---------------------------------- */

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ----------------------------------
     EXPORT CSV
  ---------------------------------- */

  const exportCSV = () => {
    if (!filtered.length) return;

    const rows = filtered.map((r) => ({
      Student: getName(r.studentId, "user"),
      Subject: getName(r.subjectId, "subject"),
      Lab: getName(r.labId, "lab"),
      PC: r.pcId?.split("-").pop(),
      Start: new Date(r.startTime).toLocaleString(),
      End: new Date(r.endTime).toLocaleString(),
      Status: r.status,
    }));

    const csv =
      Object.keys(rows[0]).join(",") +
      "\n" +
      rows.map((r) => Object.values(r).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "lab-requests.csv";
    a.click();
  };

  /* ----------------------------------
     STATS
  ---------------------------------- */

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const declinedCount = requests.filter((r) => r.status === "declined").length;

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h2 className="text-3xl font-bold">All Requests</h2>
        <p className="text-gray-500">
          Manage lab and room usage requests
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-yellow-50 p-4 rounded-lg">
          Pending Requests
          <div className="text-2xl font-bold">{pendingCount}</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          Approved
          <div className="text-2xl font-bold">{approvedCount}</div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          Declined
          <div className="text-2xl font-bold">{declinedCount}</div>
        </div>

      </div>

      {/* FILTERS */}

      <div className="flex flex-col md:flex-row gap-4">

        <input
          placeholder="Search student, subject, lab..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <Button onClick={exportCSV} variant="outline">
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>

      </div>

      {/* STATUS FILTER */}

      <div className="flex gap-3 flex-wrap">
        {["All", "Pending", "Approved", "Declined"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg ${
              filter === status
                ? "bg-primary text-white"
                : "bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-left">Student</th>
              <th className="px-4 py-4 text-left">Lab</th>
              <th className="px-4 py-4 text-left">PC</th>
              <th className="px-4 py-4 text-left">Time</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading && (
              <tr>
                <td colSpan={6} className="text-center p-8">
                  <Loader2 className="animate-spin mx-auto" />
                </td>
              </tr>
            )}

            {!loading &&
              paginated.map((request) => (

                <tr
                  key={request.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-4 py-4">
                    <div className="font-medium">
                      {getName(request.studentId, "user")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getName(request.subjectId, "subject")}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    {getName(request.labId, "lab")}
                  </td>

                  <td className="px-4 py-4">
                    {request.pcId?.split("-").pop()}
                  </td>

                  <td className="px-4 py-4 text-sm">
                    {new Date(request.startTime).toLocaleTimeString()} -
                    {new Date(request.endTime).toLocaleTimeString()}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">

                    {request.status === "pending" && (

                      <div className="flex gap-2">

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            handleUpdateRequest(request, "approved")
                          }
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            handleUpdateRequest(request, "declined")
                          }
                        >
                          <XCircle className="h-4 w-4 text-red-600" />
                        </Button>

                      </div>

                    )}

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="flex justify-between items-center">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-lg"
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-lg"
          >
            Next
          </button>

        </div>

      )}

    </div>
  );
}