'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../shared/Layout';
import { useAuth } from '../../contexts/AuthContext';

import {
Book,
Users,
School,
Loader2,
ClipboardList
} from 'lucide-react';

import PendingRequests from './PendingRequests';
import PendingEnrollments from './PendingEnrollments';
import EnrolledStudents from './EnrolledStudents';
import ManageSubjects from './ManageSubjects';
import LabView from './LabView';
import RoomReservations from './RoomReservations';
import AttendanceRecords from './AttendanceRecords';
import TeacherCalendar from './TeacherCalendar';
import QRScanner from './QRScanner';
import SubjectDetails from './SubjectDetails';
import Classwork from './Classwork/index';
import GradingSetup from './GradingSetup';

import {
getSubjectsAction,
getEnrollmentsAction,
getLabRequestsAction,
getTermsAction
} from '@/app/actions/dbActions';

import { Term } from '@/utils/storage';

export default function TeacherDashboard() {

const { user } = useAuth();

const [currentView,setCurrentView] = useState('home');
const [subjects,setSubjects] = useState<any[]>([]);
const [activeTerms,setActiveTerms] = useState<Term[]>([]);
const [loading,setLoading] = useState(true);
const [selectedSubject,setSelectedSubject] = useState<any>(null);

const [stats,setStats] = useState({
totalSubjects:0,
totalStudents:0,
pendingEnrollments:0,
pendingRequests:0
});

useEffect(()=>{
if(user) loadDashboard();
},[user]);

const loadDashboard = async ()=>{

if(!user?.id) return;

setLoading(true);

try{

const [
subjectsData,
enrollmentsData,
requestsData,
termData
] = await Promise.all([
getSubjectsAction(),
getEnrollmentsAction(),
getLabRequestsAction(),
getTermsAction()
]);

const teacherSubjects =
subjectsData.filter(s=>s.teacherId===user.id);

const active =
termData.filter(t=>t.status==='active');

setActiveTerms(active);

const subjectsWithCounts =
teacherSubjects.map(subject=>{

const studentCount =
enrollmentsData.filter(
e=>e.subjectId===subject.id && e.status==='approved'
).length;

return { ...subject, studentCount };

});

const totalStudents =
enrollmentsData.filter(
e=>teacherSubjects.some(s=>s.id===e.subjectId)
&& e.status==='approved'
).length;

const pendingEnrollments =
enrollmentsData.filter(
e=>teacherSubjects.some(s=>s.id===e.subjectId)
&& e.status==='pending'
).length;

const pendingRequests =
requestsData.filter(r=>r.status==='pending').length;

setSubjects(subjectsWithCounts);

setStats({
totalSubjects:teacherSubjects.length,
totalStudents,
pendingEnrollments,
pendingRequests
});

}catch(error){

console.error("Dashboard error:",error);

}finally{

setLoading(false);

}

};

/* ----------------------------
   HOME VIEW
---------------------------- */

const renderHome = () => (

<div className="space-y-10">

{/* Header */}

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

<div>

<h2 className="text-3xl font-bold text-primary tracking-tight">
Faculty Hub
</h2>

<p className="text-sm text-muted-foreground mt-1">
Welcome back, {user?.name}
</p>

</div>

<div className="flex flex-wrap gap-2">

{activeTerms.map(term=>(
<span
key={term.id}
className="px-4 py-1.5 text-xs rounded-full bg-primary/10 text-primary font-semibold"
>
Active: {term.name}
</span>
))}

</div>

</div>

{/* Stats */}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

<StatCard
title="Total Subjects"
value={stats.totalSubjects}
icon={<Book size={22}/>}
/>

<StatCard
title="Total Students"
value={stats.totalStudents}
icon={<Users size={22}/>}
/>

<StatCard
title="Pending Enrollments"
value={stats.pendingEnrollments}
icon={<School size={22}/>}
/>

<StatCard
title="Pending Requests"
value={stats.pendingRequests}
icon={<ClipboardList size={22}/>}
/>

</div>

{/* Subject Cards */}

{loading ? (

<div className="flex justify-center py-20">
<Loader2 className="animate-spin text-primary" size={40}/>
</div>

) : subjects.length===0 ? (

<div className="text-center py-20 bg-white rounded-xl border">

<Book
size={56}
className="mx-auto text-primary opacity-30 mb-6"
/>

<h3 className="text-lg font-semibold">
No Subjects Assigned
</h3>

<p className="text-sm text-muted-foreground mt-2 mb-6">
Create or assign subjects to start teaching.
</p>

<button
onClick={()=>setCurrentView('manage-subjects')}
className="px-6 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90"
>
Create Subject
</button>

</div>

) : (

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

{subjects.map(subject=>(

<div
key={subject.id}
onClick={()=>setSelectedSubject(subject)}
className="bg-white rounded-xl border p-6 cursor-pointer hover:shadow-md transition"
>

<div className="flex items-center gap-3 mb-4">

<div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<School size={20}/>
</div>

<h3 className="font-semibold text-primary">
{subject.name}
</h3>

</div>

<div className="text-xs text-muted-foreground space-y-1 mb-4">

{subject.schedules?.map((s:any,i:number)=>(
<div key={i}>
{s.day} • {s.startTime}
</div>
))}

</div>

<div className="flex justify-between items-center border-t pt-3">

<span className="text-xs text-muted-foreground">
Students
</span>

<span className="flex items-center gap-1 text-primary font-semibold">
{subject.studentCount}
<Users size={14}/>
</span>

</div>

</div>

))}

</div>

)}

</div>

);

/* ----------------------------
   ROUTING
---------------------------- */

const renderContent = ()=>{

if(selectedSubject)
return(
<SubjectDetails
subject={selectedSubject}
onBack={()=>{
setSelectedSubject(null);
loadDashboard();
}}
/>
);

switch(currentView){

case 'home':
return renderHome();

case 'schedule':
return <TeacherCalendar subjects={subjects}/>;

case 'scanner':
return <QRScanner/>;

case 'classwork':
return <Classwork/>;

case 'grading':
return <GradingSetup/>;

case 'pending-requests':
return <PendingRequests/>;

case 'pending-enrollments':
return <PendingEnrollments/>;

case 'enrolled-students':
return <EnrolledStudents/>;

case 'lab-view':
return <LabView/>;

case 'manage-subjects':
return <ManageSubjects/>;

case 'reservations':
return <RoomReservations/>;

case 'attendance-records':
return <AttendanceRecords/>;

default:
return renderHome();

}

};

/* ----------------------------
   MAIN
---------------------------- */

return(

<Layout
currentView={currentView}
onNavigate={setCurrentView}
>

<div className="p-4 sm:p-6 lg:p-8">
{renderContent()}
</div>

</Layout>

);

}

/* ----------------------------
   STAT CARD
---------------------------- */

function StatCard({title,value,icon}:any){

return(

<div className="bg-white p-6 rounded-xl border flex items-center gap-4 hover:shadow-sm transition">

<div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
{icon}
</div>

<div>

<p className="text-xs text-muted-foreground mb-1">
{title}
</p>

<p className="text-2xl font-semibold text-primary">
{value}
</p>

</div>

</div>

);

}