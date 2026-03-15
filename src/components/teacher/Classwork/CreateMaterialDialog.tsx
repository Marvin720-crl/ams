
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
import { Loader2, FileText, Plus, Upload, Link as LinkIcon, Trash2, X } from 'lucide-react';

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
  const [links, setLinks] = useState<{ name: string, url: string }[]>([]);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addLink = () => {
    if (!newLinkName || !newLinkUrl) {
      toast.error("Please provide both Link Name and URL.");
      return;
    }
    setLinks(prev => [...prev, { name: newLinkName, url: newLinkUrl }]);
    setNewLinkName('');
    setNewLinkUrl('');
  };

  const removeLink = (index: number) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!title || (files.length === 0 && links.length === 0)) {
      toast.error("Please provide a Title and at least one Module Asset (File or Link).");
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
        attachments: links, // links go directly to attachments
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
        <div className="bg-primary p-10 text-white relative">
            <DialogHeader>
                <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                    <FileText className="h-8 w-8" /> UPLOAD LEARNING MODULE
                </DialogTitle>
                <DialogDescription className="text-white/70 font-bold uppercase text-[10px] tracking-widest mt-2">
                    SHARE LECTURES, HANDOUTS, OR INSTRUCTIONAL GUIDES WITH YOUR STUDENTS
                </DialogDescription>
            </DialogHeader>
            <DialogClose className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                <X size={24} />
            </DialogClose>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto no-scrollbar p-10 space-y-10 bg-white">
          <form id="module-form" onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-2">
              <Label htmlFor="mat-title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">MODULE TITLE *</Label>
              <Input id="mat-title" value={title} onChange={e => setTitle(e.target.value)} required className="h-14 rounded-2xl border-primary/10 font-bold px-6" placeholder="e.g. Chapter 1: Introduction to AI" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mat-description" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">INSTRUCTIONAL NOTES (OPTIONAL)</Label>
              <Textarea id="mat-description" value={description} onChange={e => setDescription(e.target.value)} className="rounded-2xl p-6 border-primary/10 min-h-[120px] font-medium" placeholder="Additional details or reading instructions..." />
            </div>

            {/* FILE UPLOAD SECTION - MATCHING SCREENSHOT STYLE */}
            <div className="space-y-4 p-8 border-4 border-dashed rounded-[2.5rem] border-primary/5 bg-primary/[0.02] text-center">
              <div className="h-16 w-16 rounded-2xl bg-white shadow-lg mx-auto flex items-center justify-center text-primary mb-4">
                  <Upload />
              </div>
              <div>
                  <Label htmlFor="mat-files" className="font-black uppercase text-sm tracking-tight text-foreground block mb-2">SELECT DIGITAL ASSETS *</Label>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-6">PDF, PPT, DOCX, OR MEDIA FILES SUPPORTED</p>
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
                  <div className="mt-6 space-y-2 text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-primary/60 ml-2">UPLOAD QUEUE ({files.length})</p>
                      <div className="flex flex-wrap gap-2">
                          {files.map((f, i) => (
                              <div key={i} className="group flex items-center gap-2 px-4 py-2 bg-primary text-white font-black uppercase text-[9px] tracking-widest rounded-full shadow-lg shadow-primary/10 transition-all hover:pr-2">
                                  {f.name}
                                  <button type="button" onClick={() => removeFile(i)} className="opacity-0 group-hover:opacity-100 hover:text-red-300 transition-opacity">
                                      <Trash2 size={12} />
                                  </button>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
            </div>

            {/* LINKS SECTION */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <LinkIcon size={16} className="text-primary" />
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">REFERENCE LINKS (OPTIONAL)</Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Link Display Name (e.g. Video Lecture)" value={newLinkName} onChange={e => setNewLinkName(e.target.value)} className="h-12 rounded-xl border-primary/5 bg-muted/20" />
                    <div className="flex gap-2">
                        <Input placeholder="URL (https://...)" value={newLinkUrl} onChange={e => setNewLinkUrl(e.target.value)} className="h-12 rounded-xl border-primary/5 bg-muted/20 flex-1" />
                        <Button type="button" onClick={addLink} variant="outline" className="h-12 w-12 rounded-xl border-primary/10"><Plus /></Button>
                    </div>
                </div>

                {links.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-[9px] font-black uppercase tracking-widest text-primary/60 ml-2">ADDED LINKS</p>
                        <div className="space-y-2">
                            {links.map((link, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-primary/5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm"><LinkIcon size={14} /></div>
                                        <div>
                                            <p className="font-black text-[11px] uppercase tracking-tight leading-none">{link.name}</p>
                                            <p className="text-[9px] font-bold text-muted-foreground mt-1 truncate max-w-xs">{link.url}</p>
                                        </div>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeLink(i)} className="h-8 w-8 rounded-full text-muted-foreground hover:text-red-600"><Trash2 size={14} /></Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </form>
        </div>

        <DialogFooter className="p-10 bg-muted/10 border-t border-primary/5 flex flex-col sm:flex-row gap-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="flex-1 h-16 rounded-2xl font-black uppercase text-xs tracking-widest">CANCEL</Button>
            </DialogClose>
            <Button form="module-form" type="submit" disabled={loading} className="flex-[2] h-16 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-primary/20 gap-3">
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Plus className="h-5 w-5" />}
              {loading ? 'PUBLISHING...' : 'DEPLOY MODULE'}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
