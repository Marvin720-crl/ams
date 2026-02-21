'use client';

import { useState, useEffect } from 'react';
import { updateSubjectAction } from '@/app/actions/dbActions';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { Subject } from '@/utils/storage';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface EditSubjectDialogProps {
  subject: Subject;
  onClose: () => void;
  onSubjectUpdated: () => void;
}

export default function EditSubjectDialog({ subject, onClose, onSubjectUpdated }: EditSubjectDialogProps) {
  const [formData, setFormData] = useState(subject);

  useEffect(() => {
    setFormData(subject);
  }, [subject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.day || !formData.startTime || !formData.dismissalTime) {
      toast.error('All asterisk marked fields are mandatory');
      return;
    }

    await updateSubjectAction(formData);
    toast.success('Subject has been successfully updated');
    onSubjectUpdated();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-0 rounded-[2.5rem] shadow-3xl">
        <div className="bg-primary p-10 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <Edit className="w-8 h-8" />
              Edit Academic Unit
            </DialogTitle>
            <DialogDescription className="text-white/70 font-bold uppercase tracking-widest text-[10px] mt-2">
              Update the details of this subject
            </DialogDescription>
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit} className="p-10 space-y-6 bg-white">
          <div className="space-y-3">
            <Label htmlFor="subjectId" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Subject ID</Label>
            <Input
              id="subjectId"
              value={formData.id}
              disabled
              className="h-14 rounded-xl border-primary/10 bg-muted/50 font-mono text-sm"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="name" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Subject *</Label>
            <Input
              id="name"
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
                  <SelectValue />
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
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="rounded-xl border-primary/10 font-medium focus:border-primary"
            />
          </div>
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs border-primary/10 hover:bg-primary/5">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white font-black h-14 rounded-2xl shadow-xl shadow-primary/20 uppercase tracking-widest text-xs">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
