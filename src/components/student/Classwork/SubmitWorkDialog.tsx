
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Classwork } from '@/utils/storage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addSubmissionAction } from '@/app/actions/dbActions';
import { toast } from 'sonner';
import { Loader2, Upload } from 'lucide-react';

interface SubmitWorkDialogProps {
  classwork: Classwork;
  onClose: () => void;
  onSubmitted: () => void;
}

export default function SubmitWorkDialog({ classwork, onClose, onSubmitted }: SubmitWorkDialogProps) {
  const { user } = useAuth();
  const [textAnswer, setTextAnswer] = useState('');
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
    if (files.length === 0 && !textAnswer.trim()) {
      toast.error("Please provide an answer or upload a file.");
      return;
    }
    setLoading(true);

    try {
      const submissionFiles = await Promise.all(
        files.map(file => {
          return new Promise<{ name: string, data: string }>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve({ name: file.name, data: reader.result as string });
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      );

      await addSubmissionAction({
        classworkId: classwork.id,
        studentId: user.id,
        textAnswer: textAnswer,
        submissionFiles: submissionFiles,
        status: 'submitted',
      });
      
      toast.success("Work submitted successfully!");
      onSubmitted();

    } catch (err) {
      console.error(err);
      toast.error("Failed to submit work.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tight text-primary">Submit Work for "{classwork.title}"</DialogTitle>
          <DialogDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Attach PDF, Word, Images, or Excel files below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="files" className="text-[10px] font-black uppercase tracking-widest ml-1">Attach Files (DOCX, PDF, PIC, etc.)</Label>
            <Input 
              id="files" 
              type="file" 
              multiple 
              onChange={handleFileChange} 
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.xls,.xlsx,.ppt,.pptx"
              className="h-auto py-2 bg-muted/20 border-primary/10 rounded-xl"
            />
             {files.length > 0 && (
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest pt-2">
                    Selected: {files.map(f => f.name).join(', ')}
                </div>
             )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="textAnswer" className="text-[10px] font-black uppercase tracking-widest ml-1">Text Answer / Notes</Label>
            <Textarea 
              id="textAnswer" 
              value={textAnswer} 
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="rounded-xl border-primary/10 min-h-[120px]"
            />
          </div>
          <DialogFooter className="gap-3 sm:gap-0">
            <DialogClose asChild><Button type="button" variant="ghost" className="rounded-full h-12 px-8 font-black uppercase text-xs tracking-widest">Cancel</Button></DialogClose>
            <Button type="submit" disabled={loading} className="rounded-full h-12 px-10 bg-primary text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">
              {loading ? <Loader2 className="animate-spin mr-2"/> : <Upload className="h-4 w-4 mr-2" />}
              Submit Assignment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
