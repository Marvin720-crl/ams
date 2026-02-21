
'use client';
import React, { useState, useEffect } from 'react';
import { Monitor, Plus, Eye, Building, ArrowLeft, Pencil, User as UserIcon, Mail, GraduationCap, School, ShieldCheck, Calendar, Clock as ClockIcon, Info } from 'lucide-react';
import { getLabsAction, addLabAction, getRoomsAction, addRoomAction, getPcsAction, updateLabAction, getAttendancesAction, getUsersAction, getSubjectsAction, cleanupExpiredSessionsAction } from "@/app/actions/dbActions";
import { Lab, Pc, Room, Attendance, User, Subject } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from '../ui/badge';

type PopulatedSession = Attendance & {
    student?: User;
    subject?: Subject;
    teacher?: User;
};

const SessionHeroCard = ({ session, onBack }: { session: PopulatedSession, onBack: () => void }) => {
    if (!session.student || !session.subject) {
        return (
            <div>
                <Button variant="ghost" onClick={onBack} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4"/> Back to History
                </Button>
                <Card>
                    <CardHeader>
                        <CardTitle>Session Data Missing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Could not load complete details for this session.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    return (
        <div>
            <Button variant="ghost" onClick={onBack} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4"/> Back to PC History
            </Button>
            <div className="aspect-[2/1] w-full bg-[#E30613] relative p-10 flex items-center gap-10 overflow-hidden rounded-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
              
              <div className="relative z-10 w-40 h-40 rounded-[2rem] bg-white/20 border-4 border-white/40 flex items-center justify-center overflow-hidden shadow-2xl rotate-2">
                {session.student.profilePic ? (
                  <img 
                    src={session.student.profilePic} 
                    alt={session.student.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-20 h-20 text-white" />
                )}
              </div>
              <div className="relative z-10 flex-1 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 mb-2">Usage Record</p>
                <h3 className="text-4xl font-black mb-5 leading-tight drop-shadow-lg">{session.student.name}</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-black uppercase tracking-widest">
                  <div className="flex flex-col">
                    <span className="text-white/50 text-[9px]">Student ID</span>
                    <span>{session.student.id}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/50 text-[9px]">Year Level</span>
                    <span>Year {session.student.year}</span>
                  </div>
                  <div className="col-span-2 flex flex-col">
                    <span className="text-white/50 text-[9px]">Program</span>
                    <span>{session.student.program}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg"><School /> Session Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <p><strong>Subject:</strong> {session.subject.name}</p>
                        <p><strong>Teacher:</strong> {session.teacher?.name || 'N/A'}</p>
                        <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {session.timeIn} - {session.timeOut || 'Active'}</p>
                        <p><strong>PC Used:</strong> {session.pcId?.split('-').pop()}</p>
                        <p><strong>Reason:</strong> {session.sessionId?.startsWith('SESS-REQ') ? 'Lab Request' : 'Class Session'}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg"><Info /> System Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <p><strong>Session ID:</strong> {session.sessionId}</p>
                        <p><strong>Attendance ID:</strong> {session.id}</p>
                        <p><strong>PC ID:</strong> {session.pcId}</p>
                        <div><strong>Status:</strong> <Badge>{session.status}</Badge></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};


const PCHistoryView = ({ pc, lab, onBack }: { pc: Pc; lab: Lab; onBack: () => void; }) => {
    const [sessions, setSessions] = useState<PopulatedSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSession, setSelectedSession] = useState<PopulatedSession | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            const [allAttendances, allUsers, allSubjects] = await Promise.all([
                getAttendancesAction(),
                getUsersAction(),
                getSubjectsAction()
            ]);
            
            const pcSessions = allAttendances
                .filter((a: Attendance) => a.pcId === pc.id)
                .sort((a: Attendance, b: Attendance) => new Date(b.date).getTime() - new Date(a.date).getTime());
                
            const populatedSessions = pcSessions.map((sess: Attendance) => {
                const student = allUsers.find((u: User) => u.id === sess.studentId);
                const subject = allSubjects.find((s: Subject) => s.id === sess.subjectId);
                const teacher = allUsers.find((u: User) => u.id === subject?.teacherId);
                return { ...sess, student, subject, teacher };
            });

            setSessions(populatedSessions);
            setLoading(false);
        };
        fetchHistory();
    }, [pc.id]);
    
    if (selectedSession) {
        return <SessionHeroCard session={selectedSession} onBack={() => setSelectedSession(null)} />
    }

    return (
        <div>
            <Button variant="ghost" onClick={onBack} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4"/> Back to {lab.name}
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">PC {pc.pcNumber}</h1>
            <p className="text-muted-foreground">Usage history for this computer unit.</p>
            
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Usage Log</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? <p>Loading history...</p> : (
                        <div className="space-y-4">
                            {sessions.length === 0 && <p className="text-center text-muted-foreground py-8">No usage history for this PC.</p>}
                            {sessions.map(session => (
                                <div key={session.id} onClick={() => setSelectedSession(session)} className="p-4 rounded-lg border flex justify-between items-center cursor-pointer hover:bg-gray-50">
                                    <div>
                                        <p className="font-bold">{session.student?.name || 'Unknown User'}</p>
                                        <p className="text-sm text-muted-foreground">{session.subject?.name || 'Unknown Subject'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{new Date(session.date).toLocaleDateString()}</p>
                                        <p className="text-xs text-muted-foreground">{session.timeIn} - {session.timeOut || 'Now'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};


const LabDetailView = ({ lab, onBack, onSelectPc, onLabUpdated }: { lab: Lab; onBack: () => void; onSelectPc: (pc: Pc) => void; onLabUpdated: () => void; }) => {
    const [pcs, setPcs] = useState<Pc[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [labFormData, setLabFormData] = useState({ name: lab.name, capacity: lab.capacity.toString() });

    useEffect(() => {
        const fetchPcs = async () => {
            setLoading(true);
            const allPcs = await getPcsAction();
            setPcs(allPcs.filter((p: Pc) => p.labId === lab.id).sort((a,b) => parseInt(a.pcNumber) - parseInt(b.pcNumber)));
            setLoading(false);
        };
        fetchPcs();
    }, [lab.id]);

    const handleSaveLab = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateLabAction(lab.id, {
            name: labFormData.name,
            capacity: parseInt(labFormData.capacity)
        });
        toast.success("Lab updated successfully. PC count has been adjusted.");
        setEditDialogOpen(false);
        onLabUpdated();
    };

    return (
        <div>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <Button variant="ghost" onClick={onBack} className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4"/> Back to all labs
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-800">{lab.name}</h1>
                    <p className="text-muted-foreground">Manage PCs for this lab.</p>
                </div>
                <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline"><Pencil className="mr-2 h-4 w-4"/> Edit Lab</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Edit Lab</DialogTitle></DialogHeader>
                        <form onSubmit={handleSaveLab} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="labName">Lab Name</Label>
                                <Input id="labName" value={labFormData.name} onChange={e => setLabFormData({ ...labFormData, name: e.target.value })}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="labCapacity">Capacity (PCs)</Label>
                                <Input id="labCapacity" type="number" value={labFormData.capacity} onChange={e => setLabFormData({ ...labFormData, capacity: e.target.value })}/>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                                <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            
            {loading ? <p>Loading PCs...</p> : (
                <Card>
                    <CardHeader>
                        <CardTitle>PC Units ({pcs.length})</CardTitle>
                        <CardDescription>Status of all registered computer units in {lab.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                        {pcs.map(pc => (
                            <div key={pc.id} onClick={() => onSelectPc(pc)} className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all hover:shadow-md hover:scale-105 ${
                                pc.status === 'available' ? 'border-green-200 bg-green-50' :
                                pc.status === 'occupied' ? 'border-blue-200 bg-blue-50' :
                                'border-orange-200 bg-orange-50'
                            }`}>
                                <Monitor className={`mx-auto mb-2 ${
                                    pc.status === 'available' ? 'text-green-600' :
                                    pc.status === 'occupied' ? 'text-blue-600' :
                                    'text-orange-600'
                                }`} />
                                <p className="font-bold">PC {pc.pcNumber}</p>
                                <Badge variant="secondary" className={`capitalize mt-2 ${
                                    pc.status === 'available' ? 'bg-green-200 text-green-800' :
                                    pc.status === 'occupied' ? 'bg-blue-200 text-blue-800' :
                                    'bg-orange-200 text-orange-800'
                                }`}>{pc.status}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};


export default function LabManagement() {
    const [labs, setLabs] = useState<Lab[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
    const [selectedPc, setSelectedPc] = useState<Pc | null>(null);
    const [loading, setLoading] = useState(true);

    const [isAddLabOpen, setAddLabOpen] = useState(false);
    const [newLabName, setNewLabName] = useState('');
    const [newLabCapacity, setNewLabCapacity] = useState('');
    
    const [isAddRoomOpen, setAddRoomOpen] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomCapacity, setNewRoomCapacity] = useState('');
    
    const [activeTab, setActiveTab] = useState("labs");

    const fetchData = async () => {
        setLoading(true);
        await cleanupExpiredSessionsAction();
        const fetchedLabs = await getLabsAction();
        const fetchedRooms = await getRoomsAction();
        setLabs(fetchedLabs);
        setRooms(fetchedRooms);

        if (selectedLab) {
            const updatedLab = fetchedLabs.find((l: Lab) => l.id === selectedLab.id);
            if (updatedLab) {
                setSelectedLab(updatedLab);
            } else {
                setSelectedLab(null); // Lab was deleted
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddLab = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLabName || !newLabCapacity) {
            toast.error("Please provide lab name and capacity.");
            return;
        }
        await addLabAction({
            id: `LAB-${Date.now()}`,
            name: newLabName,
            capacity: parseInt(newLabCapacity, 10),
        });
        toast.success("Lab and its PCs have been added successfully.");
        setNewLabName('');
        setNewLabCapacity('');
        fetchData();
        setAddLabOpen(false);
    };

    const handleAddRoom = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRoomName || !newRoomCapacity) {
            toast.error("Please provide room name and capacity.");
            return;
        }
        await addRoomAction({
            id: `ROOM-${Date.now()}`,
            name: newRoomName,
            capacity: parseInt(newRoomCapacity, 10),
        });
        toast.success("Room has been added successfully.");
        setNewRoomName('');
        setNewRoomCapacity('');
        fetchData();
        setAddRoomOpen(false);
    };

    if (loading) return <p>Loading facilities...</p>;

    if(selectedPc && selectedLab){
        return <PCHistoryView pc={selectedPc} lab={selectedLab} onBack={() => setSelectedPc(null)} />;
    }

    if (selectedLab) {
        return <LabDetailView lab={selectedLab} onBack={() => setSelectedLab(null)} onSelectPc={setSelectedPc} onLabUpdated={fetchData} />;
    }

  return (
    <div>
        <div className="flex justify-between items-start mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Lab Management</h1>
                <p className="text-muted-foreground">Manage labs and rooms.</p>
            </div>
            {activeTab === 'labs' && (
                <Dialog open={isAddLabOpen} onOpenChange={setAddLabOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                            <Plus className="mr-2 h-4 w-4"/> Add Lab
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New LAB</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddLab} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="labName">LAB Name</Label>
                                <Input id="labName" value={newLabName} onChange={e => setNewLabName(e.target.value)} placeholder="e.g., Computer Lab 1"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="labCapacity">Capacity (PCs)</Label>
                                <Input id="labCapacity" type="number" value={newLabCapacity} onChange={e => setNewLabCapacity(e.target.value)} placeholder="e.g., 30"/>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">Add LAB</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
            {activeTab === 'rooms' && (
                <Dialog open={isAddRoomOpen} onOpenChange={setAddRoomOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                            <Plus className="mr-2 h-4 w-4"/> Add Room
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Room</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddRoom} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="roomName">Room Name</Label>
                                <Input id="roomName" value={newRoomName} onChange={e => setNewRoomName(e.target.value)} placeholder="e.g., Room 101"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="roomCapacity">Capacity (People)</Label>
                                <Input id="roomCapacity" type="number" value={newRoomCapacity} onChange={e => setNewRoomCapacity(e.target.value)} placeholder="e.g., 50"/>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">Add Room</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </div>
      
        <Tabs defaultValue="labs" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="bg-transparent p-0 h-auto mb-6 gap-2">
                <TabsTrigger value="labs" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md">Labs</TabsTrigger>
                <TabsTrigger value="rooms" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md">Rooms</TabsTrigger>
            </TabsList>
            <TabsContent value="labs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {labs.map(lab => (
                        <Card key={lab.id} className="bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-800">
                                    <Monitor className="text-primary"/>
                                    {lab.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">Capacity: {lab.capacity} PCs</p>
                                <Button onClick={() => setSelectedLab(lab)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    <Eye className="mr-2 h-4 w-4"/> View PCs
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                    {labs.length === 0 && <p className="text-muted-foreground col-span-full text-center">No LABs configured yet.</p>}
                </div>
            </TabsContent>
            <TabsContent value="rooms">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map(room => (
                        <Card key={room.id} className="bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-800">
                                    <Building className="text-primary"/>
                                    {room.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">Capacity: {room.capacity} people</p>
                            </CardContent>
                        </Card>
                    ))}
                    {rooms.length === 0 && <p className="text-muted-foreground col-span-full text-center">No rooms configured yet.</p>}
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}

    
