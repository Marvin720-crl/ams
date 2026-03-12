
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Conversation, ChatMessage } from '@/utils/storage';
import { Hash, MoreVertical, PlusCircle, Smile, Gift, Send, User as UserIcon, FileIcon, Download, Zap, Gem } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { format, isSameDay } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ChatWindowProps {
    conversation: Conversation;
    messages: ChatMessage[];
    onSend: (text: string, file?: { name: string, data: string }) => void;
}

const EMOJIS = ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖'];

export default function ChatWindow({ conversation, messages, onSend }: ChatWindowProps) {
    const { user } = useAuth();
    const [inputText, setInputText] = useState('');
    const [showNitro, setShowNitro] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        if (inputText.trim()) {
            onSend(inputText);
            setInputText('');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            onSend('', { name: file.name, data: reader.result as string });
        };
        reader.readAsDataURL(file);
    };

    const addEmoji = (emoji: string) => {
        setInputText(prev => prev + emoji);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#313338]">
            {/* Chat Header */}
            <div className="h-12 px-4 shadow-sm border-b border-black/20 flex items-center justify-between bg-[#313338]/95 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    {conversation.type === 'private' ? (
                        <UserIcon className="text-white/40" size={24} />
                    ) : (
                        <Hash className="text-white/40" size={24} />
                    )}
                    <span className="text-white font-black text-sm uppercase tracking-tighter">{conversation.name}</span>
                </div>
                <div className="flex items-center gap-4 text-white/60">
                    <div className="w-px h-6 bg-white/10" />
                    <button className="hover:text-white transition-colors"><MoreVertical size={20}/></button>
                </div>
            </div>

            {/* Messages Area */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar"
            >
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8">
                        <div className="h-20 w-20 rounded-[2.5rem] bg-white/5 flex items-center justify-center text-white/20">
                            {conversation.type === 'private' ? <UserIcon size={40}/> : <Hash size={40}/>}
                        </div>
                        <div>
                            <h3 className="text-white font-black text-2xl tracking-tighter uppercase">Welcome to #{conversation.name}</h3>
                            <p className="text-white/30 font-bold uppercase text-[10px] tracking-widest mt-1">This is the start of the conversation history.</p>
                        </div>
                    </div>
                ) : (
                    messages.map((msg, idx) => {
                        const prevMsg = idx > 0 ? messages[idx - 1] : null;
                        const isCompact = prevMsg && prevMsg.senderId === msg.senderId && isSameDay(new Date(prevMsg.timestamp), new Date(msg.timestamp)) && (new Date(msg.timestamp).getTime() - new Date(prevMsg.timestamp).getTime() < 300000);
                        
                        return (
                            <div key={msg.id} className={`flex items-start gap-4 hover:bg-white/[0.02] -mx-4 px-4 py-0.5 transition-colors group ${!isCompact ? 'mt-4' : ''}`}>
                                {!isCompact ? (
                                    <Avatar className="h-10 w-10 mt-1 shadow-lg shrink-0">
                                        <AvatarFallback className="bg-primary text-white font-black uppercase">{msg.senderName[0]}</AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <div className="w-10 shrink-0 text-[9px] text-white/10 text-right pr-2 leading-tight opacity-0 group-hover:opacity-100 select-none transition-opacity">
                                        {format(new Date(msg.timestamp), 'HH:mm')}
                                    </div>
                                )}
                                <div className="flex-1 overflow-hidden">
                                    {!isCompact && (
                                        <div className="flex items-baseline gap-2 mb-0.5">
                                            <span className="text-white font-black text-sm tracking-tight hover:underline cursor-pointer">{msg.senderName}</span>
                                            <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest">{format(new Date(msg.timestamp), 'MM/dd/yyyy HH:mm')}</span>
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        {msg.text && <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>}
                                        {msg.fileUrl && (
                                            <div className="bg-[#2b2d31] rounded-xl p-4 border border-white/5 inline-flex items-center gap-4 max-w-sm group/file hover:bg-[#35373c] transition-colors mt-2">
                                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                    <FileIcon size={24} />
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="text-white font-bold text-sm truncate">{msg.fileName || 'Attachment'}</p>
                                                    <p className="text-white/30 text-[10px] uppercase font-black tracking-widest">Shared File</p>
                                                </div>
                                                <Button variant="ghost" size="icon" asChild className="rounded-full text-white/40 hover:text-white hover:bg-white/10">
                                                    <a href={msg.fileUrl} download={msg.fileName}>
                                                        <Download size={18} />
                                                    </a>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 pt-0">
                <div className="bg-[#38333c] rounded-xl px-4 py-3 flex items-center gap-4 border border-white/5 shadow-inner transition-all focus-within:ring-1 focus-within:ring-white/10">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                    />
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-white/40 hover:text-white transition-colors"
                    >
                        <PlusCircle size={24}/>
                    </button>
                    <textarea 
                        rows={1}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={`Message #${conversation.name}`}
                        className="flex-1 bg-transparent text-white border-none outline-none resize-none font-bold text-sm custom-scrollbar placeholder:text-white/20 py-1"
                    />
                    <div className="flex items-center gap-3 text-white/40">
                        <button 
                            onClick={() => setShowNitro(true)}
                            className="hover:text-primary transition-colors text-pink-400"
                        >
                            <Gift size={24}/>
                        </button>
                        
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="hover:text-white transition-colors">
                                    <Smile size={24}/>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-[#313338] border-white/5 p-4 rounded-3xl shadow-2xl">
                                <div className="grid grid-cols-8 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {EMOJIS.map((emoji, index) => (
                                        <button 
                                            key={`${emoji}-${index}`} 
                                            onClick={() => addEmoji(emoji)}
                                            className="text-2xl hover:bg-white/5 rounded-lg p-1 transition-colors"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        <button 
                            onClick={handleSend} 
                            disabled={!inputText.trim()}
                            className={`transition-all ${inputText.trim() ? 'text-primary scale-110' : 'text-white/20'}`}
                        >
                            <Send size={24}/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Nitro Perks Dialog */}
            <Dialog open={showNitro} onOpenChange={setShowNitro}>
                <DialogContent className="bg-[#1e1f22] border-none text-white rounded-[2rem] p-10 max-w-[440px] shadow-2xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="h-24 w-24 bg-[#eb459e] rounded-[2.2rem] mb-8 flex items-center justify-center text-white shadow-xl shadow-[#eb459e]/20">
                            <Zap size={48} fill="currentColor" />
                        </div>
                        
                        <DialogTitle className="text-[2.5rem] font-black uppercase tracking-tight leading-none mb-3">
                            ACADEMIC NITRO
                        </DialogTitle>
                        <p className="text-[#eb459e] font-black uppercase tracking-[0.15em] text-[11px] mb-10">
                            UNLOCK PREMIUM PORTAL FEATURES
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-5 bg-[#2b2d31] p-5 rounded-2xl border border-white/[0.03] hover:bg-[#35373c] transition-colors">
                            <div className="h-12 w-12 rounded-xl bg-[#00aff4] flex items-center justify-center shadow-lg"><Download size={24} className="text-white"/></div>
                            <div className="flex-1">
                                <p className="font-black text-[13px] uppercase tracking-wide">BIGGER FILE UPLOADS</p>
                                <p className="text-white/40 text-[11px] font-bold mt-0.5">Share up to 500MB of notes and study material.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 bg-[#2b2d31] p-5 rounded-2xl border border-white/[0.03] hover:bg-[#35373c] transition-colors">
                            <div className="h-12 w-12 rounded-xl bg-[#5865f2] flex items-center justify-center shadow-lg"><FileIcon size={24} className="text-white"/></div>
                            <div className="flex-1">
                                <p className="font-black text-[13px] uppercase tracking-wide">CUSTOM EMOJIS</p>
                                <p className="text-white/40 text-[11px] font-bold mt-0.5">Express yourself with academic-themed stickers.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 bg-[#2b2d31] p-5 rounded-2xl border border-white/[0.03] hover:bg-[#35373c] transition-colors">
                            <div className="h-12 w-12 rounded-xl bg-[#f47b67] flex items-center justify-center shadow-lg"><Gem size={24} className="text-white"/></div>
                            <div className="flex-1">
                                <p className="font-black text-[13px] uppercase tracking-wide">EXCLUSIVE BADGES</p>
                                <p className="text-white/40 text-[11px] font-bold mt-0.5">Stand out in subject channels with elite tags.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <Button className="w-full h-[60px] bg-[#eb459e] hover:bg-[#d83c90] text-white font-black uppercase text-sm tracking-[0.1em] rounded-2xl shadow-xl shadow-[#eb459e]/20 transition-transform active:scale-95">
                            UPGRADE NOW
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
