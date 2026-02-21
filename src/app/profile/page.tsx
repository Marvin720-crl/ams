'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Camera, Save, User as UserIcon, Loader2, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { updateUserAction } from '@/app/actions/dbActions';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';

export default function ProfilePage() {
  const { user, updateCurrentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: '',
    year: 1,
    profilePic: ''
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        program: user.program || '',
        year: user.year || 1,
        profilePic: user.profilePic || ''
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
      const updates = {
        name: formData.name,
        email: formData.email,
        ...(user.role === 'student' && {
          program: formData.program,
          year: formData.year
        }),
        profilePic: formData.profilePic
      };

      const updatedUser = await updateUserAction(user.id, updates);

      if (updatedUser) {
        updateCurrentUser(updatedUser);
        toast.success('Profile updated successfully!');
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
    <div className="min-h-screen bg-rose-50 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild>
            <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Link>
            </Button>
        </div>

      <Card className="max-w-4xl mx-auto rounded-3xl shadow-xl border-0 relative bg-rose-50 mt-4">
        {/* RED HEADER */}
        <div className="bg-red-600 h-28 rounded-t-3xl" />

        {/* NAME and QR Code */}
        <div className="absolute top-28 left-0 right-0 flex justify-center items-center transform -translate-y-1/2 z-10 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg text-center">
                {formData.name}
            </h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-2 text-white rounded-full hover:bg-white/20">
                        <QrCode className="w-7 h-7" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>My Digital ID</DialogTitle>
                        <DialogDescription>
                            Present this code for scanning. This contains your unique ID for attendance and other services.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-4 bg-white rounded-lg mt-4">
                        {user && <QRCodeSVG value={user.id} size={256} includeMargin={true} />}
                    </div>
                </DialogContent>
            </Dialog>
        </div>

        {/* PROFILE IMAGE */}
        <div className="absolute top-8 left-10 z-20">
            <div className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg flex items-center justify-center">
                {formData.profilePic ? (
                <img
                    src={formData.profilePic}
                    alt="profile"
                    className="w-full h-full object-cover"
                />
                ) : (
                <UserIcon className="w-24 h-24 text-gray-400" />
                )}
            </div>

            <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow hover:bg-red-700"
            >
                <Camera size={20} />
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />
            </div>
        </div>

        <CardContent className="pt-28 pb-10 px-10">
          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Full Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="rounded-full bg-rose-100 border-rose-200"
              />
            </div>

            <div>
              <Label>Program</Label>
              <Input
                value={formData.program}
                disabled={user.role !== 'student'}
                onChange={(e) =>
                  setFormData({ ...formData, program: e.target.value })
                }
                className="rounded-full bg-rose-100 border-rose-200"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="rounded-full bg-rose-100 border-rose-200"
              />
            </div>

            <div>
              <Label>Year Level</Label>
              <Select
                value={String(formData.year)}
                disabled={user.role !== 'student'}
                onValueChange={(v) =>
                  setFormData({ ...formData, year: parseInt(v) })
                }
              >
                <SelectTrigger className="rounded-full bg-rose-100 border-rose-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>ID Number</Label>
              <Input value={user.id} disabled className="rounded-full bg-rose-100 border-rose-200" />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-10">
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>

            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
