
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
import ProfileView from '../shared/ProfileView';

import {
getSubjectsAction,
getEnrollmentsAction,
getLabRequestsAction,
getTermsAction
} from '@/app/actions/dbActions';

import { Term } from '@/utils/storage';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

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
}, [user, currentView]);

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
requestsData.filter(r => {
    const isTeacherSubject = teacherSubjects.some(s => s.id === r.subjectId);
    return isTeacherSubject && r.status === 'pending';
}).length;

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

const renderHome = () => (

<div className="space-y-10">

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

<div>

<h2 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">
Faculty Hub
</h2>

<p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">
Welcome back, {user?.name}
</p>

</div>

<div className="flex flex-wrap gap-2">

{activeTerms.map(term=>(
<span
key={term.id}
className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full bg-primary/10 text-primary border border-primary/5"
>
Active: {term.name}
</span>
))}

</div>

</div>

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

<StatCard
title="Total Subjects"
value={stats.totalSubjects}
icon={<Book size={22}/>}
onClick={() => setCurrentView('manage-subjects')}
/>

<StatCard
title="Total Students"
value={stats.totalStudents}
icon={<Users size={22}/>}
onClick={() => setCurrentView('enrolled-students')}
/>

<StatCard
title="Pending Enrollments"
value={stats.pendingEnrollments}
icon={<School size={22}/>}
onClick={() => setCurrentView('pending-enrollments')}
/>

<StatCard
title="Pending Requests"
value={stats.pendingRequests}
icon={<ClipboardList size={22}/>}
onClick={() => setCurrentView('pending-requests')}
/>

</div>

{loading ? (

<div className="flex justify-center py-20">
<Loader2 className="animate-spin text-primary" size={40}/>
</div>

) : subjects.length===0 ? (

<div className="text-center py-20 bg-white rounded-[2.5rem] border-primary/5 shadow-xl">

<Book
size={56}
className="mx-auto text-primary opacity-20 mb-6"
/>

<h3 className="text-xl font-black uppercase tracking-tighter">
No Subjects Assigned
</h3>

<p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2 mb-8">
Provision your load to start teaching.
</p>

<button
onClick={()=>setCurrentView('manage-subjects')}
className="px-8 py-4 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all"
>
Create Subject
</button>

</div>

) : (

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

{subjects.map(subject=>(

<Card
key={subject.id}
onClick={()=>setSelectedSubject(subject)}
className="bg-white rounded-[2rem] border-primary/5 p-8 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all group"
>

<div className="flex items-center gap-4 mb-6">

<div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<School size={24}/>
</div>

<h3 className="font-black text-primary uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
{subject.name}
</h3>

</div>

<div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest space-y-2 mb-6">

{subject.schedules?.map((s:any,i:number)=>(
<div key={i} className="flex items-center gap-2">
    <div className="w-1.5 h-1.5 rounded-full bg-primary/20"/>
    {s.day} • {s.startTime}
</div>
))}

</div>

<div className="flex justify-between items-center border-t pt-5">

<span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
Enrollments
</span>

<span className="flex items-center gap-1.5 text-primary font-black">
{subject.studentCount}
<Users size={14}/>
</span>

</div>

</Card>

))}

</div>

)}

</div>

);

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

case 'profile':
return <ProfileView />;

default:
return renderHome();

}

};

return(

<Layout
currentView={currentView}
onNavigate={setCurrentView}
>

<div className="h-full">
{renderContent()}
</div>

</Layout>

);

}

function StatCard({title,value,icon,onClick}:any){

return(

<div 
  onClick={onClick}
  className={cn(
    "bg-white p-8 rounded-[2.5rem] border-primary/5 shadow-xl flex items-center gap-6 hover:shadow-2xl transition-all group",
    onClick && "cursor-pointer"
  )}
>

<div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
{icon}
</div>

<div>

<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
{title}
</p>

<p className="text-3xl font-black text-primary tracking-tighter">
{value}
</p>

</div>

</div>

);

}
