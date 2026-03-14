
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { addSubjectAction, getTermsAction } from '@/app/actions/dbActions';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, BookOpen, Trash2, Loader2, School, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Schedule, Term } from '@/utils/storage';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface AddSubjectDialogProps {
    onSubjectAdded: () => void;
}

export default function AddSubjectDialog({ onSubjectAdded }: AddSubjectDialogProps) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [units, setUnits] = useState('3');
    const [termId, setTermId] = useState('');
    const [description, setDescription] = useState('');
    const [schedules, setSchedules] = useState<Schedule[]>([{ day: '', startTime: '', dismissalTime: '' }]);
    const [activeTerms, setActiveTerms] = useState<Term[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchingTerms, setFetchingTerms] = useState(false);

    useEffect(() => {
        if (open) {
            setFetchingTerms(true);
            getTermsAction().then(data => {
                const active = data.filter(t => t.status === 'active');
                setActiveTerms(active);
                if (active.length > 0) {
                    setTermId(active[0].id);
                }
            }).finally(() => setFetchingTerms(false));
        }
    }, [open]);

    const handleScheduleChange = (index: number, field: keyof Schedule, value: string) => {
        const newSchedules = [...schedules];
        newSchedules[index] = { ...newSchedules[index], [field]: value };
        setSchedules(newSchedules);
    };

    const addSchedule = () => setSchedules([...schedules, { day: '', startTime: '', dismissalTime: '' }]);
    const removeSchedule = (idx: number) => schedules.length > 1 && setSchedules(schedules.filter((_, i) => i !== idx));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !termId || schedules.some(s => !s.day || !s.startTime || !s.dismissalTime)) {
            toast.error('Please fill all mandatory fields.');
            return;
        }
        setLoading(true);
        try {
            await addSubjectAction({
                id: `SUB-${Date.now()}`,
                name,
                code,
                units: parseInt(units),
                teacherId: user!.id,
                teacherName: user!.name,
                department: user!.department,
                termId,
                schedules,
                description
            });
            toast.success('Subject successfully provisioned!');
            setOpen(false);
            resetForm();
            onSubjectAdded();
        } catch (e) {
            toast.error("Failed to add subject.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName('');
        setCode('');
        setUnits('3');
        setDescription('');
        setSchedules([{ day: '', startTime: '', dismissalTime: '' }]);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full h-12 px-8 bg-primary text-white font-black uppercase text-[10px] tracking-widest gap-2 shadow-xl shadow-primary/20">
                    <Plus className="w-4 h-4" /> Provision Subject
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl">
                <div className="bg-primary p-10 text-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-3xl font-black uppercase tracking-tighter">
                            <BookOpen className="w-8 h-8" /> New Subject Registration
                        </DialogTitle>
                        <DialogDescription className="text-white/70 font-bold uppercase text-[10px] tracking-widest mt-2">
                            Associate course load with an active academic term
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subject Code</Label>
                            <Input placeholder="e.g. CS101" value={code} onChange={e => setCode(e.target.value)} className="h-14 rounded-2xl border-primary/10 font-bold px-6" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subject Title *</Label>
                            <Input placeholder="e.g. Data Structures" value={name} onChange={e => setName(e.target.value)} required className="h-14 rounded-2xl border-primary/10 font-bold px-6" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Units</Label>
                            <Input type="number" value={units} onChange={e => setUnits(e.target.value)} className="h-14 rounded-2xl border-primary/10 font-bold px-6" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Academic Term *</Label>
                            <Select value={termId} onValueChange={setTermId} disabled={fetchingTerms}>
                                <SelectTrigger className="h-14 rounded-2xl border-primary/10 font-bold px-6">
                                    <SelectValue placeholder={fetchingTerms ? "Loading Terms..." : "Select Term"} />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl">
                                    <SelectGroup>
                                        {activeTerms.length === 0 ? (
                                            <div className="p-4 text-center text-[10px] font-bold text-destructive uppercase flex items-center gap-2">
                                                <AlertCircle className="h-3 w-3" /> No active terms found
                                            </div>
                                        ) : (
                                            activeTerms.map(t => (
                                                <SelectItem key={t.id} value={t.id} className="font-bold">
                                                    {t.name}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 ml-1">
                            <School className="h-3 w-3 text-primary" /> Schedule Matrix *
                        </Label>
                        {schedules.map((s, idx) => (
                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-muted/20 border rounded-2xl relative">
                                <Select value={s.day} onValueChange={v => handleScheduleChange(idx, 'day', v)}>
                                    <SelectTrigger className="h-12 rounded-xl border-primary/5 bg-white"><SelectValue placeholder="Day" /></SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {DAYS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <Input type="time" value={s.startTime} onChange={e => handleScheduleChange(idx, 'startTime', e.target.value)} className="h-12 rounded-xl border-primary/5 bg-white px-4" />
                                <Input type="time" value={s.dismissalTime} onChange={e => handleScheduleChange(idx, 'dismissalTime', e.target.value)} className="h-12 rounded-xl border-primary/5 bg-white px-4" />
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeSchedule(idx)} disabled={schedules.length <= 1} className="h-12 w-12 rounded-xl shrink-0">
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addSchedule} className="w-full h-14 rounded-2xl border-dashed border-2 font-black uppercase text-[10px] tracking-widest gap-2">
                            <Plus className="h-4 w-4" /> Add Schedule Block
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Course Notes</Label>
                        <Textarea placeholder="Instructional objectives..." value={description} onChange={e => setDescription(e.target.value)} className="rounded-2xl p-6 border-primary/10 min-h-[120px] font-medium" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="flex-1 h-16 rounded-2xl font-black uppercase text-xs tracking-widest">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading || activeTerms.length === 0} className="flex-1 h-16 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">
                            {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                            {loading ? 'Processing...' : 'Provision Load'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
