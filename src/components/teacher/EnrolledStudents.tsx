'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import {
getUsersAction,
getEnrollmentsAction,
getSubjectsAction
} from '@/app/actions/dbActions';

import { User, Subject } from '@/utils/storage';

import {
Users,
Loader2,
Search,
Eye,
X
} from 'lucide-react';

export default function EnrolledStudents() {

const { user } = useAuth();

const [enrolledStudents,
setEnrolledStudents] =
useState<Array<{student: User, subject: Subject}>>([]);

const [loading, setLoading] = useState(true);
const [search, setSearch] = useState('');

const [selectedStudent, setSelectedStudent] =
useState<any | null>(null);

/* Pagination */

const [currentPage, setCurrentPage] = useState(1);
const [rowsPerPage, setRowsPerPage] = useState(10);

useEffect(() => {

if (user) loadEnrolledStudents();

}, [user]);

const loadEnrolledStudents = async () => {

if (!user) return;

setLoading(true);

const allUsers = await getUsersAction();
const allSubjects = await getSubjectsAction();
const allEnrollments = await getEnrollmentsAction();

const teacherSubjects =
allSubjects.filter(s => s.teacherId === user.id);

const teacherSubjectIds =
teacherSubjects.map(s => s.id);

const approvedEnrollments =
allEnrollments.filter(e =>
teacherSubjectIds.includes(e.subjectId)
&& e.status === 'approved'
);

const studentsWithSubjects =
approvedEnrollments.map(enrollment => {

const student =
allUsers.find(u => u.id === enrollment.studentId);

const subject =
teacherSubjects.find(s => s.id === enrollment.subjectId);

return {
student: student!,
subject: subject!
};

}).filter(item => item.student && item.subject);

setEnrolledStudents(studentsWithSubjects);

setLoading(false);

};

/* Search */

const filteredStudents =
enrolledStudents.filter(({student}) =>

student.name
.toLowerCase()
.includes(search.toLowerCase())

|| student.id
.toLowerCase()
.includes(search.toLowerCase())

);

/* Pagination */

const totalPages =
Math.ceil(filteredStudents.length / rowsPerPage);

const start =
(currentPage - 1) * rowsPerPage;

const paginatedStudents =
filteredStudents.slice(start, start + rowsPerPage);

const goToPage = (page:number) => {

if (page < 1 || page > totalPages) return;

setCurrentPage(page);

};

/* Loading */

if (loading) {

return (

<div className="flex justify-center py-20">

<Loader2
className="animate-spin text-primary"
size={40}
/>

</div>

);

}

return (

<div className="space-y-6">

{/* Header */}

<div>

<h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">

<Users size={28} />

Enrolled Students

</h2>

<p className="text-gray-500 text-sm">

View students enrolled in your subjects

</p>

</div>


{/* Search */}

<div className="bg-white border rounded-xl p-4">

<div className="relative">

<Search
size={18}
className="absolute left-3 top-2.5 text-gray-400"
/>

<input
type="text"
placeholder="Search student name or ID..."
value={search}
onChange={(e) => {
setSearch(e.target.value);
setCurrentPage(1);
}}
className="
w-full
pl-9
py-2
border
rounded-lg
"
/>

</div>

</div>


{/* Desktop Table */}

<div className="hidden md:block bg-white rounded-xl shadow border overflow-x-auto">

<table className="w-full text-sm">

<thead className="bg-gray-50">

<tr>

<th className="px-4 py-3 text-left">
Student
</th>

<th className="px-4 py-3 text-left">
Program
</th>

<th className="px-4 py-3 text-left">
Year
</th>

<th className="px-4 py-3 text-left">
Subject
</th>

<th className="px-4 py-3 text-left">
Action
</th>

</tr>

</thead>

<tbody>

{paginatedStudents.map(({student,subject}, index) => (

<tr
key={index}
className="border-t hover:bg-gray-50"
>

<td className="px-4 py-3">

<div className="font-medium">
{student.name}
</div>

<div className="text-xs text-gray-500">
{student.id}
</div>

</td>

<td className="px-4 py-3">
{student.program || 'N/A'}
</td>

<td className="px-4 py-3">
{student.year || 'N/A'}
</td>

<td className="px-4 py-3">
{subject.name}
</td>

<td className="px-4 py-3">

<button
onClick={() =>
setSelectedStudent({student,subject})
}
className="
flex items-center gap-1
text-primary
text-sm
hover:underline
"
>

<Eye size={16} />

View

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>


{/* Mobile Cards */}

<div className="md:hidden space-y-4">

{paginatedStudents.map(({student,subject}, index) => (

<div
key={index}
className="
bg-white
border
rounded-xl
p-4
space-y-2
"
>

<div className="font-semibold">
{student.name}
</div>

<div className="text-xs text-gray-500">
{student.id}
</div>

<div className="text-sm">
Program: {student.program || 'N/A'}
</div>

<div className="text-sm">
Year: {student.year || 'N/A'}
</div>

<div className="text-sm">
Subject: {subject.name}
</div>

<button
onClick={() =>
setSelectedStudent({student,subject})
}
className="
text-primary
flex items-center
gap-1
text-sm
"
>

<Eye size={16} />

View Details

</button>

</div>

))}

</div>


{/* Pagination */}

<div className="flex items-center justify-between">

<select
value={rowsPerPage}
onChange={(e)=>{
setRowsPerPage(Number(e.target.value));
setCurrentPage(1);
}}
className="border px-2 py-1 rounded"
>

<option value={5}>5</option>
<option value={10}>10</option>
<option value={20}>20</option>

</select>

<div className="flex gap-2">

<button
onClick={()=>goToPage(currentPage-1)}
disabled={currentPage===1}
className="px-3 py-1 border rounded disabled:opacity-40"
>

Prev

</button>

{Array.from({length:totalPages},(_,i)=>i+1)
.map(p=>(
<button
key={p}
onClick={()=>goToPage(p)}
className={`px-3 py-1 border rounded ${
currentPage===p
?'bg-primary text-white':''
}`}
>
{p}
</button>
))}

<button
onClick={()=>goToPage(currentPage+1)}
disabled={currentPage===totalPages}
className="px-3 py-1 border rounded disabled:opacity-40"
>

Next

</button>

</div>

</div>


{/* Student Modal */}

{selectedStudent && selectedStudent.student && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-sm relative">
            <button onClick={() => setSelectedStudent(null)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100">
                <X size={18} />
            </button>
            <div className="text-center font-bold uppercase mb-4 text-lg">Important</div>
            <p className="text-xs text-center mb-4">
                THIS CARD IS NON-TRANSFERABLE. ALWAYS WEAR THIS CARD ON YOUR CHEST WHILE INSIDE THE CAMPUS. REPORT LOSS OF THIS CARD IMMEDIATELY TO THE STUDENT AFFAIRS OFFICE.
            </p>
            <div className="border-t pt-4">
                <p className="font-bold text-center mb-4">In case of emergency, please contact:</p>
                <div className="space-y-2 text-sm">
                    <div className="flex">
                        <span className="w-20 font-semibold">Name:</span>
                        <span>{selectedStudent.student.emergencyContactName || selectedStudent.student.name || 'N/A'}</span>
                    </div>
                    <div className="flex">
                        <span className="w-20 font-semibold">Address:</span>
                        <span>{selectedStudent.student.emergencyContactAddress || 'N/A'}</span>
                    </div>
                    <div className="flex">
                        <span className="w-20 font-semibold">Tel. No:</span>
                        <span>{selectedStudent.student.emergencyContactPhone || 'N/A'}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}

</div>

);

}
