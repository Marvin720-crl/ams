'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Conversation, ChatMessage } from '@/utils/storage';
import { Hash, Phone, Video, MoreVertical, PlusCircle, Smile, Gift, Send, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatWindowProps {
    conversation: Conversation;
    messages: ChatMessage[];
    onSend: (text: string) => void;
    onCall: (type: 'audio' | 'video') => void;
}

export default function ChatWindow({ conversation, messages, onSend, onCall }: ChatWindowProps) {
    const { user } = useAuth();
    const [inputText, setInputText] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

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
                                    <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input Area - Matches Screenshot perfectly */}
            <div className="p-4 pt-0">
                <div className="bg-[#38333c] rounded-xl px-4 py-3 flex items-center gap-4 border border-white/5 shadow-inner">
                    <button className="text-white/40 hover:text-white transition-colors">
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
                        <button className="hover:text-white transition-colors">
                            <Smile size={24}/>
                        </button>
                        <button className="hover:text-white transition-colors">
                            <Gift size={24}/>
                        </button>
                        <button 
                            onClick={handleSend} 
                            className={`transition-all ${inputText.trim() ? 'text-primary scale-110' : 'text-white/20'}`}
                        >
                            <Send size={24}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
