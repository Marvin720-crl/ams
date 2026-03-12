
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Conversation } from '@/utils/storage';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Maximize2, Users, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CallOverlayProps {
    type: 'audio' | 'video';
    conversation: Conversation;
    onEnd: () => void;
}

export default function CallOverlay({ type, conversation, onEnd }: CallOverlayProps) {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(type === 'audio');
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [isConnecting, setIsConnecting] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsConnecting(false), 2000);
        
        if (type === 'video') {
            getCameraPermission();
        }

        return () => {
            clearTimeout(timer);
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const getCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setHasCameraPermission(true);
            setIsVideoOff(false);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            setIsVideoOff(true);
            toast.error("Camera access denied");
        }
    };

    const toggleVideo = async () => {
        if (isVideoOff && !hasCameraPermission) {
            await getCameraPermission();
        } else {
            setIsVideoOff(!isVideoOff);
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => {
                    if (track.kind === 'video') track.enabled = isVideoOff;
                });
            }
        }
    };

    return (
        <div className="absolute inset-0 z-50 bg-[#1e1f22] flex flex-col items-center justify-between p-10 animate-in fade-in zoom-in duration-300">
            {/* Call Header */}
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20">
                        <Users size={24} />
                    </div>
                    <div>
                        <h2 className="text-white font-black uppercase tracking-tighter text-xl">{conversation.name}</h2>
                        <p className="text-white/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            {isConnecting ? (
                                <><Loader2 size={10} className="animate-spin"/> Initializing Connection...</>
                            ) : (
                                "Secure End-to-End Call"
                            )}
                        </p>
                    </div>
                </div>
                <button className="text-white/20 hover:text-white transition-colors"><Maximize2 size={24}/></button>
            </div>

            {/* Video Grid Area */}
            <div className="flex-1 w-full max-w-5xl my-10 grid gap-6 relative">
                <div className="bg-black/20 rounded-[3rem] border-4 border-white/5 overflow-hidden flex items-center justify-center relative">
                    <video 
                        ref={videoRef} 
                        className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`} 
                        autoPlay 
                        muted 
                    />
                    {isVideoOff && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                            <div className="h-32 w-32 rounded-[3.5rem] bg-primary/10 border-4 border-primary/20 flex items-center justify-center text-primary shadow-2xl">
                                <span className="text-5xl font-black">{conversation.name[0]}</span>
                            </div>
                            <p className="text-white/20 font-black uppercase tracking-[0.3em] text-xs">Video Feed Disabled</p>
                        </div>
                    )}
                    
                    {/* Peer Mock UI */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white font-black text-[10px] uppercase tracking-widest border border-white/10">
                            {conversation.name} (Waiting for others...)
                        </div>
                    </div>
                </div>
            </div>

            {/* Call Controls */}
            <div className="flex items-center gap-6 bg-black/40 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
                <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${
                        isMuted ? 'bg-red-500 text-white shadow-red-500/20 shadow-xl' : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                >
                    {isMuted ? <MicOff size={24}/> : <Mic size={24}/>}
                </button>
                <button 
                    onClick={toggleVideo}
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${
                        isVideoOff ? 'bg-red-500 text-white shadow-red-500/20 shadow-xl' : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                >
                    {isVideoOff ? <VideoOff size={24}/> : <Video size={24}/>}
                </button>
                <button 
                    onClick={onEnd}
                    className="h-16 w-20 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-xl shadow-red-600/30 active:scale-95"
                >
                    <PhoneOff size={32}/>
                </button>
            </div>
        </div>
    );
}
