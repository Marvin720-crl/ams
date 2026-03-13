'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../shared/Layout';

import {
Calendar,
BookOpen,
Monitor,
User,
GraduationCap,
Loader2,
ArrowRight
} from 'lucide-react';

import { motion } from 'framer-motion';

import MySubjects from './MySubjects';
import MakeRequest from './MakeRequest';
import MyRequests from './MyRequests';
import MySessions from './MySessions';
import EnrollSubject from './EnrollSubject';
import Library from './Library';
import Classwork from './Classwork';
import GradeSlip from './GradeSlip';

import {
getEnrollmentsAction,
getSubjectsAction,
getLabRequestsAction,
getTermsAction,
getTermEnrollmentsAction,
requestTermEnrollmentAction
} from '@/app/actions/dbActions';

import {
Enrollment,
Subject,
LabRequest,
Term,
TermEnrollment
} from '@/utils/storage';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { toast } from 'sonner';

interface TodayClass {
name: string;
time: string;
teacher: string;
type: 'class' | 'lab';
status: 'ongoing' | 'upcoming' | 'ended';
}

export default function StudentDashboard() {

const { user } = useAuth();

const [currentView,setCurrentView] = useState('home');

const [todayClasses,setTodayClasses] = useState<TodayClass[]>([]);
const [activeTerms,setActiveTerms] = useState<Term[]>([]);
const [myTermEnrollments,setMyTermEnrollments] = useState<TermEnrollment[]>([]);

const [loading,setLoading] = useState(true);

useEffect(()=>{
if(user) loadData();
},[currentView,user]);

const loadData = async ()=>{

if(!user) return;

setLoading(true);

try{

const [
terms,
termEnrollments,
enrollments,
subjects,
requests
] = await Promise.all([
getTermsAction(),
getTermEnrollmentsAction(),
getEnrollmentsAction(),
getSubjectsAction(),
getLabRequestsAction()
]);

const active =
terms.filter(t=>t.status==='active');

setActiveTerms(active);

const myTerms =
termEnrollments.filter(e=>e.studentId===user.id);

setMyTermEnrollments(myTerms);

if(currentView==='home'){

const myEnrollments =
enrollments.filter(
e=>e.studentId===user.id && e.status==='approved'
);

const mySubjectIds =
myEnrollments.map(e=>e.subjectId);

const mySubjects =
subjects.filter(s=>mySubjectIds.includes(s.id));

const days =
['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const todayDay =
days[new Date().getDay()];

const now =
new Date();

const regularClasses:TodayClass[] =
mySubjects.flatMap(subject=>{

if(!subject.schedules) return [];

return subject.schedules
.filter(s=>s.day===todayDay)
.map(s=>{

const start=new Date();
const end=new Date();

const [sh,sm]=s.startTime.split(':').map(Number);
const [eh,em]=s.dismissalTime.split(':').map(Number);

start.setHours(sh,sm,0);
end.setHours(eh,em,0);

let status:'ongoing'|'upcoming'|'ended'='upcoming';

if(now>=start && now<=end) status='ongoing';
else if(now>end) status='ended';

return{
name:subject.name,
time:`${s.startTime} - ${s.dismissalTime}`,
teacher:subject.teacherName,
type:'class',
status
};

});

});

const todayStr =
now.toISOString().split('T')[0];

const labClasses:TodayClass[] =
requests
.filter(r=>
r.studentId===user.id &&
r.status==='approved' &&
r.startTime.startsWith(todayStr)
)
.map(r=>{

const subject =
mySubjects.find(s=>s.id===r.subjectId);

const start=new Date(r.startTime);
const end=new Date(r.endTime);

let status:'ongoing'|'upcoming'|'ended'='upcoming';

if(now>=start && now<=end) status='ongoing';
else if(now>end) status='ended';

return{
name:subject?.name || 'Lab Session',
time:`${start.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} - ${end.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`,
teacher:subject?.teacherName || 'N/A',
type:'lab',
status
};

});

setTodayClasses(
[...regularClasses,...labClasses]
.sort((a,b)=>a.time.localeCompare(b.time))
);

}

}catch(e){

console.error(e);

}finally{

setLoading(false);

}

};

const handleTermEnroll = async (termId:string)=>{

try{

await requestTermEnrollmentAction(user!.id,termId);

toast.success("Enrollment request submitted.");

loadData();

}catch(e){

toast.error("Failed to submit request.");

}

};

const renderHome = ()=>{

const unenrolledTerms =
activeTerms.filter(
t=>!myTermEnrollments.some(e=>e.termId===t.id)
);

const pendingTerms =
activeTerms.filter(
t=>myTermEnrollments.some(e=>e.termId===t.id && e.status==='pending')
);

const approvedTermIds =
myTermEnrollments
.filter(e=>e.status==='approved')
.map(e=>e.termId);

const approvedTerms =
activeTerms.filter(t=>approvedTermIds.includes(t.id));

return(

<div className="space-y-10">

{/* Header */}

<div className="flex flex-col md:flex-row justify-between gap-4">

<motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}>

<h2 className="text-3xl font-bold text-primary">
Student Hub
</h2>

<p className="text-sm text-muted-foreground mt-1">
Welcome back, {user?.name}
</p>

</motion.div>

<div className="flex gap-2 flex-wrap">

{approvedTerms.map(term=>(
<Badge
key={term.id}
className="bg-green-600 text-white"
>
Enrolled: {term.name}
</Badge>
))}

</div>

</div>

{/* Enrollment cards */}

{(unenrolledTerms.length>0 || pendingTerms.length>0) && (

<div className="grid md:grid-cols-2 gap-6">

{unenrolledTerms.map(term=>(
<Card key={term.id} className="p-6 flex flex-col gap-4">

<div className="flex items-center gap-3">

<GraduationCap className="text-primary"/>

<h3 className="font-semibold">{term.name}</h3>

</div>

<Button
onClick={()=>handleTermEnroll(term.id)}
>
Join Academic Term
</Button>

</Card>
))}

{pendingTerms.map(term=>(
<Card key={term.id} className="p-6 bg-amber-50">

<div className="flex items-center gap-3">

<Loader2 className="animate-spin text-amber-600"/>

<div>

<p className="font-semibold">{term.name}</p>

<p className="text-sm text-muted-foreground">
Awaiting admin approval
</p>

</div>

</div>

</Card>
))}

</div>

)}

{/* Today's classes */}

<Card className="p-6 space-y-6">

<div className="flex justify-between items-center">

<h3 className="font-semibold flex items-center gap-2">
<Calendar size={18}/>
Today's Schedule
</h3>

<span className="text-xs text-muted-foreground">
{new Date().toDateString()}
</span>

</div>

{loading ? (

<div className="py-10 text-center">
<Loader2 className="animate-spin mx-auto text-primary"/>
</div>

) : todayClasses.length===0 ? (

<div className="py-10 text-center text-muted-foreground">
No classes scheduled today
</div>

) : (

<div className="space-y-4">

{todayClasses.map((item,idx)=>(

<div
key={idx}
className="flex items-center justify-between border rounded-lg p-4"
>

<div className="flex items-center gap-4">

<div className="p-3 bg-primary/10 rounded-lg text-primary">

{item.type==='class'
?<BookOpen size={18}/>
:<Monitor size={18}/>
}

</div>

<div>

<p className="font-medium">
{item.name}
</p>

<p className="text-xs text-muted-foreground">
{item.time} • {item.teacher}
</p>

</div>

</div>

<Badge>
{item.status}
</Badge>

</div>

))}

</div>

)}

</Card>

{/* Side card */}

<Card className="p-6">

<p className="text-sm text-muted-foreground">
Approved Terms
</p>

<p className="text-2xl font-bold">
{approvedTerms.length}
</p>

<Button
variant="outline"
className="mt-6 w-full"
onClick={()=>setCurrentView('view-card')}
>
View Grade Slip
<ArrowRight size={14} className="ml-2"/>
</Button>

</Card>

</div>

);

};

const renderContent = ()=>{

switch(currentView){

case 'home':
return renderHome();

case 'subjects':
return <MySubjects/>;

case 'make-request':
return <MakeRequest/>;

case 'my-requests':
return <MyRequests/>;

case 'my-sessions':
return <MySessions/>;

case 'enroll':
return <EnrollSubject/>;

case 'library':
return <Library/>;

case 'classwork':
return <Classwork/>;

case 'view-card':
return <GradeSlip/>;

default:
return renderHome();

}

};

return(

<Layout
currentView={currentView}
onNavigate={setCurrentView}
>

{renderContent()}

</Layout>

);

}