'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Conversation, CallSession } from '@/utils/storage';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Maximize2, Users, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { updateCallSignalingAction, getCallSessionAction, updateCallStatusAction } from '@/app/actions/dbActions';

interface CallOverlayProps {
    type: 'audio' | 'video';
    conversation: Conversation;
    isCaller?: boolean;
    sessionId?: string;
    onEnd: () => void;
}

export default function CallOverlay({ type, conversation, isCaller = false, sessionId, onEnd }: CallOverlayProps) {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(type === 'audio');
    const [isConnecting, setIsConnecting] = useState(true);
    
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const localStream = useRef<MediaStream | null>(null);
    const remoteStream = useRef<MediaStream | null>(null);
    const signalingInterval = useRef<NodeJS.Timeout | null>(null);
    const processedCandidates = useRef<Set<string>>(new Set());

    const stopAndClose = () => {
        if (signalingInterval.current) clearInterval(signalingInterval.current);
        localStream.current?.getTracks().forEach(t => t.stop());
        peerConnection.current?.close();
        onEnd();
    };

    useEffect(() => {
        if (!sessionId) return;

        const initCall = async () => {
            try {
                // 1. Get User Media
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: type === 'video' ? { facingMode: 'user' } : false, 
                    audio: true 
                });
                
                localStream.current = stream;
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                // 2. Initialize PeerConnection
                const pc = new RTCPeerConnection({
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' },
                        { urls: 'stun:stun2.l.google.com:19302' }
                    ]
                });
                peerConnection.current = pc;

                // 3. Create Remote Stream Container
                remoteStream.current = new MediaStream();
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = remoteStream.current;
                }

                // 4. Track Handling - Robust Audio Routing
                pc.ontrack = (event) => {
                    event.streams[0].getTracks().forEach(track => {
                        remoteStream.current?.addTrack(track);
                    });
                    
                    setIsConnecting(false);
                    
                    // Force audio playback
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.play().catch(() => {
                            console.log("Waiting for user interaction...");
                        });
                    }
                };

                // 5. Add local tracks to connection
                stream.getTracks().forEach(track => pc.addTrack(track, stream));

                // 6. ICE Candidate Handling (Manual Plain Object Extraction for Next.js)
                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        const candidateData = {
                            candidate: event.candidate.candidate,
                            sdpMid: event.candidate.sdpMid,
                            sdpMLineIndex: event.candidate.sdpMLineIndex
                        };
                        
                        const field = isCaller ? 'callerCandidates' : 'receiverCandidates';
                        getCallSessionAction(sessionId).then(current => {
                            if (!current) return;
                            const existing = (current as any)[field] || [];
                            const candStr = JSON.stringify(candidateData);
                            if (!existing.some((c: any) => JSON.stringify(c) === candStr)) {
                                updateCallSignalingAction(sessionId, { [field]: [...existing, candidateData] });
                            }
                        });
                    }
                };

                // 7. Signaling Loop (Poll every 1s for fast connection)
                signalingInterval.current = setInterval(async () => {
                    const session = await getCallSessionAction(sessionId);
                    if (!session || session.status === 'ended') {
                        stopAndClose();
                        return;
                    }

                    try {
                        if (isCaller) {
                            // Watch for Answer
                            if (pc.signalingState === 'have-local-offer' && session.answer && !pc.remoteDescription) {
                                await pc.setRemoteDescription(new RTCSessionDescription({
                                    type: session.answer.type,
                                    sdp: session.answer.sdp
                                }));
                            }
                            // Apply Remote Candidates
                            if (session.receiverCandidates && pc.remoteDescription) {
                                for (const cand of session.receiverCandidates) {
                                    const cStr = JSON.stringify(cand);
                                    if (!processedCandidates.current.has(cStr)) {
                                        await pc.addIceCandidate(new RTCIceCandidate(cand));
                                        processedCandidates.current.add(cStr);
                                    }
                                }
                            }
                        } else {
                            // Watch for Offer
                            if (pc.signalingState === 'stable' && session.offer && !pc.remoteDescription) {
                                await pc.setRemoteDescription(new RTCSessionDescription({
                                    type: session.offer.type,
                                    sdp: session.offer.sdp
                                }));
                                const answer = await pc.createAnswer();
                                await pc.setLocalDescription(answer);
                                await updateCallSignalingAction(sessionId, { 
                                    answer: { type: answer.type, sdp: answer.sdp } 
                                });
                            }
                            // Apply Remote Candidates
                            if (session.callerCandidates && pc.remoteDescription) {
                                for (const cand of session.callerCandidates) {
                                    const cStr = JSON.stringify(cand);
                                    if (!processedCandidates.current.has(cStr)) {
                                        await pc.addIceCandidate(new RTCIceCandidate(cand));
                                        processedCandidates.current.add(cStr);
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        console.error("Signaling Step Failure:", err);
                    }
                }, 1000);

                // 8. Initial Offer (Caller Only)
                if (isCaller) {
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    await updateCallSignalingAction(sessionId, { 
                        offer: { type: offer.type, sdp: offer.sdp } 
                    });
                }

            } catch (err) {
                console.error("Call Setup Failure:", err);
                toast.error("Media Error: Camera/Mic permission denied or unavailable.");
                stopAndClose();
            }
        };

        initCall();

        return () => {
            if (signalingInterval.current) clearInterval(signalingInterval.current);
            localStream.current?.getTracks().forEach(t => t.stop());
            peerConnection.current?.close();
        };
    }, [sessionId, type, isCaller]);

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

    const handleEnd = async () => {
        if (sessionId) {
            await updateCallStatusAction(sessionId, 'ended');
        }
        stopAndClose();
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#1e1f22] flex flex-col items-center justify-between p-6 md:p-10 animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="w-full flex justify-between items-center max-w-6xl">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20">
                        <Users size={24} />
                    </div>
                    <div>
                        <h2 className="text-white font-black uppercase tracking-tighter text-xl">{conversation.name}</h2>
                        <p className="text-white/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            {isConnecting ? (
                                <><Loader2 size={10} className="animate-spin"/> Handshaking Media...</>
                            ) : (
                                <span className="text-green-500">Live Secure Connection</span>
                            )}
                        </p>
                    </div>
                </div>
                <button className="text-white/20 hover:text-white transition-colors"><Maximize2 size={24}/></button>
            </div>

            {/* Video Grid Area */}
            <div className="flex-1 w-full max-w-6xl my-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                
                {/* Remote Video - NOT MUTED */}
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
                            <p className="text-white/20 font-black uppercase tracking-[0.3em] text-xs text-center px-6">Waiting for {conversation.name}...</p>
                        </div>
                    )}
                    <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white font-black text-[10px] uppercase tracking-widest border border-white/10">
                        Remote Monitor
                    </div>
                </div>

                {/* Local Video - MUTED */}
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
                            <p className="text-white/20 font-black uppercase tracking-[0.3em] text-xs">Privacy Mode Active</p>
                        </div>
                    )}
                    <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white font-black text-[10px] uppercase tracking-widest border border-white/10">
                        Local Monitor (Muted)
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 bg-black/40 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] border border-white/5 shadow-2xl mb-4">
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
