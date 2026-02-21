'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { addSubjectAction } from '@/app/actions/dbActions';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { Subject } from '@/utils/storage';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface AddSubjectDialogProps {
  onSubjectAdded: () => void;
}

export default function AddSubjectDialog({ onSubjectAdded }: AddSubjectDialogProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    day: '',
    startTime: '',
    dismissalTime: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.day || !formData.startTime || !formData.dismissalTime) {
      toast.error('All asterisk marked fields are mandatory');
      return;
    }

    const newSubject: Omit<Subject, 'id' | 'teacherId' | 'teacherName'> & { teacherId: string; teacherName: string } = {
      name: formData.name,
      teacherId: user!.id,
      teacherName: user!.name,
      day: formData.day,
      startTime: formData.startTime,
      dismissalTime: formData.dismissalTime,
      description: formData.description
    };

    await addSubjectAction({ ...newSubject, id: `SUB-${Date.now()}` });
    toast.success('Subject officially recorded in the master list');
    setFormData({ name: '', day: '', startTime: '', dismissalTime: '', description: '' });
    setOpen(false);
    onSubjectAdded();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-white font-black h-14 px-8 rounded-2xl shadow-2xl shadow-primary/20 gap-3 uppercase tracking-widest text-xs">
          <Plus className="w-5 h-5" />
          Provision Subject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-0 rounded-[2.5rem] shadow-3xl">
        <div className="bg-primary p-10 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              New Academic Unit
            </DialogTitle>
            <DialogDescription className="text-white/70 font-bold uppercase tracking-widest text-[10px] mt-2">
              Add a verified subject to your teaching load
            </DialogDescription>
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit} className="p-10 space-y-6 bg-white">
          <div className="space-y-3">
            <Label htmlFor="name" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Subject *</Label>
            <Input
              id="name"
              placeholder="e.g., Computing Fundamentals"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-14 rounded-xl border-primary/10 font-black text-lg focus:border-primary transition-all"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="day" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Day *</Label>
              <Select
                value={formData.day}
                onValueChange={(value) => setFormData({ ...formData, day: value })}
                required
              >
                <SelectTrigger className="h-14 rounded-xl border-primary/10 font-black uppercase tracking-widest text-[10px]">
                  <SelectValue placeholder="SELECT DAY" />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((day) => (
                    <SelectItem key={day} value={day} className="font-bold">
                      {day.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="startTime" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Start Time *</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
                className="h-14 rounded-xl border-primary/10 font-black"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="dismissalTime" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Dismissal Time *</Label>
              <Input
                id="dismissalTime"
                type="time"
                value={formData.dismissalTime}
                onChange={(e) => setFormData({ ...formData, dismissalTime: e.target.value })}
                required
                className="h-14 rounded-xl border-primary/10 font-black"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label htmlFor="description" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Notes</Label>
            <Textarea
              id="description"
              placeholder=""
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="rounded-xl border-primary/10 font-medium focus:border-primary"
            />
          </div>
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs border-primary/10 hover:bg-primary/5">
              Discard
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white font-black h-14 rounded-2xl shadow-xl shadow-primary/20 uppercase tracking-widest text-xs">
              Commit Subject
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
