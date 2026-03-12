'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Conversation } from '@/utils/storage';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Maximize2, Users, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CallOverlayProps {
    type: 'audio' | 'video';
    conversation: Conversation;
    isCaller?: boolean;
    onEnd: () => void;
}

export default function CallOverlay({ type, conversation, isCaller = false, onEnd }: CallOverlayProps) {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(type === 'audio');
    const [isConnecting, setIsConnecting] = useState(true);
    
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const signalingChannel = useRef<BroadcastChannel | null>(null);
    const localStream = useRef<MediaStream | null>(null);

    useEffect(() => {
        // 1. Initialize Signaling Channel
        signalingChannel.current = new BroadcastChannel(`signaling_${conversation.id}`);
        
        // 2. Setup WebRTC & Media
        const initCall = async () => {
            try {
                // Request Media
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: type === 'video', 
                    audio: true 
                });
                
                localStream.current = stream;
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                // Create Peer Connection
                const pc = new RTCPeerConnection({
                    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
                });
                peerConnection.current = pc;

                // Add tracks to connection
                stream.getTracks().forEach(track => pc.addTrack(track, stream));

                // Listen for remote tracks
                pc.ontrack = (event) => {
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = event.streams[0];
                        setIsConnecting(false);
                    }
                };

                // ICE Candidate handling
                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        signalingChannel.current?.postMessage({ type: 'candidate', candidate: event.candidate });
                    }
                };

                // Signaling Logic
                signalingChannel.current!.onmessage = async (msg) => {
                    const data = msg.data;
                    if (data.type === 'offer') {
                        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
                        const answer = await pc.createAnswer();
                        await pc.setLocalDescription(answer);
                        signalingChannel.current?.postMessage({ type: 'answer', answer });
                    } else if (data.type === 'answer') {
                        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
                    } else if (data.type === 'candidate') {
                        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
                    } else if (data.type === 'end') {
                        onEnd();
                    }
                };

                // If I'm the caller, initiate offer
                if (isCaller) {
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    signalingChannel.current?.postMessage({ type: 'offer', offer });
                }

            } catch (err) {
                console.error("Media Error:", err);
                toast.error("Could not access camera/microphone");
                onEnd();
            }
        };

        initCall();

        return () => {
            localStream.current?.getTracks().forEach(t => t.stop());
            peerConnection.current?.close();
            signalingChannel.current?.close();
        };
    }, [conversation.id, type, isCaller, onEnd]);

    const toggleMute = () => {
        if (localStream.current) {
            localStream.current.getAudioTracks().forEach(track => track.enabled = !track.enabled);
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (localStream.current && type === 'video') {
            localStream.current.getVideoTracks().forEach(track => track.enabled = !track.enabled);
            setIsVideoOff(!isVideoOff);
        }
    };

    const handleEnd = () => {
        signalingChannel.current?.postMessage({ type: 'end' });
        onEnd();
    };

    return (
        <div className="absolute inset-0 z-50 bg-[#1e1f22] flex flex-col items-center justify-between p-6 md:p-10 animate-in fade-in zoom-in duration-300">
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
                                <><Loader2 size={10} className="animate-spin"/> Establish Secure Connection...</>
                            ) : (
                                <span className="text-green-500">Live Call Active</span>
                            )}
                        </p>
                    </div>
                </div>
                <button className="text-white/20 hover:text-white transition-colors"><Maximize2 size={24}/></button>
            </div>

            {/* Video Grid Area */}
            <div className="flex-1 w-full max-w-6xl my-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* Remote Video (The other person) */}
                <div className="bg-black/40 rounded-[3rem] border-4 border-white/5 overflow-hidden flex items-center justify-center relative shadow-2xl">
                    <video 
                        ref={remoteVideoRef} 
                        className="w-full h-full object-cover" 
                        autoPlay 
                        playsInline
                    />
                    {isConnecting && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#1e1f22]">
                            <div className="h-32 w-32 rounded-[3.5rem] bg-primary/10 border-4 border-primary/20 flex items-center justify-center text-primary shadow-2xl animate-pulse">
                                <span className="text-5xl font-black">{conversation.name[0]}</span>
                            </div>
                            <p className="text-white/20 font-black uppercase tracking-[0.3em] text-xs">Waiting for {conversation.name}...</p>
                        </div>
                    )}
                    <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white font-black text-[10px] uppercase tracking-widest border border-white/10">
                        Remote Participant
                    </div>
                </div>

                {/* Local Video (You) */}
                <div className="bg-black/40 rounded-[3rem] border-4 border-white/5 overflow-hidden flex items-center justify-center relative shadow-2xl">
                    <video 
                        ref={localVideoRef} 
                        className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`} 
                        autoPlay 
                        muted 
                        playsInline
                    />
                    {isVideoOff && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#2b2d31]">
                            <div className="h-32 w-32 rounded-[3.5rem] bg-white/5 border-4 border-white/10 flex items-center justify-center text-white/20">
                                <span className="text-5xl font-black">YOU</span>
                            </div>
                            <p className="text-white/20 font-black uppercase tracking-[0.3em] text-xs">Self Camera Off</p>
                        </div>
                    )}
                    <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white font-black text-[10px] uppercase tracking-widest border border-white/10">
                        You (Preview)
                    </div>
                </div>
            </div>

            {/* Call Controls */}
            <div className="flex items-center gap-6 bg-black/40 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
                <button 
                    onClick={toggleMute}
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${
                        isMuted ? 'bg-red-500 text-white shadow-red-500/20 shadow-xl' : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                >
                    {isMuted ? <MicOff size={24}/> : <Mic size={24}/>}
                </button>
                <button 
                    onClick={toggleVideo}
                    disabled={type === 'audio'}
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${
                        isVideoOff ? 'bg-red-500 text-white shadow-red-500/20 shadow-xl' : 'bg-white/5 text-white/60 hover:bg-white/10'
                    } ${type === 'audio' ? 'opacity-20' : ''}`}
                >
                    {isVideoOff ? <VideoOff size={24}/> : <Video size={24}/>}
                </button>
                <button 
                    onClick={handleEnd}
                    className="h-16 w-20 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-xl shadow-red-600/30 active:scale-95"
                >
                    <PhoneOff size={32}/>
                </button>
            </div>
        </div>
    );
}