'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Unlock, Search, Loader2, UserX, AlertTriangle } from 'lucide-react';
import { getUsersAction, unbanUserAction } from '@/app/actions/dbActions';
import { User } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

export default function SecurityCenter() {
    const { user: admin } = useAuth();
    const [bannedUsers, setBannedUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadBannedUsers();
    }, []);

    const loadBannedUsers = async () => {
        setLoading(true);
        try {
            const allUsers = await getUsersAction();
            setBannedUsers(allUsers.filter(u => u.isBanned));
        } catch (e) {
            toast.error("Failed to load security registry.");
        } finally {
            setLoading(false);
        }
    };

    const handleUnban = async (userId: string) => {
        if (!admin) return;
        try {
            await unbanUserAction(admin.id, userId);
            toast.success("Security clearance restored for user.");
            loadBannedUsers();
        } catch (e) {
            toast.error("Unban protocol failed.");
        }
    };

    const filtered = bannedUsers.filter(u => 
        u.name.toLowerCase().includes(search.toLowerCase()) || 
        u.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div>
                <h1 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">Security Center</h1>
                <p className="text-muted-foreground font-bold text-[10px] tracking-[0.2em] mt-2 uppercase">Iron Wall Registry & Access Control</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <Card className="lg:col-span-1 rounded-[2.5rem] bg-primary text-white border-none shadow-xl h-fit overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ShieldAlert size={120} />
                    </div>
                    <CardHeader className="relative z-10 p-8">
                        <ShieldAlert className="h-12 w-12 mb-4 text-white" />
                        <CardTitle className="text-2xl font-black uppercase tracking-tight">Active Bans</CardTitle>
                        <CardDescription className="text-white/60 font-bold uppercase text-[10px] tracking-widest mt-1">Compromised Accounts</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10 p-8 pt-0">
                        <p className="text-7xl font-black tracking-tighter">{bannedUsers.length}</p>
                    </CardContent>
                </Card>

                <div className="lg:col-span-3 space-y-8">
                    <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors">
                            <Search size={24} />
                        </div>
                        <Input 
                            placeholder="Search banned USN/EMP or Name..." 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="h-20 pl-16 pr-8 rounded-[1.5rem] border-primary/5 bg-white shadow-xl font-bold text-lg uppercase tracking-tight focus:ring-0 focus:border-primary transition-all"
                        />
                    </div>

                    <Card className="rounded-[3rem] border-primary/5 shadow-2xl overflow-hidden bg-white">
                        <CardHeader className="bg-primary/5 p-10 border-b border-primary/5">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <AlertTriangle size={20} />
                                </div>
                                <CardTitle className="text-xl font-black uppercase tracking-tight">Blacklist Registry</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {loading ? (
                                <div className="p-32 text-center">
                                    <Loader2 className="animate-spin h-12 w-12 mx-auto text-primary" />
                                    <p className="mt-4 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Accessing Encrypted Data...</p>
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="p-32 text-center space-y-6">
                                    <div className="h-24 w-24 bg-muted/50 rounded-[2.5rem] flex items-center justify-center mx-auto text-muted-foreground/20">
                                        <UserX size={48} />
                                    </div>
                                    <div>
                                        <p className="font-black text-muted-foreground uppercase text-sm tracking-widest">No active threats detected.</p>
                                        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase mt-2">All users are currently in compliance with Iron Wall Protocol.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="divide-y divide-primary/5">
                                    {filtered.map(user => (
                                        <div key={user.id} className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-muted/10 transition-all group">
                                            <div className="space-y-4 flex-1">
                                                <div className="space-y-1">
                                                    <p className="font-black text-2xl text-primary uppercase tracking-tighter leading-none group-hover:scale-[1.01] transition-transform origin-left">{user.name}</p>
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">{user.role.replace('_', ' ')} • ID: {user.id}</p>
                                                </div>
                                                <div className="p-6 bg-destructive/5 rounded-[1.5rem] border-2 border-destructive/10 relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-2 opacity-5">
                                                        <ShieldAlert size={48} className="text-destructive" />
                                                    </div>
                                                    <p className="text-[9px] font-black uppercase text-destructive tracking-[0.2em] mb-2">Protocol Violation Logic</p>
                                                    <p className="text-sm font-bold text-destructive/80 italic leading-relaxed">"{user.banReason || 'CRITICAL_SECURITY_BREACH: UNKNOWN_PAYLOAD_DETECTION'}"</p>
                                                </div>
                                            </div>
                                            <Button 
                                                onClick={() => handleUnban(user.id)}
                                                className="h-16 px-10 rounded-2xl bg-white border-2 border-primary/10 text-primary hover:bg-primary hover:text-white font-black uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95 gap-3 shrink-0"
                                            >
                                                <Unlock size={20} />
                                                Restore Access
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
