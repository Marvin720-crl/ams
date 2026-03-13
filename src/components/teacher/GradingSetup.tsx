'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

import {
getSubjectsAction,
getGradingWeightsAction,
updateGradingWeightsAction,
getEnrollmentsAction,
getUsersAction,
getAttendancesAction,
getClassworksAction,
getSubmissionsAction
} from '@/app/actions/dbActions';

import {
Subject,
GradingWeights
} from '@/utils/storage';

import {
Card,
CardContent,
CardHeader,
CardTitle,
CardDescription
} from '@/components/ui/card';

import {
Tabs,
TabsContent,
TabsList,
TabsTrigger
} from '@/components/ui/tabs';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from '@/components/ui/select';

import {
Loader2,
Save,
Download
} from 'lucide-react';

import { toast } from 'sonner';

export default function GradingSetup() {

const { user } = useAuth();

const [subjects,setSubjects] = useState<Subject[]>([]);
const [selectedSubject,setSelectedSubject] = useState<Subject | null>(null);

const [weights,setWeights] = useState<GradingWeights | null>(null);

const [students,setStudents] = useState<any[]>([]);

const [loading,setLoading] = useState(true);
const [isSaving,setIsSaving] = useState(false);

/* ------------------------------
   LOAD SUBJECTS + WEIGHTS
------------------------------ */

const loadData = async () => {

if(!user) return;

setLoading(true);

try{

const [allSubjects,allWeights] =
await Promise.all([
getSubjectsAction(),
getGradingWeightsAction()
]);

const teacherSubjects =
allSubjects.filter(s=>s.teacherId===user.id);

setSubjects(teacherSubjects);

if(teacherSubjects.length>0){

handleSelectSubject(
teacherSubjects[0],
allWeights
);

}

}catch(e){

toast.error("Failed to load grading settings");

}finally{

setLoading(false);

}

};

/* ------------------------------
   SELECT SUBJECT
------------------------------ */

const handleSelectSubject = async (
subject:Subject,
allWeights?:GradingWeights[]
)=>{

setSelectedSubject(subject);

const weightsList =
allWeights || await getGradingWeightsAction();

const found =
weightsList.find(w=>w.subjectId===subject.id);

setWeights(
found || {
subjectId:subject.id,
attendance:10,
late:5,
activities:20,
quizzes:20,
performance:25,
finalOutput:20
}
);

loadStudentsPerformance(subject.id);

};

/* ------------------------------
   LOAD STUDENT PERFORMANCE
------------------------------ */

const loadStudentsPerformance = async (
subjectId:string
)=>{

const [
enrollments,
users,
attendances,
classworks,
submissions
] = await Promise.all([
getEnrollmentsAction(),
getUsersAction(),
getAttendancesAction(),
getClassworksAction(),
getSubmissionsAction()
]);

const enrolledIds =
enrollments
.filter(e=>e.subjectId===subjectId && e.status==='approved')
.map(e=>e.studentId);

const enrolledStudents =
users.filter(u=>enrolledIds.includes(u.id));

const subjectClassworks =
classworks.filter(cw=>cw.subjectId===subjectId);

const results = enrolledStudents.map(student=>{

const studentAttendances =
attendances.filter(
a=>a.studentId===student.id && a.subjectId===subjectId
);

const studentSubmissions =
submissions.filter(s=>s.studentId===student.id);

const totalSessions =
studentAttendances.length || 1;

const present =
studentAttendances.filter(a=>a.status==='present').length;

const late =
studentAttendances.filter(a=>a.status==='late').length;

const attendancePoints =
(present / totalSessions) * 100;

const latePoints =
(late / totalSessions) * 100;

const computeAverage = (type:string)=>{

const tasks =
subjectClassworks.filter(cw=>cw.type===type);

if(tasks.length===0) return 100;

let total = 0;
let count = 0;

tasks.forEach(task=>{

const sub =
studentSubmissions.find(
s=>s.classworkId===task.id
);

if(sub && sub.status==='graded'){

const earned = sub.grade || 0;
const totalPoints = task.totalPoints || 100;

total += (earned / totalPoints) * 100;

count++;

}

});

return count>0 ? total/count : 0;

};

return{

...student,

attendancePoints,
latePoints,

activityScore:computeAverage('activity'),
quizScore:computeAverage('quiz'),
performanceScore:computeAverage('performance'),
finalOutputScore:computeAverage('final_output')

};

});

setStudents(results);

};

/* ------------------------------
   SAVE GRADING WEIGHTS
------------------------------ */

const handleSaveWeights = async ()=>{

if(!weights) return;

const total =
weights.attendance +
weights.activities +
weights.quizzes +
weights.performance +
weights.finalOutput;

if(total!==100){

toast.error(
`Invalid total (${total}%). Categories must equal 100%.`
);

return;

}

setIsSaving(true);

await updateGradingWeightsAction(weights);

toast.success("Grading system deployed");

setIsSaving(false);

};

/* ------------------------------
   COMPUTE FINAL GRADE
------------------------------ */

const computeFinalGrade = (student:any)=>{

if(!weights) return 0;

const total = (

(student.attendancePoints * (weights.attendance/100)) +

(student.latePoints * (weights.late/100)) +

(student.activityScore * (weights.activities/100)) +

(student.quizScore * (weights.quizzes/100)) +

(student.performanceScore * (weights.performance/100)) +

(student.finalOutputScore * (weights.finalOutput/100))

);

return Number(total.toFixed(2));

};

/* ------------------------------
   GRADE SCALE
------------------------------ */

const getGradeScale = (score:number)=>{

if(score>=97) return '1.00';
if(score>=94) return '1.25';
if(score>=91) return '1.50';
if(score>=88) return '1.75';
if(score>=85) return '2.00';
if(score>=82) return '2.25';
if(score>=79) return '2.50';
if(score>=76) return '2.75';
if(score>=75) return '3.00';

return '5.00';

};

/* ------------------------------
   INITIAL LOAD
------------------------------ */

useEffect(()=>{

loadData();

},[user]);

/* ------------------------------
   LOADING STATE
------------------------------ */

if(loading){

return(
<div className="flex justify-center p-20">
<Loader2 className="animate-spin text-primary"/>
</div>
);

}

/* ------------------------------
   UI
------------------------------ */

return(

<div className="space-y-8">

{/* HEADER */}

<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

<div>

<h1 className="text-3xl font-bold text-primary">
Grading Console
</h1>

<p className="text-sm text-muted-foreground">
Configure grading and view student performance
</p>

</div>

<div className="w-full md:w-64">

<Select
value={selectedSubject?.id}
onValueChange={v=>
handleSelectSubject(
subjects.find(s=>s.id===v)!
)
}
>

<SelectTrigger>
<SelectValue placeholder="Select Subject"/>
</SelectTrigger>

<SelectContent>

{subjects.map(s=>(
<SelectItem key={s.id} value={s.id}>
{s.name}
</SelectItem>
))}

</SelectContent>

</Select>

</div>

</div>

{/* TABS */}

<Tabs defaultValue="weights">

<TabsList>

<TabsTrigger value="weights">
Weight Distribution
</TabsTrigger>

<TabsTrigger value="performance">
Student Performance
</TabsTrigger>

</TabsList>

{/* WEIGHTS TAB */}

<TabsContent value="weights">

<Card>

<CardHeader>

<CardTitle>
Weight Configuration
</CardTitle>

<CardDescription>
Define grading system for {selectedSubject?.name}
</CardDescription>

</CardHeader>

<CardContent className="space-y-6">

{weights && (

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

{Object.entries(weights)
.filter(([key])=>key!=="subjectId")
.map(([key,value])=>(
<div key={key}>

<Label className="capitalize">
{key}
</Label>

<Input
type="number"
value={value}
onChange={(e)=>
setWeights({
...weights,
[key]:parseInt(e.target.value)
})
}
/>

</div>
))

}

</div>

)}

<div className="flex justify-end">

<Button
onClick={handleSaveWeights}
disabled={isSaving}
>

{isSaving
? <Loader2 className="animate-spin"/>
: <Save size={16}/>
}

Save Grading

</Button>

</div>

</CardContent>

</Card>

</TabsContent>

{/* PERFORMANCE TAB */}

<TabsContent value="performance">

<Card>

<CardHeader className="flex flex-row justify-between items-center">

<div>

<CardTitle>
Student Performance
</CardTitle>

<CardDescription>
Live computed grades
</CardDescription>

</div>

<Button
variant="outline"
onClick={()=>window.print()}
>

<Download size={16}/>
Export

</Button>

</CardHeader>

<CardContent className="overflow-x-auto">

<table className="w-full text-sm">

<thead>

<tr className="text-left border-b">

<th className="py-3">Student</th>

<th>Attendance</th>
<th>Activities</th>
<th>Quiz</th>
<th>Performance</th>
<th>Final</th>

<th className="text-right">
Final Grade
</th>

</tr>

</thead>

<tbody>

{students.map(student=>{

const total =
computeFinalGrade(student);

return(

<tr key={student.id} className="border-b">

<td className="py-3">

<div className="font-medium">
{student.name}
</div>

<div className="text-xs text-muted-foreground">
{student.id}
</div>

</td>

<td>{student.attendancePoints.toFixed(0)}%</td>
<td>{student.activityScore.toFixed(0)}%</td>
<td>{student.quizScore.toFixed(0)}%</td>
<td>{student.performanceScore.toFixed(0)}%</td>
<td>{student.finalOutputScore.toFixed(0)}%</td>

<td className="text-right font-bold">

{total}%  
({getGradeScale(total)})

</td>

</tr>

);

})}

</tbody>

</table>

</CardContent>

</Card>

</TabsContent>

</Tabs>

</div>

);

}