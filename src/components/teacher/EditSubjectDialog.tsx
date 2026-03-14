'use client';

import { useState, useEffect } from 'react';
import { updateSubjectAction, getTermsAction } from '@/app/actions/dbActions';

import {
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';

import { Edit, Plus, Trash2, School, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Subject, Schedule, Term } from '@/utils/storage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DAYS = [
'Monday',
'Tuesday',
'Wednesday',
'Thursday',
'Friday',
'Saturday',
'Sunday'
];

interface EditSubjectDialogProps {
subject: Subject;
onClose: () => void;
onSubjectUpdated: () => void;
}

export default function EditSubjectDialog({
subject,
onClose,
onSubjectUpdated
}: EditSubjectDialogProps) {

const [formData, setFormData] = useState<Subject>({
...subject,
schedules: subject.schedules || []
});

const [activeTerms, setActiveTerms] = useState<Term[]>([]);
const [loading, setLoading] = useState(false);
const [fetchingTerms, setFetchingTerms] = useState(true);

const loadTerms = async () => {
    setFetchingTerms(true);
    try {
        const data = await getTermsAction();
        const active = data.filter((t: any) => t.status === 'active');
        setActiveTerms(active);
    } catch (e) {
        console.error(e);
    } finally {
        setFetchingTerms(false);
    }
};

useEffect(() => {
    loadTerms();
    if (!subject.schedules || subject.schedules.length === 0) {
        setFormData({
            ...subject,
            schedules: [{ day: '', startTime: '', dismissalTime: '' }]
        });
    } else {
        setFormData(subject);
    }
}, [subject]);


const handleScheduleChange = (
index: number,
field: keyof Schedule,
value: string
) => {
const newSchedules = [...formData.schedules];
newSchedules[index] = { ...newSchedules[index], [field]: value };
setFormData({ ...formData, schedules: newSchedules });
};

const addSchedule = () => {
setFormData({
...formData,
schedules: [
...formData.schedules,
{ day: '', startTime: '', dismissalTime: '' }
]
});
};

const removeSchedule = (index: number) => {
if (formData.schedules.length <= 1) {
toast.error("At least one schedule is required.");
return;
}
const newSchedules = formData.schedules.filter((_, i) => i !== index);
setFormData({ ...formData, schedules: newSchedules });
};


const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
if (!formData.name) {
    toast.error('Subject name is required.');
    return;
}
if (!formData.termId) {
    toast.error('Academic Term is required.');
    return;
}
if (formData.schedules.some(s => !s.day || !s.startTime || !s.dismissalTime)) {
    toast.error('All schedule fields are mandatory.');
    return;
}

setLoading(true);
try {
    await updateSubjectAction(formData);
    toast.success('Subject successfully updated');
    onSubjectUpdated();
} catch (e) {
    toast.error("Failed to update subject.");
} finally {
    setLoading(false);
}
};

return (
<Dialog open={true} onOpenChange={onClose}>
<DialogContent className="max-w-3xl p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl">
<div className="bg-primary p-10 text-white sticky top-0 z-10">
<DialogHeader>
<DialogTitle className="flex items-center gap-3 text-3xl font-black uppercase tracking-tighter">
<Edit className="w-8 h-8" /> Edit Subject
</DialogTitle>
<DialogDescription className="text-white font-bold text-[10px] uppercase tracking-widest mt-2 opacity-90">
Update subject details and schedule
</DialogDescription>
</DialogHeader>
</div>

<form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto bg-white">

{!fetchingTerms && activeTerms.length === 0 && (
    <Alert variant="destructive" className="rounded-2xl border-none bg-red-50">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="font-black uppercase text-[10px]">Academic Lock</AlertTitle>
        <AlertDescription className="text-[10px] font-bold">
            Walang Active Academic Term sa system. Mangyaring kontakin ang Admin Dashboard para mag-activate ng trimester.
        </AlertDescription>
    </Alert>
)}

<div className="space-y-2">
<Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subject Name *</Label>
<Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-14 rounded-2xl border-primary/10 font-bold px-6" placeholder="Course Title" />
</div>

<div className="space-y-2">
<Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Academic Term *</Label>
<Select 
    key={activeTerms.length} 
    value={formData.termId} 
    onValueChange={(v) => setFormData({...formData, termId: v})} 
    disabled={fetchingTerms || activeTerms.length === 0}
>
<SelectTrigger className="h-14 rounded-2xl border-2 border-primary font-bold px-6 bg-white">
<SelectValue placeholder={fetchingTerms ? "Syncing Database..." : "Select Active Term"} />
</SelectTrigger>
<SelectContent className="rounded-2xl">
{activeTerms.length === 0 ? (
    <SelectItem value="none" disabled className="font-bold text-destructive">NO ACTIVE TERMS FOUND</SelectItem>
) : (
    activeTerms.map(t => <SelectItem key={t.id} value={t.id} className="font-bold">{t.name}</SelectItem>)
)}
</SelectContent>
</Select>
</div>

<div className="space-y-4">
<Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2"><School className="h-3 w-3 text-primary" /> Schedules *</Label>
{formData.schedules.map((schedule, index) => (
<div key={index} className="p-6 border rounded-[1.5rem] bg-muted/5 space-y-4 relative">
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
<div className="space-y-1">
<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Day</Label>
<Select value={schedule.day} onValueChange={(value) => handleScheduleChange(index, 'day', value)}>
<SelectTrigger className="h-12 rounded-xl border-primary/5 bg-white"><SelectValue placeholder="Day" /></SelectTrigger>
<SelectContent className="rounded-xl">{DAYS.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}</SelectContent>
</Select>
</div>
<div className="space-y-1">
<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Start Time</Label>
<Input type="time" value={schedule.startTime} onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)} required className="h-12 rounded-xl border-primary/5 bg-white px-4" />
</div>
<div className="space-y-1">
<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Dismissal Time</Label>
<div className="relative flex items-center gap-2">
<Input type="time" value={schedule.dismissalTime} onChange={(e) => handleScheduleChange(index, 'dismissalTime', e.target.value)} required className="h-12 rounded-xl border-primary/5 bg-white px-4 flex-1" />
<Button type="button" variant="destructive" size="icon" onClick={() => removeSchedule(index)} disabled={formData.schedules.length <= 1} className="h-12 w-12 rounded-xl shrink-0"><Trash2 className="h-5 w-5" /></Button>
</div>
</div>
</div>
</div>
))}
<Button type="button" variant="outline" onClick={addSchedule} className="w-full h-14 rounded-2xl border-dashed border-2 font-black uppercase text-[10px] tracking-widest gap-2"><Plus className="h-4 w-4" /> Add Another Schedule</Button>
</div>

<div className="space-y-2">
<Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Notes</Label>
<Textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Instructional objectives..." rows={4} className="rounded-2xl p-6 border-primary/10 font-medium" />
</div>

<div className="flex flex-col sm:flex-row gap-4 pt-6">
<Button type="button" variant="ghost" onClick={onClose} className="flex-1 h-16 rounded-2xl font-black uppercase text-xs tracking-widest">Cancel</Button>
<Button type="submit" disabled={loading} className="flex-1 h-16 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">
{loading ? <Loader2 className="animate-spin" /> : 'Save Changes'}
</Button>
</div>
</form>
</DialogContent>
</Dialog>
);
}