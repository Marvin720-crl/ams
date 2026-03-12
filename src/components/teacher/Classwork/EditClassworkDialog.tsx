'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateClassworkAction } from '@/app/actions/dbActions';
import { toast } from 'sonner';
import { Loader2, Save, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Classwork } from '@/utils/storage';

interface EditClassworkDialogProps {
  classwork: Classwork;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditClassworkDialog({ classwork, onClose, onUpdated }: EditClassworkDialogProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState(classwork.title);
  const [description, setDescription] = useState(classwork.description || '');
  
  const [datePart, timePart] = classwork.dueDate.split('T');
  const [dueDateDate, setDueDateDate] = useState(datePart || '');
  const [dueDateTime, setDueDateTime] = useState(timePart || '23:59');
  
  const [totalPoints, setTotalPoints] = useState(classwork.totalPoints?.toString() || '100');
  const [type, setType] = useState<'quiz' | 'activity' | 'performance' | 'final_output'>(classwork.type);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!title || !dueDateDate || !dueDateTime || !totalPoints) {
      toast.error("Please fill in Title, Date, Time, and Points.");
      return;
    }
    setLoading(true);

    try {
      const dueDate = `${dueDateDate}T${dueDateTime}`;
      
      await updateClassworkAction(classwork.id, {
        title,
        description,
        dueDate,
        totalPoints: parseInt(totalPoints),
        type,
      });

      toast.success("Assignment updated successfully!");
      onUpdated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-primary">Edit Assignment</DialogTitle>
          <DialogDescription className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
            Update the details and deadline for "{classwork.title}".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4 max-h-[75vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Title</Label>
            <Input id="edit-title" value={title} onChange={e => setTitle(e.target.value)} required className="h-12 rounded-xl border-primary/10 font-bold" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description (Optional)</Label>
            <Textarea id="edit-description" value={description} onChange={e => setDescription(e.target.value)} className="rounded-xl border-primary/10 min-h-[100px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="edit-date" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Due Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-primary/40 pointer-events-none" />
                <Input 
                  id="edit-date" 
                  type="date" 
                  value={dueDateDate} 
                  onChange={e => setDueDateDate(e.target.value)} 
                  required 
                  className="h-12 pl-10 rounded-xl border-primary/10 font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-time" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Due Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 h-5 w-5 text-primary/40 pointer-events-none" />
                <Input 
                  id="edit-time" 
                  type="time" 
                  value={dueDateTime} 
                  onChange={e => setDueDateTime(e.target.value)} 
                  required 
                  className="h-12 pl-10 rounded-xl border-primary/10 font-bold"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="edit-totalPoints" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Total Points</Label>
              <Input id="edit-totalPoints" type="number" value={totalPoints} onChange={e => setTotalPoints(e.target.value)} required min="1" className="h-12 rounded-xl border-primary/10 font-bold" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Type</Label>
              <Select value={type} onValueChange={(v: any) => setType(v)}>
                <SelectTrigger id="edit-type" className="h-12 rounded-xl border-primary/10 font-bold">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="activity" className="font-bold">Activity</SelectItem>
                  <SelectItem value="quiz" className="font-bold">Quiz</SelectItem>
                  <SelectItem value="performance" className="font-bold">Performance</SelectItem>
                  <SelectItem value="final_output" className="font-bold">Final Output</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-0 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="rounded-full h-12 px-8 font-black uppercase text-[10px] tracking-widest">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading} className="rounded-full h-12 px-10 bg-primary text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20 gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
