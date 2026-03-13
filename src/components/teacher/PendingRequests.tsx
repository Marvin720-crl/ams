'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import {
FileText,
CheckCircle,
XCircle,
Loader2
} from 'lucide-react';

import {
getLabRequestsAction,
updateLabRequestAction,
addAttendanceAction,
getSubjectsAction,
getUsersAction
} from '@/app/actions/dbActions';

import { LabRequest } from '@/utils/storage';

import { toast } from 'sonner';

export default function PendingRequests() {

const { user } = useAuth();

const [requests,setRequests] = useState<any[]>([]);
const [loading,setLoading] = useState(true);
const [processing,setProcessing] = useState<string | null>(null);

/* -----------------------------
   LOAD REQUESTS
----------------------------- */

useEffect(()=>{

if(user){
loadRequests();
}

},[user]);

const loadRequests = async ()=>{

if(!user) return;

setLoading(true);

try{

const [
allRequests,
allSubjects,
allUsers
] = await Promise.all([
getLabRequestsAction(),
getSubjectsAction(),
getUsersAction()
]);

const teacherSubjects =
allSubjects.filter(s=>s.teacherId===user.id);

const teacherSubjectIds =
teacherSubjects.map(s=>s.id);

const pendingRequests =
allRequests
.filter(r=>
teacherSubjectIds.includes(r.subjectId) &&
r.status==='pending'
)
.map(r=>{

const student =
allUsers.find(u=>u.id===r.studentId);

const subject =
teacherSubjects.find(s=>s.id===r.subjectId);

return{
...r,
student_name:student?.name || 'Unknown',
subject_name:subject?.name || 'Unknown'
};

});

setRequests(pendingRequests);

}catch{

toast.error('Failed to load requests');

}finally{

setLoading(false);

}

};

/* -----------------------------
   APPROVE REQUEST
----------------------------- */

const handleApprove = async (request:LabRequest)=>{

setProcessing(request.id);

try{

await updateLabRequestAction(
request.id,
{status:'approved'}
);

const attendanceEntry = {

studentId:request.studentId,
subjectId:request.subjectId,

date:new Date(request.startTime).toISOString(),

status:'present' as const,

timeIn:new Date(request.startTime)
.toLocaleTimeString('en-US',{hour12:false}),

sessionId:`SESS-REQ-${request.id}`,

locationId:request.labId,
locationType:'lab' as const,
pcId:request.pcId

};

await addAttendanceAction(attendanceEntry);

toast.success(
'Request approved and session created'
);

loadRequests();

}catch{

toast.error('Failed to approve request');

}finally{

setProcessing(null);

}

};

/* -----------------------------
   DECLINE REQUEST
----------------------------- */

const handleDecline = async (requestId:string)=>{

if(!confirm('Decline this request?')) return;

setProcessing(requestId);

try{

await updateLabRequestAction(
requestId,
{status:'declined'}
);

toast.info('Request declined');

loadRequests();

}catch{

toast.error('Failed to decline request');

}finally{

setProcessing(null);

}

};

/* -----------------------------
   LOADING
----------------------------- */

if(loading){

return(

<div className="flex justify-center py-20">

<Loader2 className="animate-spin text-primary"/>

</div>

);

}

/* -----------------------------
   EMPTY STATE
----------------------------- */

if(requests.length===0){

return(

<div>

<h2 className="text-2xl font-semibold mb-2">
Pending Requests
</h2>

<p className="text-muted-foreground mb-6">
Review student lab session requests
</p>

<div className="bg-white border rounded-xl shadow p-12 text-center">

<FileText
size={60}
className="mx-auto mb-4 text-muted-foreground opacity-40"
/>

<p className="text-muted-foreground">
No pending requests
</p>

</div>

</div>

);

}

/* -----------------------------
   UI
----------------------------- */

return(

<div>

<h2 className="text-2xl font-semibold mb-2">
Pending Requests
</h2>

<p className="text-muted-foreground mb-8">
Review and approve lab requests from students
</p>

<div className="space-y-4">

{requests.map(request=>(

<div
key={request.id}
className="
bg-white
border
rounded-xl
shadow-sm
p-6
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-6
"
>

{/* REQUEST INFO */}

<div className="space-y-1">

<h3 className="text-lg font-semibold">
{request.subject_name}
</h3>

<p className="text-sm text-muted-foreground">

Student:
<strong className="ml-1">
{request.student_name}
</strong>

<span className="ml-2 text-xs">
({request.studentId})
</span>

</p>

<p className="text-sm text-muted-foreground">

Lab:
<strong className="ml-1">
{request.labId}
</strong>

<span className="ml-2">

PC
{request.pcId?.split('-').pop()}

</span>

</p>

<p className="text-sm text-muted-foreground">

Time:

{new Date(request.startTime)
.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}

—

{new Date(request.endTime)
.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}

</p>

{request.reason && (

<p className="text-sm mt-2">

<span className="font-medium">
Reason:
</span>

<span className="ml-1 text-muted-foreground">
{request.reason}
</span>

</p>

)}

</div>

{/* ACTIONS */}

<div className="flex gap-3">

<button

disabled={processing===request.id}

onClick={()=>handleApprove(request)}

className="
flex
items-center
gap-2
px-4
py-2
bg-green-600
hover:bg-green-700
text-white
rounded-lg
text-sm
disabled:opacity-50
"

>

{processing===request.id
? <Loader2 className="animate-spin" size={16}/>
: <CheckCircle size={16}/>
}

Approve

</button>

<button

disabled={processing===request.id}

onClick={()=>handleDecline(request.id)}

className="
flex
items-center
gap-2
px-4
py-2
bg-red-600
hover:bg-red-700
text-white
rounded-lg
text-sm
disabled:opacity-50
"

>

<XCircle size={16}/>

Decline

</button>

</div>

</div>

))}

</div>

</div>

);

}