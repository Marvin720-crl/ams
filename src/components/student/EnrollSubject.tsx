'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import {
UserPlus,
AlertCircle,
Loader2,
Info
} from 'lucide-react';

import {
addEnrollmentAction,
getSubjectsAction,
getUsersAction,
getEnrollmentsAction,
getTermEnrollmentsAction
} from '@/app/actions/dbActions';

import { toast } from 'sonner';

export default function EnrollSubject() {

const { user } = useAuth();

const [teachers,setTeachers] = useState<any[]>([]);
const [subjects,setSubjects] = useState<any[]>([]);
const [myApprovedTerms,setMyApprovedTerms] = useState<string[]>([]);

const [selectedTeacher,setSelectedTeacher] = useState('');
const [selectedSubject,setSelectedSubject] = useState('');

const [error,setError] = useState('');

const [loading,setLoading] = useState(false);
const [initialLoading,setInitialLoading] = useState(true);

/* -----------------------------
   LOAD INITIAL DATA
----------------------------- */

useEffect(()=>{
if(user) loadInitialData();
},[user]);

useEffect(()=>{
if(selectedTeacher){
loadSubjectsForTeacher(selectedTeacher);
}else{
setSubjects([]);
}
},[selectedTeacher,myApprovedTerms]);

const loadInitialData = async ()=>{

if(!user) return;

setInitialLoading(true);

try{

const [
users,
subjects,
termEnrollments
] = await Promise.all([
getUsersAction(),
getSubjectsAction(),
getTermEnrollmentsAction()
]);

const approvedTerms =
termEnrollments
.filter(te=>te.studentId===user.id && te.status==='approved')
.map(te=>te.termId);

setMyApprovedTerms(approvedTerms);

const teacherUsers =
users.filter(u=>u.role==='teacher');

const teachersWithSubjects =
teacherUsers.filter(t=>
subjects.some(
s=>s.teacherId===t.id &&
approvedTerms.includes(s.termId)
)
);

setTeachers(teachersWithSubjects);

}catch(e){

console.error(e);
toast.error("Failed to load enrollment data.");

}finally{

setInitialLoading(false);

}

};

/* -----------------------------
   LOAD SUBJECTS BY TEACHER
----------------------------- */

const loadSubjectsForTeacher = async (teacherId:string)=>{

if(!user) return;

const allSubjects =
await getSubjectsAction();

const filtered =
allSubjects.filter(s=>
s.teacherId===teacherId &&
myApprovedTerms.includes(s.termId)
);

setSubjects(filtered);

};

/* -----------------------------
   SUBMIT ENROLLMENT
----------------------------- */

const handleSubmit = async (e:React.FormEvent)=>{

e.preventDefault();

setError('');

if(!user || !selectedTeacher || !selectedSubject){

setError('Please select both teacher and subject.');

return;

}

setLoading(true);

try{

const enrollments =
await getEnrollmentsAction();

const existing =
enrollments.find(
(en:any)=>
en.studentId===user.id &&
en.subjectId===selectedSubject
);

if(existing){

setError(
`You already requested this subject. Status: ${existing.status}`
);

setLoading(false);
return;

}

const newEnrollment = {
id:`ENR-${Date.now()}`,
studentId:user.id,
subjectId:selectedSubject,
enrolledAt:new Date().toISOString(),
status:'pending' as const
};

await addEnrollmentAction(newEnrollment);

setSelectedTeacher('');
setSelectedSubject('');

toast.success(
'Enrollment request submitted. Wait for instructor approval.'
);

}catch(e){

toast.error("Submission failed.");

}finally{

setLoading(false);

}

};

/* -----------------------------
   LOADING SCREEN
----------------------------- */

if(initialLoading){

return(
<div className="flex justify-center py-20">
<Loader2 className="animate-spin text-primary" size={40}/>
</div>
);

}

/* -----------------------------
   TERM RESTRICTION
----------------------------- */

if(myApprovedTerms.length===0){

return(

<div className="max-w-3xl space-y-6">

<div>
<h2 className="text-2xl font-bold text-primary">
Enroll in Subject
</h2>
<p className="text-sm text-muted-foreground">
Request registration
</p>
</div>

<div className="bg-amber-50 border border-amber-200 text-amber-900 p-8 rounded-xl text-center space-y-4">

<div className="flex justify-center">
<Info size={32}/>
</div>

<h3 className="font-semibold">
Term Enrollment Required
</h3>

<p className="text-sm text-amber-800">
You must first be approved in an active academic term before registering subjects.
</p>

</div>

</div>

);

}

/* -----------------------------
   FORM
----------------------------- */

return(

<div className="max-w-3xl space-y-8">

{/* Header */}

<div>
<h2 className="text-3xl font-bold text-primary">
Enroll in Subject
</h2>
<p className="text-sm text-muted-foreground">
Submit a subject enrollment request
</p>
</div>

{/* Error */}

{error && (

<div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">

<AlertCircle size={18}/>

<p className="text-sm">{error}</p>

</div>

)}

<form
onSubmit={handleSubmit}
className="bg-white border rounded-xl p-8 space-y-6"
>

{/* Teacher */}

<div className="space-y-2">

<label className="text-sm font-medium">
Instructor
</label>

<select
value={selectedTeacher}
onChange={(e)=>{
setSelectedTeacher(e.target.value);
setSelectedSubject('');
}}
className="w-full border rounded-lg px-4 py-3"
>

<option value="">
Select Instructor
</option>

{teachers.map(t=>(
<option key={t.id} value={t.id}>
{t.name} ({t.id})
</option>
))}

</select>

</div>

{/* Subject */}

<div className="space-y-2">

<label className="text-sm font-medium">
Subject
</label>

<select
value={selectedSubject}
onChange={(e)=>setSelectedSubject(e.target.value)}
disabled={!selectedTeacher || subjects.length===0}
className="w-full border rounded-lg px-4 py-3 disabled:opacity-50"
>

<option value="">
{!selectedTeacher
? "Select instructor first"
: subjects.length===0
? "No available subjects"
: "Select Subject"}
</option>

{subjects.map(s=>(
<option key={s.id} value={s.id}>
{s.name}
</option>
))}

</select>

</div>

{/* Submit */}

<button
type="submit"
disabled={loading || !selectedSubject}
className="w-full h-12 flex items-center justify-center gap-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
>

{loading
? <Loader2 className="animate-spin"/>
: <UserPlus size={18}/>
}

Request Enrollment

</button>

</form>

{/* Policy */}

<div className="p-4 bg-primary/5 border border-primary/10 rounded-lg text-center text-xs text-primary">

You may only enroll in subjects within your approved academic term.

</div>

</div>

);

}