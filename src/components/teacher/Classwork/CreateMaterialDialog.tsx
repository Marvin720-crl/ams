
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addMaterialAction } from '@/app/actions/dbActions';
import { toast } from 'sonner';
import { Loader2, FileText, Plus, Upload } from 'lucide-react';

interface CreateMaterialDialogProps {
  subjectId: string;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateMaterialDialog({ subjectId, onClose, onCreated }: CreateMaterialDialogProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
    if (!title || files.length === 0) {
      toast.error("Please provide a Title and at least one Module File.");
      return;
    }
    setLoading(true);

    try {
        const materialFiles = await Promise.all(
            files.map(file => {
                return new Promise<{name: string, data: string}>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve({ name: file.name, data: reader.result as string });
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            })
        );
        
      await addMaterialAction({
        subjectId,
        teacherId: user.id,
        title,
        description,
        materialFiles,
      });

      toast.success("Learning Module uploaded successfully!");
      onCreated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload module.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl rounded-[3rem] p-0 overflow-hidden border-none shadow-3xl">
        <div className="bg-primary p-10 text-white">
            <DialogHeader>
                <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                    <FileText className="h-8 w-8" /> Upload Learning Module
                </DialogTitle>
                <DialogDescription className="text-white/70 font-bold uppercase text-[10px] tracking-widest mt-2">
                    Share lectures, handouts, or instructional guides with your students
                </DialogDescription>
            </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-8 bg-white">
          <div className="space-y-2">
            <Label htmlFor="mat-title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Module Title *</Label>
            <Input id="mat-title" value={title} onChange={e => setTitle(e.target.value)} required className="h-14 rounded-2xl border-primary/10 font-bold px-6" placeholder="e.g. Chapter 1: Introduction to AI" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mat-description" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Instructional Notes (Optional)</Label>
            <Textarea id="mat-description" value={description} onChange={e => setDescription(e.target.value)} className="rounded-2xl p-6 border-primary/10 min-h-[120px] font-medium" placeholder="Additional details or reading instructions..." />
          </div>

          <div className="space-y-4 p-8 border-4 border-dashed rounded-[2.5rem] border-primary/5 bg-primary/[0.02] text-center">
            <div className="h-16 w-16 rounded-2xl bg-white shadow-lg mx-auto flex items-center justify-center text-primary mb-4">
                <Upload />
            </div>
            <div>
                <Label htmlFor="mat-files" className="font-black uppercase text-sm tracking-tight text-foreground block mb-2">Select Digital Assets *</Label>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-6">PDF, PPT, DOCX, or Media Files supported</p>
            </div>
            <Input 
              id="mat-files" 
              type="file" 
              multiple 
              onChange={handleFileChange} 
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.xls,.xlsx,.ppt,.pptx"
              className="h-auto py-3 bg-white border-primary/10 rounded-xl" 
            />
            {files.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {files.map((f, i) => (
                        <span key={i} className="px-4 py-2 bg-primary text-white font-black uppercase text-[9px] tracking-widest rounded-full shadow-lg shadow-primary/10">
                            {f.name}
                        </span>
                    ))}
                </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="flex-1 h-16 rounded-2xl font-black uppercase text-xs tracking-widest">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading} className="flex-1 h-16 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-primary/20 gap-3">
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Plus className="h-5 w-5" />}
              {loading ? 'Publishing...' : 'Deploy Module'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
