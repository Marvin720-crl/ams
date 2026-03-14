
'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getUsersAction, addAuditLogAction } from '@/app/actions/dbActions';
import { ArrowRight, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id.toLowerCase() === 'admin' && password === 'ADMIN@2026') {
        const adminUser = {
          id: 'admin',
          name: 'System Administrator',
          email: 'admin@school.edu',
          password: 'ADMIN@2026',
          role: 'admin' as const,
          isApproved: true
        };
        login(adminUser);
        await addAuditLogAction({ userId: adminUser.id, userName: adminUser.name, action: 'login', details: 'Admin user logged in' });
        localStorage.setItem('currentUserId', 'admin');
        toast.success(`Welcome back, Admin!`);
        setLoading(false);
        return;
      }

      const users = await getUsersAction();
      const user = users.find(u => u.id === id && u.password === password);
      
      if (user) {
        // Security Check: Approval
        if (user.role === 'student' && user.isApproved === false) {
          toast.error('ACCESS DENIED', {
            description: 'Your account is pending admin approval. Please contact the registrar.',
            icon: <Lock className="h-4 w-4" />
          });
          setLoading(false);
          return;
        }

        login(user);
        await addAuditLogAction({ userId: user.id, userName: user.name, action: 'login', details: `User ${user.name} logged in.` });
        localStorage.setItem('currentUserId', user.id);
        toast.success(`Welcome back, ${user.name}!`);
      } else {
        toast.error('Invalid ID or password');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <header className="bg-primary shadow-md">
        <div className="container mx-auto px-6 py-4">
          <Image src="/logo.png" alt="AMA Student Portal" width={150} height={40} />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          <div className="w-full md:w-2/5 bg-primary text-white p-12 flex flex-col justify-center items-start">
            <h1 className="text-4xl font-bold mb-4 uppercase">WELCOME TO STUDENT PORTAL</h1>
            <p className="text-white/80 leading-relaxed italic">
              "A wise man will hear, and will increase learning; and a man of understanding shall attain unto wise counsels."
            </p>
          </div>

          <div className="w-full md:w-3/5 p-12">
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-muted-foreground mb-8">Please sign in to continue</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="id">Universal ID (USN/EMP)</Label>
                <Input
                  id="id"
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                  className="h-14 rounded-xl font-bold text-lg px-6"
                  placeholder="ID Number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 rounded-xl px-6"
                  placeholder="••••••••"
                />
                <div className="text-right pt-1">
                  <Link href="/forgot-password" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-14 text-sm font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 rounded-2xl gap-2 transition-all active:scale-95" 
                disabled={loading}
              >
                {loading ? 'AUTHENTICATING...' : 'Sign In'}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-black text-primary hover:underline uppercase tracking-widest ml-1">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
