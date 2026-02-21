'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { addUserAction, getUsersAction, getSettingsAction } from '@/app/actions/dbActions';
import Link from 'next/link';
import Image from 'next/image';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    role: 'student' as 'student' | 'teacher',
    program: '',
    year: 1,
    teacherSecret: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = await getUsersAction();
      if (users.some(u => u.id === formData.id)) {
        toast.error('User with this ID already exists.');
        setLoading(false);
        return;
      }

      if (formData.role === 'teacher') {
        const settings = await getSettingsAction();
        if (formData.teacherSecret !== settings.teacherSecret) {
          toast.error('Invalid teacher secret code.');
          setLoading(false);
          return;
        }
      }

      const newUser = {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        program: formData.role === 'student' ? formData.program : undefined,
        year: formData.role === 'student' ? formData.year : undefined,
        profilePic: '',
      };

      await addUserAction(newUser);
      toast.success('Registration successful! Please log in.');
      router.push('/');

    } catch (error) {
      toast.error('An error occurred during registration.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <header className="bg-primary shadow-md">
        <div className="container mx-auto px-6 py-4">
          <Link href="/">
            <Image src="/logo.png" alt="AMA Student Portal" width={150} height={40} />
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          <div className="w-full md:w-2/5 bg-primary text-white p-12 flex flex-col justify-center items-start">
            <h1 className="text-4xl font-bold mb-4">CREATE ACCOUNT</h1>
            <p className="text-white/80 leading-relaxed">
              Join our community and get access to all the portal features.
            </p>
          </div>

          <div className="w-full md:w-3/5 p-12 overflow-y-auto" style={{maxHeight: '80vh'}}>
            <h2 className="text-2xl font-bold mb-2">Registration</h2>
            <p className="text-muted-foreground mb-8">Please fill in the details to sign up</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Select value={formData.role} onValueChange={(value: 'student' | 'teacher') => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="h-12 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">{formData.role === 'student' ? 'USN' : 'EMP ID'}</Label>
                <Input id="id" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} required className="h-12 rounded-lg" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="h-12 rounded-lg" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="h-12 rounded-lg" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required className="h-12 rounded-lg" />
              </div>

              {formData.role === 'student' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program">Program</Label>
                    <Input id="program" value={formData.program} onChange={e => setFormData({...formData, program: e.target.value})} placeholder="e.g. BSCS" required className="h-12 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year Level</Label>
                    <Select value={String(formData.year)} onValueChange={v => setFormData({...formData, year: Number(v)})}>
                      <SelectTrigger className="h-12 rounded-lg">
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
                </div>
              )}

              {formData.role === 'teacher' && (
                <div className="space-y-2">
                  <Label htmlFor="teacherSecret">Teacher Secret Code</Label>
                  <Input id="teacherSecret" type="password" value={formData.teacherSecret} onChange={e => setFormData({...formData, teacherSecret: e.target.value})} required className="h-12 rounded-lg" />
                </div>
              )}

              <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-lg gap-2" disabled={loading}>
                {loading ? 'Registering...' : 'Sign Up'}
                <UserPlus className="w-5 h-5" />
              </Button>
            </form>
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/" className="font-bold text-primary hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
