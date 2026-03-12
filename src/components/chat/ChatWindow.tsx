'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Conversation, ChatMessage } from '@/utils/storage';
import { Hash, MoreVertical, PlusCircle, Smile, Gift, Send, User as UserIcon, FileIcon, Download, Zap, Gem } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
        <div className="flex-1 flex flex-col h-full bg-[#1e1f22]">
            {/* Chat Header */}
            <div className="h-16 px-6 shadow-sm border-b border-white/5 flex items-center justify-between bg-[#1e1f22]/95 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {conversation.type === 'private' ? (
                            <UserIcon size={20} />
                        ) : (
                            <Hash size={20} />
                        )}
                    </div>
                    <div>
                        <span className="text-white font-black text-sm uppercase tracking-tighter block">{conversation.name}</span>
                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active Now</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-white/40">
                    <button className="hover:text-white transition-colors"><MoreVertical size={20}/></button>
                </div>
            </div>

            {/* Messages Area - Messenger Style */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8">
                        <div className="h-20 w-20 rounded-[2.5rem] bg-white/5 flex items-center justify-center text-white/20">
                            {conversation.type === 'private' ? <UserIcon size={40}/> : <Hash size={40}/>}
                        </div>
                        <div>
                            <h3 className="text-white font-black text-2xl tracking-tighter uppercase">No Messages Yet</h3>
                            <p className="text-white/30 font-bold uppercase text-[10px] tracking-widest mt-1">Start the conversation with #{conversation.name}</p>
                        </div>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isMe = msg.senderId === user?.id;
                        
                        return (
                            <div 
                                key={msg.id} 
                                className={cn(
                                    "flex items-end gap-3",
                                    isMe ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                {/* Avatar - Only show for others */}
                                {!isMe && (
                                    <Avatar className="h-8 w-8 shrink-0 mb-1 border-2 border-white/5">
                                        <AvatarFallback className="bg-primary text-white font-black uppercase text-[10px]">{msg.senderName[0]}</AvatarFallback>
                                    </Avatar>
                                )}

                                <div className={cn(
                                    "flex flex-col max-w-[75%] space-y-1",
                                    isMe ? "items-end" : "items-start"
                                )}>
                                    {/* Sender Name - Optional for Messenger but added for clarity in group chats */}
                                    {!isMe && (
                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">
                                            {msg.senderName}
                                        </span>
                                    )}

                                    {/* Message Bubble */}
                                    <div className={cn(
                                        "px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap transition-all shadow-lg",
                                        isMe 
                                            ? "bg-primary text-white rounded-br-none" 
                                            : "bg-[#2b2d31] text-white/90 rounded-bl-none border border-white/5"
                                    )}>
                                        {msg.text}

                                        {msg.fileUrl && (
                                            <div className={cn(
                                                "rounded-xl p-3 border inline-flex items-center gap-3 mt-2 w-full",
                                                isMe ? "bg-white/10 border-white/10" : "bg-black/20 border-white/5"
                                            )}>
                                                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                                    <FileIcon size={20} />
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="text-white font-bold text-[11px] truncate">{msg.fileName || 'Shared File'}</p>
                                                    <p className="text-white/30 text-[8px] uppercase font-black tracking-widest">Download</p>
                                                </div>
                                                <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full text-white/40 hover:text-white hover:bg-white/10">
                                                    <a href={msg.fileUrl} download={msg.fileName}>
                                                        <Download size={14} />
                                                    </a>
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Timestamp */}
                                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">
                                        {format(new Date(msg.timestamp), 'h:mm a')}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input Area - Messenger Style */}
            <div className="p-6 bg-[#1e1f22]">
                <div className="bg-[#2b2d31] rounded-[1.5rem] px-4 py-2 flex items-center gap-3 border border-white/5 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                    />
                    
                    <div className="flex items-center gap-1">
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="h-10 w-10 rounded-full flex items-center justify-center text-white/40 hover:text-primary hover:bg-primary/5 transition-all"
                        >
                            <PlusCircle size={22}/>
                        </button>
                        <button 
                            onClick={() => setShowNitro(true)}
                            className="h-10 w-10 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-400/5 transition-all"
                        >
                            <Gift size={22}/>
                        </button>
                    </div>

                    <textarea 
                        rows={1}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Aa"
                        className="flex-1 bg-transparent text-white border-none outline-none resize-none font-medium text-sm custom-scrollbar placeholder:text-white/20 py-2.5"
                    />

                    <div className="flex items-center gap-1">
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="h-10 w-10 rounded-full flex items-center justify-center text-white/40 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all">
                                    <Smile size={22}/>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-[#2b2d31] border-white/5 p-4 rounded-[2rem] shadow-2xl mr-4 mb-4">
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
                            className={cn(
                                "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                                inputText.trim() ? "text-primary scale-110" : "text-white/10"
                            )}
                        >
                            <Send size={22}/>
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