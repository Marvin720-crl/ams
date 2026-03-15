
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
import { Loader2, FileText, Plus, Upload, Link as LinkIcon, Trash2 } from 'lucide-react';

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
    if (!title) {
      toast.error("Please provide a Module Title.");
      return;
    }
    if (files.length === 0 && links.length === 0) {
      toast.error("Please provide at least one Module Asset (File or Link).");
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
        attachments: links, 
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
      <DialogContent className="sm:max-w-3xl rounded-[3rem] p-0 overflow-hidden border-none shadow-3xl flex flex-col h-[90vh]">
        
        {/* HEADER SECTION - Matches Screenshot */}
        <div className="bg-primary p-10 text-white relative flex-none">
            <DialogHeader>
                <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                    <FileText className="h-8 w-8" /> UPLOAD LEARNING MODULE
                </DialogTitle>
                <DialogDescription className="text-white/70 font-bold uppercase text-[10px] tracking-widest mt-2">
                    SHARE LECTURES, HANDOUTS, OR INSTRUCTIONAL GUIDES WITH YOUR STUDENTS
                </DialogDescription>
            </DialogHeader>
        </div>
        
        {/* SCROLLABLE CONTENT - No Scrollbar */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-10 bg-white">
          <div className="space-y-10">
            {/* MODULE TITLE */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">MODULE IDENTIFICATION *</Label>
              <Input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required 
                className="h-14 rounded-2xl border-primary/10 font-bold px-6 bg-muted/10 focus:ring-primary/20" 
                placeholder="e.g. Chapter 1: Introduction to Calculus" 
              />
            </div>

            {/* INSTRUCTIONAL NOTES */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">INSTRUCTIONAL NOTES (OPTIONAL)</Label>
              <Textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                className="rounded-2xl p-6 border-primary/10 min-h-[140px] font-medium bg-white focus:ring-primary/20" 
                placeholder="Additional details or reading instructions..." 
              />
            </div>

            {/* DIGITAL ASSETS */}
            <div className="space-y-4 p-10 border-4 border-dashed rounded-[2.5rem] border-primary/5 bg-primary/[0.02] text-center relative">
              <div className="h-16 w-16 rounded-2xl bg-white shadow-xl mx-auto flex items-center justify-center text-primary mb-4 border border-primary/5">
                  <Upload />
              </div>
              <div>
                  <Label className="font-black uppercase text-sm tracking-tight text-foreground block mb-2">SELECT DIGITAL ASSETS *</Label>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-8">PDF, PPT, DOCX, OR MEDIA FILES SUPPORTED</p>
              </div>
              
              <div className="bg-white border rounded-xl p-4 shadow-sm">
                <Input 
                  type="file" 
                  multiple 
                  onChange={handleFileChange} 
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.xls,.xlsx,.ppt,.pptx"
                  className="h-auto py-2 bg-transparent border-none shadow-none cursor-pointer" 
                />
              </div>
              
              {files.length > 0 && (
                  <div className="mt-8 space-y-3 text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-primary/60 ml-2">UPLOAD QUEUE ({files.length} ITEMS)</p>
                      <div className="flex flex-wrap gap-2">
                          {files.map((f, i) => (
                              <div key={i} className="group flex items-center gap-3 px-5 py-2.5 bg-primary text-white font-black uppercase text-[10px] tracking-widest rounded-full shadow-lg shadow-primary/10 transition-all hover:bg-primary/90">
                                  <span className="truncate max-w-[200px]">{f.name}</span>
                                  <button type="button" onClick={() => removeFile(i)} className="hover:text-red-300 transition-colors">
                                      <Trash2 size={14} />
                                  </button>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
            </div>

            {/* REFERENCE LINKS */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><LinkIcon size={16} /></div>
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary">REFERENCE LINKS (OPTIONAL)</Label>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <Input 
                      placeholder="Link Name (e.g. YouTube Video)" 
                      value={newLinkName} 
                      onChange={e => setNewLinkName(e.target.value)} 
                      className="h-14 rounded-2xl border-none bg-muted/20 px-6 font-bold" 
                    />
                    <div className="flex gap-2 flex-1">
                        <Input 
                          placeholder="URL (https://...)" 
                          value={newLinkUrl} 
                          onChange={e => setNewLinkUrl(e.target.value)} 
                          className="h-14 rounded-2xl border-none bg-muted/20 px-6 font-bold flex-1" 
                        />
                        <Button 
                          type="button" 
                          onClick={addLink} 
                          variant="outline" 
                          className="h-14 w-14 rounded-2xl border-primary/10 shadow-sm hover:bg-primary hover:text-white transition-all"
                        >
                          <Plus size={24} />
                        </Button>
                    </div>
                </div>

                {links.length > 0 && (
                    <div className="space-y-3">
                        <p className="text-[9px] font-black uppercase tracking-widest text-primary/60 ml-2">ADDED EXTERNAL ASSETS</p>
                        <div className="space-y-3">
                            {links.map((link, i) => (
                                <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border-2 border-primary/5 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0"><LinkIcon size={18} /></div>
                                        <div className="overflow-hidden">
                                            <p className="font-black text-xs uppercase tracking-tight leading-none text-foreground truncate">{link.name}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground mt-1.5 truncate max-w-md">{link.url}</p>
                                        </div>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeLink(i)} className="h-10 w-10 rounded-full text-muted-foreground hover:text-red-600 hover:bg-red-50 shrink-0"><Trash2 size={18} /></Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>

        {/* STICKY FOOTER */}
        <div className="p-10 bg-muted/10 border-t border-primary/5 flex-none flex flex-col sm:flex-row gap-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="flex-1 h-16 rounded-2xl font-black uppercase text-xs tracking-widest">
                CANCEL
              </Button>
            </DialogClose>
            <Button 
              onClick={handleSubmit}
              disabled={loading} 
              className="flex-[2] h-16 rounded-2xl bg-primary text-white font-black uppercase text-sm tracking-[0.3em] shadow-2xl shadow-primary/20 gap-4 transition-all active:scale-95 disabled:grayscale"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-6 w-6" />
                  UPLOADING...
                </>
              ) : (
                <>
                  <Plus className="h-6 w-6" />
                  DEPLOY MODULE
                </>
              )}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
