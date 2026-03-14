
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addClassworkAction } from '@/app/actions/dbActions';
import { toast } from 'sonner';
import { Loader2, Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';

interface CreateClassworkDialogProps {
  subjectId: string;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateClassworkDialog({ subjectId, onClose, onCreated }: CreateClassworkDialogProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDateDate, setDueDateDate] = useState('');
  const [dueDateTime, setDueDateTime] = useState('23:59');
  const [totalPoints, setTotalPoints] = useState('100');
  const [type, setType] = useState<'quiz' | 'activity' | 'performance' | 'final_output'>('activity');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!title || !dueDateDate || !dueDateTime || !totalPoints) {
      toast.error("Please fill in Title, Date, Time, and Points.");
      return;
    }
    setLoading(true);

    try {
        const attachmentFiles = await Promise.all(
            files.map(file => {
                return new Promise<{name: string, data: string}>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve({ name: file.name, data: reader.result as string });
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            })
        );
        
      const dueDate = `${dueDateDate}T${dueDateTime}`;

      await addClassworkAction({
        subjectId,
        teacherId: user.id,
        title,
        description,
        dueDate,
        type,
        totalPoints: parseInt(totalPoints),
        status: 'published',
        attachmentFiles,
      });

      toast.success("Classwork created successfully!");
      onCreated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create classwork.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-primary">Create New Classwork</DialogTitle>
          <DialogDescription className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
            Assign a new task, quiz, or activity for your students.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4 max-h-[75vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Title</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required className="h-12 rounded-xl border-primary/10 font-bold" placeholder="Assignment Title" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description (Optional)</Label>
            <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="rounded-xl border-primary/10 min-h-[100px]" placeholder="Provide instructions for your students..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Due Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-primary/40 pointer-events-none" />
                <Input 
                  id="dueDate" 
                  type="date" 
                  value={dueDateDate} 
                  onChange={e => setDueDateDate(e.target.value)} 
                  required 
                  className="h-12 pl-10 rounded-xl border-primary/10 font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueTime" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Due Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 h-5 w-5 text-primary/40 pointer-events-none" />
                <Input 
                  id="dueTime" 
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
              <Label htmlFor="totalPoints" className="text-[10px) font-black uppercase tracking-widest text-muted-foreground ml-1">Total Points</Label>
              <Input id="totalPoints" type="number" value={totalPoints} onChange={e => setTotalPoints(e.target.value)} required min="1" className="h-12 rounded-xl border-primary/10 font-bold" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category</Label>
              <Select value={type} onValueChange={(v: any) => setType(v)}>
                <SelectTrigger id="type" className="h-12 rounded-xl border-primary/10 font-bold">
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

          <div className="space-y-2 p-6 border-2 border-dashed rounded-2xl border-primary/5 bg-primary/[0.02]">
            <Label htmlFor="attachments" className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Instructional Materials (Attachments)</Label>
            <Input 
              id="attachments" 
              type="file" 
              multiple 
              onChange={handleFileChange} 
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.xls,.xlsx,.ppt,.pptx"
              className="h-auto py-2 bg-white" 
            />
            {files.length > 0 && (
                <div className="mt-2 text-xs font-bold text-muted-foreground">
                    Selected Files: {files.map(f => f.name).join(', ')}
                </div>
            )}
          </div>

          <DialogFooter className="gap-3 sm:gap-0 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="rounded-full h-12 px-8 font-black uppercase text-[10px] tracking-widest">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading} className="rounded-full h-12 px-10 bg-primary text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
              Publish Classwork
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
