'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, CheckCircle, XCircle, Trash2, Loader2, Archive, School, UserCheck } from 'lucide-react';
import { getTermsAction, addTermAction, endTermAction, getTermEnrollmentsAction, updateTermEnrollmentAction, getUsersAction } from '@/app/actions/dbActions';
import { Term, TermEnrollment, User } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function TermManagement() {
    const [terms, setTerms] = useState<Term[]>([]);
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTermName, setNewTermName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [termToEnd, setTermToEnd] = useState<Term | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [allTerms, allTermEnrollments, allUsers] = await Promise.all([
                getTermsAction(),
                getTermEnrollmentsAction(),
                getUsersAction()
            ]);
            
            const populatedEnrollments = allTermEnrollments.map(en => {
                const student = allUsers.find(u => u.id === en.studentId);
                const term = allTerms.find(t => t.id === en.termId);
                return { ...en, studentName: student?.name, termName: term?.name };
            });

            setTerms(allTerms.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
            setEnrollments(populatedEnrollments.sort((a, b) => new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime()));
        } catch (e) {
            toast.error("Failed to load term data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAddTerm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTermName.trim()) return;
        setIsSaving(true);
        try {
            await addTermAction(newTermName);
            toast.success("New Term Activated!");
            setNewTermName('');
            fetchData();
        } catch (e) {
            toast.error("Failed to create term.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleEndTerm = async () => {
        if (!termToEnd) return;
        setLoading(true);
        try {
            await endTermAction(termToEnd.id);
            toast.success(`Term ${termToEnd.name} has been finalized and archived.`);
            setTermToEnd(null);
            fetchData();
        } catch (e) {
            toast.error("Failed to end term.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateEnrollment = async (id: string, status: 'approved' | 'rejected') => {
        try {
            await updateTermEnrollmentAction(id, status);
            toast.success(`Enrollment ${status}.`);
            fetchData();
        } catch (e) {
            toast.error("Action failed.");
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" /></div>;

    const pendingEnrollments = enrollments.filter(e => e.status === 'pending');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">Term Management</h1>
                <p className="text-muted-foreground font-bold text-[10px] tracking-[0.2em] mt-2 uppercase">Academic Cycle Control</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Card className="rounded-[2.5rem] border-primary/5 shadow-xl">
                        <CardHeader><CardTitle>Create New Term</CardTitle><CardDescription>Add a new academic period</CardDescription></CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddTerm} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Term Label</Label>
                                    <Input value={newTermName} onChange={e => setNewTermName(e.target.value)} placeholder="e.g. SY 2025-2026 (2553) 2nd Trimester" required />
                                </div>
                                <Button type="submit" className="w-full h-12 rounded-xl" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                                    Activate New Term
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2.5rem] bg-primary/5 border-0">
                        <CardHeader>
                            <CardTitle className="text-sm flex items-center gap-2"><School className="h-4 w-4 text-primary" /> Active Trimesters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {terms.filter(t => t.status === 'active').map(term => (
                                <div key={term.id} className="p-4 rounded-2xl bg-white border border-primary/10 flex justify-between items-center">
                                    <span className="font-bold text-sm truncate mr-2">{term.name}</span>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm" className="rounded-full h-8 px-4" onClick={() => setTermToEnd(term)}>End Term</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="rounded-[2.5rem]">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="font-black">END ACADEMIC TERM?</AlertDialogTitle>
                                                <AlertDialogDescription className="text-base font-bold text-muted-foreground mt-4" asChild>
                                                    <div>
                                                        Ending <strong>"{termToEnd?.name}"</strong> will:
                                                        <ul className="list-disc ml-6 mt-2 space-y-1">
                                                            <li>Finalize all student grades.</li>
                                                            <li>Archive data to permanent history.</li>
                                                            <li>Clear active subjects for teachers.</li>
                                                        </ul>
                                                    </div>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleEndTerm} className="rounded-full bg-destructive text-white">Finalize & End Term</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Tabs defaultValue="pending">
                        <TabsList className="bg-white border h-12 p-1 rounded-full mb-6">
                            <TabsTrigger value="pending" className="rounded-full px-8">Pending Enrollments ({pendingEnrollments.length})</TabsTrigger>
                            <TabsTrigger value="history" className="rounded-full px-8">Academic History</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="pending">
                            <div className="space-y-4">
                                {pendingEnrollments.length === 0 && <div className="p-12 text-center text-muted-foreground bg-white rounded-[2rem] border">No pending term enrollment requests.</div>}
                                {pendingEnrollments.map(en => (
                                    <div key={en.id} className="p-6 rounded-[2rem] bg-white border shadow-sm flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><UserCheck /></div>
                                            <div>
                                                <p className="font-black text-lg leading-none">{en.studentName}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase">REQUESTING: {en.termName}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" className="rounded-full bg-green-600 hover:bg-green-700 h-10 px-6" onClick={() => handleUpdateEnrollment(en.id, 'approved')}>Approve</Button>
                                            <Button size="sm" variant="destructive" className="rounded-full h-10 px-6" onClick={() => handleUpdateEnrollment(en.id, 'rejected')}>Reject</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="history">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {terms.map(term => (
                                    <div key={term.id} className="p-6 rounded-[2.5rem] bg-white border shadow-sm relative group">
                                        <Badge className={`absolute top-6 right-6 capitalize ${term.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}>{term.status}</Badge>
                                        <School className="h-8 w-8 text-primary mb-4" />
                                        <h3 className="font-black text-xl mb-1 uppercase tracking-tighter">{term.name}</h3>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Created: {new Date(term.createdAt).toLocaleDateString()}</p>
                                        {term.endedAt && <p className="text-[9px] font-bold text-destructive uppercase tracking-widest mt-1">Ended: {new Date(term.endedAt).toLocaleDateString()}</p>}
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
