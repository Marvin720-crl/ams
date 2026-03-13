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
ArrowRight,
Users
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
import { cn } from '@/lib/utils';

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

<h2 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">
Student Hub
</h2>

<p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">
Welcome back, {user?.name}
</p>

</motion.div>

<div className="flex gap-2 flex-wrap">

{approvedTerms.map(term=>(
<Badge
key={term.id}
className="bg-green-600 text-white font-black uppercase text-[10px] tracking-widest px-4 py-1.5 rounded-full"
>
Enrolled: {term.name}
</Badge>
))}

</div>

</div>

{/* Enrollment cards */}

{(unenrolledTerms.length>0 || pendingTerms.length>0) && (

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

{unenrolledTerms.map(term=>(
<Card key={term.id} className="p-8 rounded-[2rem] border-primary/5 shadow-xl flex flex-col gap-6">

<div className="flex items-center gap-4">

<div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
<GraduationCap />
</div>

<div>
<h3 className="font-black text-lg uppercase tracking-tight">{term.name}</h3>
<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Academic Term</p>
</div>

</div>

<Button
onClick={()=>handleTermEnroll(term.id)}
className="h-12 rounded-xl font-black uppercase text-xs tracking-widest"
>
Join Academic Term
</Button>

</Card>
))}

{pendingTerms.map(term=>(
<Card key={term.id} className="p-8 rounded-[2rem] bg-amber-50 border-amber-100 flex items-center gap-6">

<div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
<Loader2 className="animate-spin" />
</div>

<div>

<p className="font-black text-lg uppercase tracking-tight">{term.name}</p>

<p className="text-[10px] font-black text-amber-700/60 uppercase tracking-widest">
Awaiting admin approval
</p>

</div>

</Card>
))}

</div>

)}

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Today's classes */}
    <Card className="lg:col-span-2 p-8 rounded-[2.5rem] border-primary/5 shadow-xl space-y-8">

    <div className="flex justify-between items-center">

    <h3 className="font-black text-xl uppercase tracking-tighter flex items-center gap-3">
    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        <Calendar size={20}/>
    </div>
    Today's Schedule
    </h3>

    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
    {new Date().toDateString()}
    </span>

    </div>

    {loading ? (

    <div className="py-10 text-center">
    <Loader2 className="animate-spin mx-auto text-primary"/>
    </div>

    ) : todayClasses.length===0 ? (

    <div className="py-16 text-center bg-muted/20 rounded-[2rem] border-2 border-dashed">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No classes scheduled today</p>
    </div>

    ) : (

    <div className="space-y-4">

    {todayClasses.map((item,idx)=>(

    <div
    key={idx}
    className="flex items-center justify-between border border-primary/5 rounded-[1.5rem] p-5 hover:bg-muted/20 transition-colors"
    >

    <div className="flex items-center gap-4">

    <div className="p-3 bg-primary/10 rounded-xl text-primary">

    {item.type==='class'
    ?<BookOpen size={20}/>
    :<Monitor size={20}/>
    }

    </div>

    <div>

    <p className="font-black text-primary uppercase leading-tight">
    {item.name}
    </p>

    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
    {item.time} • {item.teacher}
    </p>

    </div>

    </div>

    <Badge className={cn(
        "rounded-full px-3 font-black text-[9px] uppercase tracking-widest",
        item.status === 'ongoing' ? "bg-green-500" : "bg-primary/10 text-primary"
    )}>
    {item.status}
    </Badge>

    </div>

    ))}

    </div>

    )}

    </Card>

    {/* Side card */}
    <div className="space-y-8">
        <Card className="p-8 rounded-[2.5rem] border-primary/5 shadow-xl bg-primary text-white">

        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">
        Approved Terms
        </p>

        <p className="text-5xl font-black tracking-tighter">
        {approvedTerms.length}
        </p>

        <Button
        variant="secondary"
        className="mt-8 w-full h-14 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl"
        onClick={()=>setCurrentView('view-card')}
        >
        View Grade Slip
        <ArrowRight size={16} className="ml-2"/>
        </Button>

        </Card>

        <Card className="p-8 rounded-[2.5rem] border-primary/5 shadow-xl overflow-hidden relative group cursor-pointer" onClick={() => setCurrentView('enroll')}>
            <div className="relative z-10">
                <Users className="text-primary mb-4" size={32} />
                <h4 className="font-black text-xl uppercase tracking-tighter">New Registration</h4>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 leading-relaxed">Enroll in new subjects for the current trimester.</p>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <ArrowRight size={64} />
            </div>
        </Card>
    </div>
</div>

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