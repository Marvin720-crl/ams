
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Clock, Calendar, ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { addSubjectAction } from '@/app/actions/dbActions';
import { Schedule } from '@/utils/storage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


export default function AddSubjectPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [schedules, setSchedules] = useState<Partial<Schedule>[]>([{ day: '', startTime: '', dismissalTime: '' }]);


  const handleScheduleChange = (index: number, field: keyof Schedule, value: string) => {
    const newSchedules = [...schedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    setSchedules(newSchedules);
  };

  const addSchedule = () => {
    setSchedules([...schedules, { day: '', startTime: '', dismissalTime: '' }]);
  };

  const removeSchedule = (index: number) => {
    if (schedules.length <= 1) return;
    setSchedules(schedules.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    if (!title || schedules.some(s => !s.day || !s.startTime || !s.dismissalTime)) {
        toast({ variant: "destructive", title: "Missing Fields", description: "Please fill out subject title and all schedule fields." });
        setLoading(false);
        return;
    }

    try {
      const newSubject = {
        id: `SUB-${Date.now()}`,
        name: title,
        teacherId: user.id,
        teacherName: user.name,
        schedules: schedules as Schedule[],
        description: '',
      };
      
      await addSubjectAction(newSubject);
      toast({ title: "Subject Added", description: `${title} has been recorded in the database.` });
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
        <Card className="w-full max-w-2xl border-primary/10 shadow-2xl rounded-3xl overflow-hidden">
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
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  className="h-12 border-primary/10 font-bold"
                />
              </div>

               <div className="space-y-4">
                <Label className="font-bold">Schedules</Label>
                {schedules.map((schedule, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border rounded-xl">
                     <div className="space-y-2">
                      <Label htmlFor={`day-${index}`} className="text-xs">Day</Label>
                       <Select value={schedule.day} onValueChange={(v) => handleScheduleChange(index, 'day', v)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent>
                            {DAYS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                          </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`time-${index}`} className="text-xs">Start Time</Label>
                      <Input 
                        id={`time-${index}`}
                        type="time"
                        value={schedule.startTime} 
                        onChange={e => handleScheduleChange(index, 'startTime', e.target.value)} 
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`dismissal-${index}`} className="text-xs">Dismissal Time</Label>
                      <Input
                        id={`dismissal-${index}`}
                        type="time"
                        value={schedule.dismissalTime}
                        onChange={e => handleScheduleChange(index, 'dismissalTime', e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSchedule(index)} disabled={schedules.length <= 1}>
                        <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  </div>
                ))}
                 <Button type="button" variant="outline" className="w-full" onClick={addSchedule}>
                  <Plus className="h-4 w-4 mr-2"/> Add Schedule
                </Button>
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
