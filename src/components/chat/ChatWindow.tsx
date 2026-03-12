
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Conversation, ChatMessage } from '@/utils/storage';
import { Hash, Phone, Video, MoreVertical, PlusCircle, Smile, Gift, Send, User as UserIcon, FileIcon, Download, Zap, Sparkles, Gem } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ChatWindowProps {
    conversation: Conversation;
    messages: ChatMessage[];
    onSend: (text: string, file?: { name: string, data: string }) => void;
    onCall: (type: 'audio' | 'video') => void;
}

const EMOJIS = ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖'];

export default function ChatWindow({ conversation, messages, onSend, onCall }: ChatWindowProps) {
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
            <div className="h-12 px-4 shadow-sm border-b border-black/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {conversation.type === 'private' ? (
                        <UserIcon className="text-white/40" size={24} />
                    ) : (
                        <Hash className="text-white/40" size={24} />
                    )}
                    <span className="text-white font-black text-sm uppercase tracking-tighter">{conversation.name}</span>
                </div>
                <div className="flex items-center gap-4 text-white/60">
                    <button onClick={() => onCall('audio')} className="hover:text-white transition-colors"><Phone size={20}/></button>
                    <button onClick={() => onCall('video')} className="hover:text-white transition-colors"><Video size={20}/></button>
                    <div className="w-px h-6 bg-white/10" />
                    <button className="hover:text-white transition-colors"><MoreVertical size={20}/></button>
                </div>
            </div>

            {/* Messages Area */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar"
            >
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
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
                        const showAvatar = idx === 0 || messages[idx-1].senderId !== msg.senderId;
                        
                        return (
                            <div key={msg.id} className={`flex items-start gap-4 hover:bg-white/[0.02] -mx-4 px-4 py-1 transition-colors ${showAvatar ? 'mt-4' : ''}`}>
                                {showAvatar ? (
                                    <Avatar className="h-10 w-10 mt-1 shadow-lg">
                                        <AvatarFallback className="bg-primary text-white font-black">{msg.senderName[0]}</AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <div className="w-10 text-[9px] text-white/10 text-right pr-2 leading-8 select-none group-hover:block hidden">
                                        {format(new Date(msg.timestamp), 'HH:mm')}
                                    </div>
                                )}
                                <div className="flex-1 overflow-hidden">
                                    {showAvatar && (
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-white font-black text-sm tracking-tight hover:underline cursor-pointer">{msg.senderName}</span>
                                            <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest">{format(new Date(msg.timestamp), 'MM/dd/yyyy HH:mm')}</span>
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        {msg.text && <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>}
                                        {msg.fileUrl && (
                                            <div className="bg-[#2b2d31] rounded-xl p-4 border border-white/5 inline-flex items-center gap-4 max-w-sm group/file">
                                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                    <FileIcon size={24} />
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="text-white font-bold text-sm truncate">{msg.fileName || 'Attachment'}</p>
                                                    <p className="text-white/30 text-[10px] uppercase font-black tracking-widest">Shared File</p>
                                                </div>
                                                <Button variant="ghost" size="icon" asChild className="rounded-full text-white/40 hover:text-white hover:bg-white/5">
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
                <div className="bg-[#38333c] rounded-xl px-4 py-3 flex items-center gap-4 border border-white/5 shadow-inner">
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
                        className="flex-1 bg-transparent text-white border-none outline-none resize-none font-bold text-sm custom-scrollbar placeholder:text-white/20"
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
                            <PopoverContent className="w-80 bg-[#313338] border-white/5 p-4 rounded-3xl">
                                <div className="grid grid-cols-8 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {EMOJIS.map(emoji => (
                                        <button 
                                            key={emoji} 
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
                            className={`transition-all ${inputText.trim() ? 'text-primary scale-110' : 'text-white/20'}`}
                        >
                            <Send size={24}/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Nitro Perks Dialog */}
            <Dialog open={showNitro} onOpenChange={setShowNitro}>
                <DialogContent className="bg-gradient-to-br from-[#2b2d31] to-[#1e1f22] border-none text-white rounded-[2.5rem] p-10 max-w-lg">
                    <DialogHeader className="text-center">
                        <div className="h-20 w-20 bg-pink-500 rounded-[2rem] mx-auto mb-6 flex items-center justify-center text-white shadow-2xl shadow-pink-500/20 rotate-3">
                            <Zap size={40} fill="currentColor" />
                        </div>
                        <DialogTitle className="text-4xl font-black uppercase tracking-tighter mb-2">Academic Nitro</DialogTitle>
                        <DialogDescription className="text-pink-400 font-black uppercase tracking-widest text-[10px]">
                            Unlock premium portal features
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6 mt-8">
                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center"><Download size={20}/></div>
                            <div className="flex-1">
                                <p className="font-black text-sm uppercase">Bigger File Uploads</p>
                                <p className="text-white/40 text-xs font-bold">Share up to 500MB of notes and study material.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="h-10 w-10 rounded-xl bg-purple-500 flex items-center justify-center"><Video size={20}/></div>
                            <div className="flex-1">
                                <p className="font-black text-sm uppercase">HD Video Streaming</p>
                                <p className="text-white/40 text-xs font-bold">Host virtual classes in crisp 1080p resolution.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="h-10 w-10 rounded-xl bg-orange-500 flex items-center justify-center"><Gem size={20}/></div>
                            <div className="flex-1">
                                <p className="font-black text-sm uppercase">Exclusive Badges</p>
                                <p className="text-white/40 text-xs font-bold">Stand out in subject channels with elite tags.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <Button className="w-full h-14 bg-pink-500 hover:bg-pink-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-pink-500/20">
                            Upgrade Now
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
