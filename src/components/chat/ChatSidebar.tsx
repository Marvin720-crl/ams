'use client';

import React, { useState } from 'react';
import { Conversation, User } from '@/utils/storage';
import { Hash, Plus, ChevronDown, Search, Volume2, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ChatSidebarProps {
    conversations: Conversation[];
    selectedId?: string;
    onSelect: (conv: Conversation) => void;
    onStartDM: (userId: string) => void;
    users: User[];
}

export default function ChatSidebar({ conversations, selectedId, onSelect, onStartDM, users }: ChatSidebarProps) {
    const { user } = useAuth();
    const [dmSearch, setDmSearch] = useState('');

    const subjectConvs = conversations.filter(c => c.type === 'subject' || c.type === 'general');
    const privateConvs = conversations.filter(c => c.type === 'private');

    // Filter out duplicates and self from search
    const uniqueUsers = Array.from(new Map(users.map(u => [u.id, u])).values());
    const filteredUsers = uniqueUsers.filter(u => 
        u.id !== user?.id && 
        (u.name.toLowerCase().includes(dmSearch.toLowerCase()) || u.id.toLowerCase().includes(dmSearch.toLowerCase()))
    );

    return (
        <div className="w-72 bg-[#2b2d31] flex flex-col border-r border-black/20 shrink-0">
            {/* Server Header */}
            <div className="h-12 px-4 shadow-sm border-b border-black/20 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                <span className="text-white font-black text-sm uppercase tracking-tighter">Academic Hub</span>
                <ChevronDown className="text-white/50 group-hover:text-white transition-colors" size={16} />
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-6 custom-scrollbar">
                {/* Subject Channels */}
                <div>
                    <div className="px-2 mb-1 flex items-center justify-between text-white/40 hover:text-white/70 transition-colors uppercase font-black text-[10px] tracking-widest">
                        <div className="flex items-center gap-1"><ChevronDown size={12}/> SUBJECT CHANNELS</div>
                        <Plus size={14} className="cursor-pointer" />
                    </div>
                    <div className="space-y-0.5 px-2">
                        {subjectConvs.map(conv => (
                            <button
                                key={conv.id}
                                onClick={() => onSelect(conv)}
                                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md group transition-all ${
                                    selectedId === conv.id ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                                }`}
                            >
                                <Hash size={20} className="text-white/20 group-hover:text-white/40" />
                                <span className="text-sm font-bold truncate tracking-tight">{conv.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Direct Messages */}
                <div>
                    <div className="px-2 mb-1 flex items-center justify-between text-white/40 hover:text-white/70 transition-colors uppercase font-black text-[10px] tracking-widest">
                        <div className="flex items-center gap-1"><ChevronDown size={12}/> DIRECT MESSAGES</div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Plus size={14} className="cursor-pointer hover:scale-110 transition-transform" />
                            </DialogTrigger>
                            <DialogContent className="bg-[#313338] border-none text-white rounded-3xl p-6">
                                <DialogHeader>
                                    <DialogTitle className="font-black uppercase tracking-tighter text-2xl mb-4">Start a Conversation</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                        <Input 
                                            placeholder="Search by name or ID..." 
                                            className="bg-black/20 border-none pl-10 h-12 rounded-xl text-white font-bold"
                                            value={dmSearch}
                                            onChange={(e) => setDmSearch(e.target.value)}
                                        />
                                    </div>
                                    <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                        {filteredUsers.map(u => (
                                            <button
                                                key={`dm-search-${u.id}`}
                                                onClick={() => {
                                                    onStartDM(u.id);
                                                    setDmSearch('');
                                                }}
                                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                            >
                                                <Avatar className="h-10 w-10 border-2 border-white/5">
                                                    <AvatarImage src={u.profilePic} />
                                                    <AvatarFallback className="bg-primary text-white font-black">{u.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="text-left">
                                                    <p className="font-black text-sm group-hover:text-primary transition-colors">{u.name}</p>
                                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{u.role} • {u.id}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="space-y-0.5 px-2">
                        {privateConvs.map(conv => {
                            const otherId = conv.memberIds.find(id => id !== user?.id);
                            const otherUser = users.find(u => u.id === otherId);
                            return (
                                <button
                                    key={conv.id}
                                    onClick={() => onSelect(conv)}
                                    className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md group transition-all ${
                                        selectedId === conv.id ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                                    }`}
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={otherUser?.profilePic} />
                                        <AvatarFallback className="bg-white/10 text-white/50 text-[10px] font-black">{otherUser?.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 text-left overflow-hidden">
                                        <p className="text-sm font-bold truncate leading-tight">{otherUser?.name || conv.name}</p>
                                        <p className="text-[9px] font-black opacity-30 truncate uppercase tracking-tighter">
                                            {conv.lastMessage || "Start chatting..."}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom User Area */}
            <div className="bg-[#232428] p-2 h-14 flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 p-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
                    <div className="relative">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.profilePic} />
                            <AvatarFallback className="bg-primary text-white font-black text-xs">{user?.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-600 rounded-full border-2 border-[#232428] flex items-center justify-center text-[8px] font-bold text-white">1</div>
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-black text-white truncate leading-none mb-0.5">{user?.name || 'User'}</p>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none truncate">{user?.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-2">
                    <button className="text-white/60 hover:text-white transition-colors">
                        <Volume2 size={18}/>
                    </button>
                    <button className="text-white/60 hover:text-white transition-colors">
                        <Settings size={18}/>
                    </button>
                </div>
            </div>
        </div>
    );
}