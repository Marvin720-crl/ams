'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getAcademicRecordsAction, getTermsAction, getSubjectsAction, getAttendancesAction, getClassworksAction, getSubmissionsAction, getGradingWeightsAction } from '@/app/actions/dbActions';
import { AcademicRecord, Term, Subject, Attendance, Classwork, Submission, GradingWeights } from '@/utils/storage';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function GradeSlip() {
    const { user } = useAuth();
    const [terms, setTerms] = useState<Term[]>([]);
    const [selectedTermId, setSelectedTermId] = useState<string>('');
    const [records, setRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const [allTerms, allHistorical] = await Promise.all([
                getTermsAction(),
                getAcademicRecordsAction()
            ]);
            
            const sortedTerms = allTerms.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setTerms(sortedTerms);
            
            if (sortedTerms.length > 0) {
                const defaultTermId = sortedTerms.find(t => t.status === 'active')?.id || sortedTerms[0].id;
                setSelectedTermId(defaultTermId);
                loadTermGrades(defaultTermId, allHistorical);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const loadTermGrades = async (termId: string, historical?: AcademicRecord[]) => {
        if (!user) return;
        const term = terms.find(t => t.id === termId);
        
        // 1. Check History first
        const history = (historical || await getAcademicRecordsAction()).filter(r => r.studentId === user.id && r.termId === termId);
        if (history.length > 0) {
            setRecords(history.map(h => ({
                code: h.subjectCode,
                description: h.subjectName,
                units: h.units,
                grade: h.grade.toFixed(2),
                letter: getLetter(h.grade)
            })));
            return;
        }

        // 2. If term is active, compute live grades
        if (term?.status === 'active') {
            const [allSubjects, allAttendances, allClassworks, allSubmissions, allWeights] = await Promise.all([
                getSubjectsAction(),
                getAttendancesAction(),
                getClassworksAction(),
                getSubmissionsAction(),
                getGradingWeightsAction()
            ]);

            const termSubjects = allSubjects.filter(s => s.termId === termId);
            const liveGrades = [];

            for (const subject of termSubjects) {
                const weights = allWeights.find(w => w.subjectId === subject.id) || {
                    attendance: 10, late: 5, activities: 20, quizzes: 20, performance: 25, finalOutput: 20
                };

                const studentAttendances = allAttendances.filter(a => a.studentId === user.id && a.subjectId === subject.id);
                const studentSubmissions = allSubmissions.filter(s => s.studentId === user.id);

                const totalSessions = studentAttendances.length || 1;
                const presentPoints = (studentAttendances.filter(a => a.status === 'present').length / totalSessions) * 100;
                const latePoints = (studentAttendances.filter(a => a.status === 'late').length / totalSessions) * 100;

                const subjectClassworks = allClassworks.filter(cw => cw.subjectId === subject.id);
                const getAverage = (type: string) => {
                    const group = subjectClassworks.filter(cw => cw.type === type);
                    if (group.length === 0) return 100;
                    
                    let percentageTotal = 0;
                    let count = 0;

                    group.forEach(task => {
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

                const activityScore = getAverage('activity');
                const quizScore = getAverage('quiz');
                const performanceScore = getAverage('performance');
                const finalOutputScore = getAverage('final_output');

                const finalScore = (
                    (presentPoints * (weights.attendance / 100)) +
                    (latePoints * (weights.late / 100)) +
                    (activityScore * (weights.activities / 100)) +
                    (quizScore * (weights.quizzes / 100)) +
                    (performanceScore * (weights.performance / 100)) +
                    (finalOutputScore * (weights.finalOutput / 100))
                );

                let grade = 5.00;
                if (finalScore >= 97) grade = 1.00;
                else if (finalScore >= 94) grade = 1.25;
                else if (finalScore >= 91) grade = 1.50;
                else if (finalScore >= 88) grade = 1.75;
                else if (finalScore >= 85) grade = 2.00;
                else if (finalScore >= 82) grade = 2.25;
                else if (finalScore >= 79) grade = 2.50;
                else if (finalScore >= 76) grade = 2.75;
                else if (finalScore >= 75) grade = 3.00;

                liveGrades.push({
                    code: subject.code || 'SUBJ',
                    description: subject.name,
                    units: subject.units || 3,
                    grade: grade.toFixed(2),
                    letter: getLetter(grade)
                });
            }
            setRecords(liveGrades);
        } else {
            setRecords([]);
        }
    };

    const getLetter = (g: number) => {
        if (g <= 1.25) return 'A+';
        if (g <= 1.50) return 'A';
        if (g <= 1.75) return 'A-';
        if (g <= 2.00) return 'B+';
        if (g <= 2.25) return 'B';
        if (g <= 2.50) return 'B-';
        if (g <= 3.00) return 'C';
        return 'F';
    };

    useEffect(() => { fetchData(); }, [user]);

    const calculateGWA = () => {
        if (records.length === 0) return "0.00";
        let totalPoints = 0;
        let totalUnits = 0;
        records.forEach(r => {
            totalPoints += parseFloat(r.grade) * r.units;
            totalUnits += r.units;
        });
        return (totalPoints / totalUnits).toFixed(2);
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <div className="flex justify-between items-center print:hidden">
                <div className="w-72">
                    <Select value={selectedTermId} onValueChange={v => { setSelectedTermId(v); loadTermGrades(v); }}>
                        <SelectTrigger className="rounded-full border-primary/10 h-12 shadow-sm"><SelectValue placeholder="Select Term" /></SelectTrigger>
                        <SelectContent className="rounded-2xl">
                            {terms.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="outline" className="rounded-full h-12 px-8 gap-2" onClick={() => window.print()}>
                    <Printer className="h-4 w-4" /> Print Grade Slip
                </Button>
            </div>

            <Card className="rounded-none border-0 shadow-2xl overflow-hidden print:shadow-none bg-white p-16 space-y-12">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-24 h-24">
                        <Image src="/logo.png" alt="AMA Logo" fill className="object-contain" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-xl font-black uppercase tracking-[0.2em] text-primary">AMA EDUCATION SYSTEM</h2>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.4em]">OFFICIAL GRADE SLIP</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-20 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <div className="space-y-2">
                        <div className="flex justify-between border-b pb-1"><span>Name:</span> <span className="text-foreground">{user?.name}</span></div>
                        <div className="flex justify-between border-b pb-1"><span>Student ID:</span> <span className="text-foreground">{user?.id}</span></div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between border-b pb-1"><span>Campus:</span> <span className="text-foreground">AMACC - Lipa</span></div>
                        <div className="flex justify-between border-b pb-1"><span>SY/Term:</span> <span className="text-foreground">{terms.find(t => t.id === selectedTermId)?.name}</span></div>
                    </div>
                </div>

                <div className="border border-black/5">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="bg-muted/50 border-b border-black/5 text-left uppercase font-black tracking-widest">
                                <th className="px-6 py-4">Subject Code</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4 text-center">Units Taken</th>
                                <th className="px-6 py-4 text-center">Official Grade</th>
                                <th className="px-6 py-4 text-center">Grade Letter</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {records.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-20 text-center text-muted-foreground font-bold">NO ACADEMIC RECORDS FOUND FOR THIS PERIOD</td></tr>
                            ) : (
                                records.map((record, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                                        <td className="px-6 py-4 font-bold text-primary">{record.code}</td>
                                        <td className="px-6 py-4 font-bold">{record.description}</td>
                                        <td className="px-6 py-4 text-center font-bold">{record.units}</td>
                                        <td className="px-6 py-4 text-center font-black text-sm">{record.grade}</td>
                                        <td className="px-6 py-4 text-center font-black text-sm text-primary">{record.letter}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-end border-t-4 border-primary pt-8">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Registrar Certification</p>
                        <div className="h-10 w-48 border-b-2 border-black/10" />
                        <p className="text-[9px] font-bold text-muted-foreground uppercase">Authorized Signature</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">GENERAL WEIGHTED AVERAGE</p>
                        <div className="text-5xl font-black text-primary tracking-tighter">GWA: {calculateGWA()}</div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
