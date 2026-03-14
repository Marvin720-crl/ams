
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Camera,
  Save,
  Loader2,
  QrCode,
  User as UserIcon,
  X,
  School,
  Briefcase
} from 'lucide-react';
import { toast } from 'sonner';
import { updateUserAction } from '@/app/actions/dbActions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { Department } from '@/utils/storage';

export default function ProfileView() {
  const { user, updateCurrentUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'college' as Department,
    program: '',
    year: 1,
    position: '',
    profilePic: '',
    emergencyContactName: '',
    emergencyContactAddress: '',
    emergencyContactPhone: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        department: (user.department as Department) || 'college',
        program: user.program || '',
        year: user.year || 1,
        position: user.position || '',
        profilePic: user.profilePic || '',
        emergencyContactName: user.emergencyContactName || '',
        emergencyContactAddress: user.emergencyContactAddress || '',
        emergencyContactPhone: user.emergencyContactPhone || ''
      });
    }
  }, [user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profilePic: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const updates: any = {
        name: formData.name,
        email: formData.email,
        department: formData.department,
        profilePic: formData.profilePic
      };
      
      if (user.role === 'student') {
        updates.program = formData.program;
        updates.year = formData.year;
        updates.emergencyContactName = formData.emergencyContactName;
        updates.emergencyContactAddress = formData.emergencyContactAddress;
        updates.emergencyContactPhone = formData.emergencyContactPhone;
      } else {
        updates.position = formData.position;
      }

      const updatedUser = await updateUserAction(user.id, updates);
      if (updatedUser) {
        updateCurrentUser(updatedUser);
        toast.success('Profile updated successfully');
      } else {
        toast.error('User not found');
      }
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h2 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">Account Profile</h2>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">Manage your identity and credentials</p>
      </div>

      <Card className="rounded-[3rem] overflow-hidden shadow-2xl border-none">
        {/* Profile Hero section */}
        <div className="bg-primary/5 h-64 flex flex-col items-center justify-center p-8 relative">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2.5rem] bg-primary flex items-center justify-center text-5xl text-white font-black shadow-2xl shadow-primary/30 transition-transform hover:scale-105 overflow-hidden">
              {formData.profilePic ? (
                <img src={formData.profilePic} alt="profile" className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0)
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-xl border-2 border-primary/5 hover:bg-primary hover:text-white transition-colors"
            >
              <Camera size={18} />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
          
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              {formData.name}
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mt-2">
              {user.role.replace('_', ' ')} • {formData.department?.toUpperCase()}
            </p>
          </div>
        </div>

        <CardContent className="p-10 md:p-16 space-y-12">
          <div className="flex justify-center pb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full h-12 px-8 font-black uppercase text-[10px] tracking-widest gap-2 hover:bg-primary hover:text-white transition-all shadow-lg border-primary/10">
                  <QrCode className="h-4 w-4" />
                  Display Digital ID
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
                <div className="bg-white p-10 flex flex-col items-center text-center relative">
                  <DialogClose className="absolute top-6 right-6 h-10 w-10 rounded-full border border-primary/10 flex items-center justify-center hover:bg-muted transition-colors">
                    <X className="h-5 w-5 text-primary" />
                  </DialogClose>
                  
                  <div className="space-y-1 mb-10">
                    <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-foreground">Identity QR Code</DialogTitle>
                    <DialogDescription className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Present for Campus Entry & Services</DialogDescription>
                  </div>

                  <div className="p-10 bg-white rounded-[2.5rem] border-2 border-primary/5 shadow-2xl shadow-primary/5 mb-8">
                    <QRCode 
                      value={user.id} 
                      size={240} 
                      includeMargin 
                      level="H" 
                    />
                  </div>

                  <div className="space-y-1">
                    <p className="font-black text-lg text-primary uppercase tracking-tight">{user.name}</p>
                    <p className="font-bold text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{user.id}</p>
                    <p className="font-black text-[9px] uppercase text-primary/60 mt-1">{formData.department?.toUpperCase()} DEPARTMENT</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-14 rounded-2xl border-primary/10 font-bold px-6" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-14 rounded-2xl border-primary/10 font-bold px-6" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Academic Department</Label>
              <Select value={formData.department} onValueChange={(v: Department) => setFormData({ ...formData, department: v })}>
                <SelectTrigger className="h-14 rounded-2xl border-primary/10 font-bold px-6"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="college" className="font-bold">College</SelectItem>
                  <SelectItem value="shs" className="font-bold">Senior High School</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {user.role === 'student' ? (
              <>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Year / Grade Level</Label>
                  <Select value={String(formData.year)} onValueChange={(v) => setFormData({ ...formData, year: parseInt(v) })}>
                    <SelectTrigger className="h-14 rounded-2xl border-primary/10 font-bold px-6"><SelectValue /></SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      {formData.department === 'shs' ? (
                        <>
                          <SelectItem value="11" className="font-bold">Grade 11</SelectItem>
                          <SelectItem value="12" className="font-bold">Grade 12</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="1" className="font-bold">1st Year</SelectItem>
                          <SelectItem value="2" className="font-bold">2nd Year</SelectItem>
                          <SelectItem value="3" className="font-bold">3rd Year</SelectItem>
                          <SelectItem value="4" className="font-bold">4th Year</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Universal ID Number</Label>
                  <Input value={user.id} disabled className="h-14 rounded-2xl bg-muted/50 border-primary/5 font-bold px-6" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Program / Strand</Label>
                  <Input value={formData.program} onChange={(e) => setFormData({ ...formData, program: e.target.value })} className="h-14 rounded-2xl border-primary/10 font-bold px-6" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Professional Position</Label>
                  <Input value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="h-14 rounded-2xl border-primary/10 font-bold px-6" placeholder="e.g. IT Instructor, Librarian" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Employee ID Number</Label>
                  <Input value={user.id} disabled className="h-14 rounded-2xl bg-muted/50 border-primary/5 font-bold px-6" />
                </div>
              </>
            )}
          </div>

          {user.role === 'student' && (
            <div className="border-t border-primary/5 pt-10 space-y-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary">Emergency Contact</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Contact Person</Label>
                  <Input value={formData.emergencyContactName} onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })} className="h-14 rounded-2xl border-primary/10 font-bold px-6" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Contact Number</Label>
                  <Input value={formData.emergencyContactPhone} onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })} className="h-14 rounded-2xl border-primary/10 font-bold px-6" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Home Address</Label>
                  <Input value={formData.emergencyContactAddress} onChange={(e) => setFormData({ ...formData, emergencyContactAddress: e.target.value })} className="h-14 rounded-2xl border-primary/10 font-bold px-6" />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-10">
            <Button onClick={handleSave} disabled={loading} className="h-14 px-10 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
