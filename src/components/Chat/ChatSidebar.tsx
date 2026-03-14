'use client';

import React, { useState, useMemo } from 'react';
import { Conversation, User } from '@/utils/storage';
import {
  Hash,
  Plus,
  ChevronDown,
  Search,
  Volume2,
  Settings,
  X
} from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';

import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conv: Conversation) => void;
  onStartDM: (userId: string) => void;
  users: User[];
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ChatSidebar({
  conversations,
  selectedId,
  onSelect,
  onStartDM,
  users,
  isOpen,
  onClose
}: ChatSidebarProps) {

  const { user } = useAuth();

  const [dmSearch, setDmSearch] = useState('');

  const subjectConvs = useMemo(
    () => conversations.filter(
      c => c.type === 'subject' || c.type === 'general'
    ),
    [conversations]
  );

  const privateConvs = useMemo(
    () => conversations.filter(c => c.type === 'private'),
    [conversations]
  );

  const uniqueUsers = useMemo(() => {
    return Array.from(
      new Map(users.map(u => [u.id, u])).values()
    );
  }, [users]);

  const filteredUsers = useMemo(() => {
    return uniqueUsers.filter(u =>
      u.id !== user?.id &&
      (
        u.name.toLowerCase().includes(dmSearch.toLowerCase()) ||
        u.id.toLowerCase().includes(dmSearch.toLowerCase())
      )
    );
  }, [dmSearch, uniqueUsers, user]);

  return (
    <div className={cn(
      "w-72 bg-[#2b2d31] flex flex-col border-r border-black/20 shrink-0 transition-all duration-300 ease-in-out",
      "fixed inset-y-0 left-0 z-[70] md:relative md:translate-x-0 md:w-72",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* SERVER HEADER */}
      <div className="h-16 px-4 border-b border-black/20 flex items-center justify-between hover:bg-white/5 transition cursor-pointer group">
        <span className="text-white font-black text-sm uppercase tracking-tight">Academic Hub</span>
        <button onClick={onClose} className="md:hidden text-white/50 hover:text-white">
          <X size={20}/>
        </button>
        <ChevronDown size={16} className="hidden md:block text-white/50 group-hover:text-white" />
      </div>

      {/* CHANNEL LIST */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6 no-scrollbar">
        {/* SUBJECT CHANNELS */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between text-white/40 uppercase font-black text-[10px] tracking-widest">
            <div className="flex items-center gap-1">
              <ChevronDown size={12}/>
              SUBJECT CHANNELS
            </div>
            <Plus size={14} className="cursor-pointer hover:text-white" />
          </div>
          <div className="space-y-1 px-2">
            {subjectConvs.map(conv => (
              <button
                key={conv.id}
                onClick={() => onSelect(conv)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition ${
                    selectedId === conv.id ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <Hash size={18}/>
                <span className="text-sm font-bold truncate">{conv.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* DIRECT MESSAGES */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between text-white/40 uppercase font-black text-[10px] tracking-widest">
            <div className="flex items-center gap-1">
              <ChevronDown size={12}/>
              DIRECT MESSAGES
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Plus size={14} className="cursor-pointer hover:text-white transition" />
              </DialogTrigger>
              <DialogContent className="bg-[#313338] border-none text-white rounded-2xl p-6">
                <DialogHeader><DialogTitle className="font-black text-xl">Start a Conversation</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                    <Input placeholder="Search name or ID..." className="bg-black/20 border-none pl-9 h-10 text-white" value={dmSearch} onChange={(e)=>setDmSearch(e.target.value)} />
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1 no-scrollbar">
                    {filteredUsers.map(u => (
                      <button key={u.id} onClick={() => { onStartDM(u.id); setDmSearch(''); }} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={u.profilePic}/>
                          <AvatarFallback>{u.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="text-sm font-bold">{u.name}</p>
                          <p className="text-[10px] text-white/40 uppercase">{u.role} • {u.id}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-1 px-2">
            {privateConvs.map(conv => {
              const otherId = conv.memberIds.find(id => id !== user?.id);
              const otherUser = users.find(u => u.id === otherId);
              return (
                <button
                  key={conv.id}
                  onClick={() => onSelect(conv)}
                  className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md transition ${
                      selectedId === conv.id ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={otherUser?.profilePic}/>
                    <AvatarFallback>{otherUser?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-sm font-bold truncate">{otherUser?.name || conv.name}</p>
                    <p className="text-[10px] text-white/40 truncate leading-none">{conv.lastMessage || "Start chatting"}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* USER FOOTER */}
      <div className="bg-[#232428] p-2 h-14 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 p-1 hover:bg-white/5 rounded-lg">
          <div className="relative">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.profilePic}/>
              <AvatarFallback className="bg-primary text-white font-black text-xs">{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-600 rounded-full border-2 border-[#232428] flex items-center justify-center text-[8px] font-bold text-white">1</div>
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-black text-white truncate leading-none mb-0.5">{user?.name || 'User'}</p>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none truncate">{user?.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Volume2 size={18} className="text-white/60 hover:text-white cursor-pointer"/>
          <Settings size={18} className="text-white/60 hover:text-white cursor-pointer"/>
        </div>
      </div>
    </div>
  );
}
