'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import {
Search,
Loader2,
AlertTriangle,
Eye,
X,
Download
} from 'lucide-react';

import {
getAttendancesAction,
getSubjectsAction,
getUsersAction
} from '@/app/actions/dbActions';

import { Subject } from '@/utils/storage';

export default function AttendanceRecords() {

const { user } = useAuth();

const [records, setRecords] = useState<any[]>([]);
const [subjects, setSubjects] = useState<Subject[]>([]);
const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

const [filter, setFilter] = useState({
search: '',
subject: '',
date: ''
});

const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 10;

useEffect(() => {
if (user) loadData();
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

const teacherSubjects =
allSubjects.filter(s => s.teacherId === user.id);

const teacherSubjectIds =
teacherSubjects.map(s => s.id);

const teacherAttendances =
allAttendances.filter(a =>
teacherSubjectIds.includes(a.subjectId)
);

const populatedRecords =
teacherAttendances.map(rec => {

const student =
allUsers.find(u => u.id === rec.studentId);

const subject =
teacherSubjects.find(s => s.id === rec.subjectId);

return {
...rec,
student: student,
student_name: student?.name || 'Unknown',
student_usn: student?.id || 'Unknown',
subject_name: subject?.name || 'Unknown'
};

});

setRecords(populatedRecords);
setSubjects(teacherSubjects);

} catch (err: any) {

setError(err.message);

} finally {

setLoading(false);

}

};

/* ---------------------------
   FILTERED DATA
--------------------------- */

const filteredRecords = useMemo(() => {

return records.filter(rec => {

const subjectMatch =
filter.subject ? rec.subjectId === filter.subject : true;

const searchMatch =
filter.search ?
rec.student_name.toLowerCase().includes(filter.search.toLowerCase()) ||
rec.student_usn.toLowerCase().includes(filter.search.toLowerCase())
: true;

const dateMatch =
filter.date ?
new Date(rec.date).toISOString().slice(0,10) === filter.date
: true;

return subjectMatch && searchMatch && dateMatch;

});

}, [records, filter]);

/* ---------------------------
   PAGINATION
--------------------------- */

const totalPages =
Math.ceil(filteredRecords.length / rowsPerPage);

const paginatedRecords =
filteredRecords.slice(
(currentPage - 1) * rowsPerPage,
currentPage * rowsPerPage
);

/* ---------------------------
   EXPORT CSV
--------------------------- */

const exportCSV = () => {

const rows = filteredRecords.map(r => ({
Student: r.student_name,
ID: r.student_usn,
Subject: r.subject_name,
Date: new Date(r.date).toLocaleDateString(),
TimeIn: r.timeIn,
TimeOut: r.timeOut,
Status: r.status
}));

const csv =
Object.keys(rows[0]).join(',') +
'\n' +
rows.map(r => Object.values(r).join(',')).join('\n');

const blob =
new Blob([csv], { type: 'text/csv' });

const url =
URL.createObjectURL(blob);

const a = document.createElement('a');

a.href = url;
a.download = 'attendance-records.csv';

a.click();

};

/* ---------------------------
   DURATION
--------------------------- */

const calculateDuration = (start:any,end:any)=>{

if(!start||!end) return '-';

const dummy='1970-01-01T';

const diff =
new Date(dummy+end).getTime() -
new Date(dummy+start).getTime();

const mins=Math.floor(diff/60000);

const hrs=Math.floor(mins/60);

return `${hrs>0?hrs+'h ':''}${mins%60}m`;

};

/* ---------------------------
   STATES
--------------------------- */

if (loading)
return (
<div className="flex justify-center py-20">
<Loader2 className="animate-spin text-primary" size={40}/>
</div>
);

if (error)
return (
<div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-2">
<AlertTriangle size={18}/>
{error}
</div>
);

/* ---------------------------
   UI
--------------------------- */

return (

<div className="space-y-6">

{/* Header */}

<div className="flex justify-between items-center">

<div>
<h2 className="text-2xl font-bold">
Attendance Records
</h2>
<p className="text-gray-500 text-sm">
Student lab attendance sessions
</p>
</div>

<button
onClick={exportCSV}
className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
>
<Download size={16}/>
Export CSV
</button>

</div>

{/* Filters */}

<div className="bg-white border rounded-xl p-4 grid md:grid-cols-3 gap-4">

{/* Search */}

<div>
<label className="text-sm text-gray-600">
Search Student
</label>

<div className="relative mt-1">

<Search
className="absolute left-3 top-2.5 text-gray-400"
size={18}
/>

<input
type="text"
value={filter.search}
onChange={e =>
setFilter({...filter,search:e.target.value})
}
className="w-full pl-9 py-2 border rounded-lg"
/>

</div>
</div>

{/* Subject */}

<div>
<label className="text-sm text-gray-600">
Subject
</label>

<select
value={filter.subject}
onChange={e =>
setFilter({...filter,subject:e.target.value})
}
className="w-full mt-1 py-2 border rounded-lg px-2"
>

<option value="">
All Subjects
</option>

{subjects.map(s=>(
<option key={s.id} value={s.id}>
{s.name}
</option>
))}

</select>
</div>

{/* Date */}

<div>
<label className="text-sm text-gray-600">
Date
</label>

<input
type="date"
value={filter.date}
onChange={e =>
setFilter({...filter,date:e.target.value})
}
className="w-full mt-1 py-2 border rounded-lg px-2"
/>

</div>

</div>

{/* Desktop Table */}

<div className="hidden md:block bg-white rounded-xl border overflow-x-auto">

<table className="w-full text-sm">

<thead className="bg-gray-50">

<tr>
<th className="px-4 py-3 text-left">Student</th>
<th className="px-4 py-3 text-left">Subject</th>
<th className="px-4 py-3 text-left">Date</th>
<th className="px-4 py-3 text-left">Duration</th>
<th className="px-4 py-3 text-left">Status</th>
<th className="px-4 py-3 text-left">Action</th>
</tr>

</thead>

<tbody>

{paginatedRecords.length===0 && (
<tr>
<td colSpan={6} className="text-center py-10 text-gray-500">
No records found
</td>
</tr>
)}

{paginatedRecords.map(rec=>(

<tr
key={rec.id}
className="border-t hover:bg-gray-50"
>

<td className="px-4 py-3">

<div className="font-medium">
{rec.student_name}
</div>

<div className="text-xs text-gray-500">
{rec.student_usn}
</div>

</td>

<td className="px-4 py-3">
{rec.subject_name}
</td>

<td className="px-4 py-3">
{new Date(rec.date).toLocaleDateString()}
</td>

<td className="px-4 py-3">
{calculateDuration(rec.timeIn,rec.timeOut)}
</td>

<td className="px-4 py-3">

<span className={`px-2 py-1 text-xs rounded-full ${
rec.status==='present'
?'bg-green-100 text-green-700'
:'bg-yellow-100 text-yellow-700'
}`}>
{rec.status}
</span>

</td>

<td className="px-4 py-3">

<button
onClick={()=>setSelectedRecord(rec)}
className="flex items-center gap-1 text-primary hover:underline text-sm"
>
<Eye size={16}/>
View
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* Pagination */}

<div className="flex justify-center gap-2">

{Array.from({length:totalPages},(_,i)=>i+1).map(p=>(

<button
key={p}
onClick={()=>setCurrentPage(p)}
className={`px-3 py-1 border rounded ${
currentPage===p
?'bg-primary text-white'
:''
}`}
>
{p}
</button>

))}

</div>

{/* Modal */}

{selectedRecord && selectedRecord.student && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

<div className="bg-white rounded-lg p-6 w-full max-w-sm relative">

<button
onClick={()=>setSelectedRecord(null)}
className="absolute top-2 right-2"
>
<X size={18}/>
</button>

<div className="text-center font-bold uppercase mb-4 text-lg">
Emergency Contact
</div>

<div className="space-y-2 text-sm">

<div>
<b>Name:</b>
{' '}
{selectedRecord.student.emergencyContactName ||
selectedRecord.student.name ||
'N/A'}
</div>

<div>
<b>Address:</b>
{' '}
{selectedRecord.student.emergencyContactAddress ||
'N/A'}
</div>

<div>
<b>Tel:</b>
{' '}
{selectedRecord.student.emergencyContactPhone ||
'N/A'}
</div>

</div>

</div>

</div>

)}

</div>

);

}