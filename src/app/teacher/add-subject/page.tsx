
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Clock, Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { addSubjectAction } from '@/app/actions/dbActions';

export default function AddSubjectPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    time: '08:00 AM',
    day: 'Mon/Wed',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      const newSubject = {
        id: `SUB-${Date.now()}`,
        name: formData.title,
        teacherId: user.id,
        teacherName: user.name,
        day: formData.day,
        time: formData.time,
        description: '',
      };
      
      await addSubjectAction(newSubject);
      toast({ title: "Subject Added", description: `${formData.title} has been recorded in the database.` });
      router.push("/dashboard");
    } catch (error) {
      toast({ variant: "destructive", title: "Failed to save", description: "Could not write to database file." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="hover:bg-primary/5">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-lg border-primary/10 shadow-2xl rounded-3xl overflow-hidden">
          <div className="h-3 bg-primary" />
          <CardHeader className="text-center pt-10">
            <CardTitle className="text-3xl font-black text-primary">New Subject</CardTitle>
            <CardDescription>Enter academic session details</CardDescription>
          </CardHeader>
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-bold"><BookOpen className="h-4 w-4 text-primary" /> Subject Title</Label>
                <Input 
                  placeholder="e.g. Data Structures" 
                  required 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  className="h-12 border-primary/10 font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-bold"><Clock className="h-4 w-4 text-primary" /> Schedule Time</Label>
                  <Input 
                    placeholder="08:00 AM" 
                    required 
                    value={formData.time} 
                    onChange={e => setFormData({...formData, time: e.target.value})} 
                    className="h-12 border-primary/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-bold"><Calendar className="h-4 w-4 text-primary" /> Class Days</Label>
                  <Input 
                    placeholder="Mon/Wed" 
                    required 
                    value={formData.day} 
                    onChange={e => setFormData({...formData, day: e.target.value})} 
                    className="h-12 border-primary/10"
                  />
                </div>
              </div>
              <div className="pt-6">
                <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-black rounded-2xl shadow-xl shadow-primary/20" disabled={loading}>
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Publish Subject"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
