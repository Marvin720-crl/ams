'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getSubjectsAction, getGradingWeightsAction, updateGradingWeightsAction, getEnrollmentsAction, getUsersAction, getAttendancesAction, getClassworksAction, getSubmissionsAction } from '@/app/actions/dbActions';
import { Subject, GradingWeights, User, Attendance, Classwork, Submission } from '@/utils/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Save, BarChart3, Calculator, UserCheck, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function GradingSetup() {
    const { user } = useAuth();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [weights, setWeights] = useState<GradingWeights | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Students summary state
    const [students, setStudents] = useState<any[]>([]);

    const loadData = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const [allSubjects, allWeights] = await Promise.all([
                getSubjectsAction(),
                getGradingWeightsAction()
            ]);
            const teacherSubjects = allSubjects.filter(s => s.teacherId === user.id);
            setSubjects(teacherSubjects);
            if (teacherSubjects.length > 0 && !selectedSubject) {
                handleSelectSubject(teacherSubjects[0], allWeights);
            }
        } catch (e) {
            toast.error("Failed to load settings.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectSubject = async (subject: Subject, allWeights?: GradingWeights[]) => {
        setSelectedSubject(subject);
        const w = (allWeights || await getGradingWeightsAction()).find(w => w.subjectId === subject.id);
        setWeights(w || {
            subjectId: subject.id,
            attendance: 10,
            late: 5,
            activities: 20,
            quizzes: 20,
            performance: 25,
            finalOutput: 20
        });
        loadStudentsPerformance(subject.id);
    };

    const loadStudentsPerformance = async (subjectId: string) => {
        const [allEnrollments, allUsers, allAttendances, allClassworks, allSubmissions] = await Promise.all([
            getEnrollmentsAction(),
            getUsersAction(),
            getAttendancesAction(),
            getClassworksAction(),
            getSubmissionsAction()
        ]);

        const enIds = allEnrollments.filter(e => e.subjectId === subjectId && e.status === 'approved').map(e => e.studentId);
        const enrolled = allUsers.filter(u => enIds.includes(u.id));
        
        const subjectClassworks = allClassworks.filter(cw => cw.subjectId === subjectId);

        const data = enrolled.map(student => {
            const studentAttendances = allAttendances.filter(a => a.studentId === student.id && a.subjectId === subjectId);
            const studentSubmissions = allSubmissions.filter(s => s.studentId === student.id);

            // Refined Attendance Points
            const totalSessions = studentAttendances.length || 1;
            const present = studentAttendances.filter(a => a.status === 'present').length;
            const late = studentAttendances.filter(a => a.status === 'late').length;
            
            const attendancePoints = (present / totalSessions) * 100;
            const latePoints = (late / totalSessions) * 100;
            
            // Calculate averages for each category based on points
            const getCompScore = (type: string) => {
                const categoryTasks = subjectClassworks.filter(cw => cw.type === type);
                if (categoryTasks.length === 0) return 100;
                
                let percentageTotal = 0;
                let count = 0;

                categoryTasks.forEach(task => {
                    const sub = studentSubmissions.find(s => s.classworkId === task.id);
                    if (sub && sub.status === 'graded') {
                        const earned = sub.grade || 0;
                        const total = task.totalPoints || 100;
                        percentageTotal += (earned / total) * 100;
                        count++;
                    }
                });

                return count > 0 ? (percentageTotal / count) : 0;
            };

            return {
                ...student,
                attendancePoints,
                latePoints,
                activityScore: getCompScore('activity'),
                quizScore: getCompScore('quiz'),
                performanceScore: getCompScore('performance'),
                finalOutputScore: getCompScore('final_output')
            };
        });

        setStudents(data);
    };

    useEffect(() => { loadData(); }, [user]);

    const handleSaveWeights = async () => {
        if (!weights) return;
        const totalPossible = weights.attendance + weights.activities + weights.quizzes + weights.performance + weights.finalOutput;
        if (totalPossible !== 100) {
            toast.error(`Invalid primary weights total (${totalPossible}%). Categories must sum to 100%.`);
            return;
        }
        setIsSaving(true);
        await updateGradingWeightsAction(weights);
        toast.success("Grading system deployed!");
        setIsSaving(false);
    };

    const computeFinalGrade = (student: any) => {
        if (!weights) return 0;
        const total = (
            (student.attendancePoints * (weights.attendance / 100)) +
            (student.latePoints * (weights.late / 100)) +
            (student.activityScore * (weights.activities / 100)) +
            (student.quizScore * (weights.quizzes / 100)) +
            (student.performanceScore * (weights.performance / 100)) +
            (student.finalOutputScore * (weights.finalOutput / 100))
        );
        return parseFloat(total.toFixed(2));
    };

    const getGradeScale = (score: number) => {
        if (score >= 97) return '1.00';
        if (score >= 94) return '1.25';
        if (score >= 91) return '1.50';
        if (score >= 88) return '1.75';
        if (score >= 85) return '2.00';
        if (score >= 82) return '2.25';
        if (score >= 79) return '2.50';
        if (score >= 76) return '2.75';
        if (score >= 75) return '3.00';
        return '5.00';
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">Grading Console</h1>
                    <p className="text-muted-foreground font-bold text-[10px] tracking-[0.2em] mt-2 uppercase">Syncing Classwork with Performance Registry</p>
                </div>
                <div className="w-full md:w-64">
                    <Select value={selectedSubject?.id} onValueChange={v => handleSelectSubject(subjects.find(s => s.id === v)!)}>
                        <SelectTrigger className="rounded-full h-12 border-primary/10 shadow-sm"><SelectValue placeholder="Select Subject" /></SelectTrigger>
                        <SelectContent className="rounded-2xl">{subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
            </div>

            <Tabs defaultValue="weights" className="space-y-6">
                <TabsList className="bg-white border h-14 p-1.5 rounded-full">
                    <TabsTrigger value="weights" className="rounded-full px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase text-[10px] tracking-widest">Weight Distribution</TabsTrigger>
                    <TabsTrigger value="performance" className="rounded-full px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase text-[10px] tracking-widest">Real-time Performance</TabsTrigger>
                </TabsList>

                <TabsContent value="weights">
                    <Card className="rounded-[2.5rem] border-primary/5 shadow-xl overflow-hidden">
                        <CardHeader className="bg-primary/5 p-10"><CardTitle className="text-2xl font-black uppercase">Configuration Matrix (%)</CardTitle><CardDescription className="font-bold">Define the grading criteria for {selectedSubject?.name}</CardDescription></CardHeader>
                        <CardContent className="p-10">
                            {weights && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Attendance (Present)</Label>
                                        <Input type="number" value={weights.attendance} onChange={e => setWeights({...weights, attendance: parseInt(e.target.value)})} className="h-12 text-center font-black rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Late (Penalty Value)</Label>
                                        <Input type="number" value={weights.late} onChange={e => setWeights({...weights, late: parseInt(e.target.value)})} className="h-12 text-center font-black rounded-xl" />
                                    </div>
                                    <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest">Activities</Label><Input type="number" value={weights.activities} onChange={e => setWeights({...weights, activities: parseInt(e.target.value)})} className="h-12 text-center font-black rounded-xl" /></div>
                                    <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest">Quizzes</Label><Input type="number" value={weights.quizzes} onChange={e => setWeights({...weights, quizzes: parseInt(e.target.value)})} className="h-12 text-center font-black rounded-xl" /></div>
                                    <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest">Performance</Label><Input type="number" value={weights.performance} onChange={e => setWeights({...weights, performance: parseInt(e.target.value)})} className="h-12 text-center font-black rounded-xl" /></div>
                                    <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest">Final Output</Label><Input type="number" value={weights.finalOutput} onChange={e => setWeights({...weights, finalOutput: parseInt(e.target.value)})} className="h-12 text-center font-black rounded-xl" /></div>
                                </div>
                            )}
                            <div className="mt-6 p-4 bg-muted/30 rounded-2xl">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase leading-relaxed">
                                    <span className="text-primary font-black">Note:</span> Total weights (Attendance + Activities + Quizzes + Performance + Final Output) must equal 100%. Late penalty is applied to the attendance score.
                                </p>
                            </div>
                            <div className="mt-10 flex justify-end">
                                <Button onClick={handleSaveWeights} className="rounded-full h-14 px-10 gap-2 bg-primary text-white font-black uppercase tracking-widest text-xs" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="animate-spin" /> : <Save className="h-4 w-4" />}
                                    Deploy Grading Matrix
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="performance">
                    <Card className="rounded-[2.5rem] border-primary/5 shadow-xl overflow-hidden">
                        <CardHeader className="bg-primary/5 p-10 flex flex-row items-center justify-between">
                            <div><CardTitle className="text-2xl font-black uppercase">Class Performance Registry</CardTitle><CardDescription className="font-bold">Summary of student averages pulled from classwork submissions</CardDescription></div>
                            <Button variant="outline" className="rounded-full h-12 px-6 gap-2" onClick={() => window.print()}><Download className="h-4 w-4" /> Export Report</Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted/30">
                                        <tr className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            <th className="px-10 py-6 text-left">Student Profile</th>
                                            <th className="px-6 py-6 text-center">ATT/LATE</th>
                                            <th className="px-6 py-6 text-center">ACT</th>
                                            <th className="px-6 py-6 text-center">QUIZ</th>
                                            <th className="px-6 py-6 text-center">PERF</th>
                                            <th className="px-6 py-6 text-center">FINAL OUT</th>
                                            <th className="px-10 py-6 text-right">COMPUTED GRADE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y border-t">
                                        {students.map(student => {
                                            const total = computeFinalGrade(student);
                                            return (
                                                <tr key={student.id} className="hover:bg-primary/[0.02] transition-colors">
                                                    <td className="px-10 py-6">
                                                        <div className="font-black text-primary uppercase text-sm">{student.name}</div>
                                                        <div className="text-[10px] font-bold text-muted-foreground mt-1">ID: {student.id}</div>
                                                    </td>
                                                    <td className="px-6 py-6 text-center font-bold text-xs">
                                                        <div className="flex flex-col">
                                                            <span>P: {student.attendancePoints.toFixed(0)}%</span>
                                                            <span className="text-[9px] opacity-60">L: {student.latePoints.toFixed(0)}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6 text-center font-bold text-xs">{student.activityScore.toFixed(0)}%</td>
                                                    <td className="px-6 py-6 text-center font-bold text-xs">{student.quizScore.toFixed(0)}%</td>
                                                    <td className="px-6 py-6 text-center font-bold text-xs">{student.performanceScore.toFixed(0)}%</td>
                                                    <td className="px-6 py-6 text-center font-bold text-xs">{student.finalOutputScore.toFixed(0)}%</td>
                                                    <td className="px-10 py-6 text-right">
                                                        <div className="font-black text-xl text-primary leading-none">{total}%</div>
                                                        <div className="text-[10px] font-black text-muted-foreground uppercase mt-1">Official: {getGradeScale(total)}</div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
