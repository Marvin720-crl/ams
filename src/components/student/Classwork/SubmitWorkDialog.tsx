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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Work for "{classwork.title}"</DialogTitle>
          <DialogDescription>
            Attach your files or provide a text answer below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="files">Attach Files</Label>
            <Input id="files" type="file" multiple onChange={handleFileChange} />
             {files.length > 0 && (
                <div className="text-xs text-muted-foreground pt-2">
                    Selected: {files.map(f => f.name).join(', ')}
                </div>
             )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="textAnswer">Text Answer</Label>
            <Textarea 
              id="textAnswer" 
              value={textAnswer} 
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Type your answer here..."
            />
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2"/> : <Upload className="h-4 w-4 mr-2" />}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
