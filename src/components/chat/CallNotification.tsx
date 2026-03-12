'use client';

import React, { useEffect, useRef } from 'react';
import { CallSession } from '@/utils/storage';
import { Phone, PhoneOff, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CallNotificationProps {
    call: CallSession;
    onAccept: () => void;
    onDecline: () => void;
}

export default function CallNotification({ call, onAccept, onDecline }: CallNotificationProps) {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Try to play ringtone automatically
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play blocked by browser. User interaction required."));
        }
    }, []);

    return (
        <div className="fixed top-6 right-6 z-[100] w-80 bg-[#1e1f22] border-2 border-primary/20 rounded-[2.5rem] p-6 shadow-2xl shadow-black/50 animate-in slide-in-from-right-10 duration-500">
            <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative">
                    <div className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-20" />
                    {call.type === 'video' ? <Video size={28}/> : <Phone size={28}/>}
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Incoming {call.type} call</p>
                    <p className="text-white font-black text-lg truncate leading-none">{call.callerName}</p>
                </div>
            </div>

            <div className="flex gap-3">
                <Button 
                    onClick={onAccept}
                    className="flex-1 h-12 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black uppercase text-[10px] tracking-widest gap-2"
                >
                    <Phone size={14}/> Accept
                </Button>
                <Button 
                    onClick={onDecline}
                    variant="destructive"
                    className="flex-1 h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black uppercase text-[10px] tracking-widest gap-2"
                >
                    <PhoneOff size={14}/> Decline
                </Button>
            </div>
            
            <audio 
                ref={audioRef}
                autoPlay 
                loop 
                src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_78391a5354.mp3?filename=incoming-call-95849.mp3" 
                className="hidden" 
            />
        </div>
    );
}