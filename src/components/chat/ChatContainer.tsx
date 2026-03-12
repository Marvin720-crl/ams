
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Conversation, ChatMessage, User } from '@/utils/storage';
import { 
    getConversationsAction, 
    getMessagesAction, 
    sendMessageAction, 
    ensureSubjectChatsAction,
    getUsersAction,
    createConversationAction
} from '@/app/actions/dbActions';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ChatContainer() {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            initChat();
            // Refresh messages every 5 seconds for basic real-time experience
            const interval = setInterval(() => {
                if (selectedConv) {
                    refreshMessages(selectedConv.id);
                }
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [user, selectedConv?.id]);

    const initChat = async () => {
        setLoading(true);
        try {
            await ensureSubjectChatsAction();
            const [convs, allUsers] = await Promise.all([
                getConversationsAction(user!.id),
                getUsersAction()
            ]);
            setConversations(convs.sort((a,b) => new Date(b.lastTimestamp || 0).getTime() - new Date(a.lastTimestamp || 0).getTime()));
            setUsers(allUsers);
            if (convs.length > 0 && !selectedConv) {
                handleSelectConversation(convs[0]);
            }
        } catch (e) {
            toast.error("Failed to load chat data");
        } finally {
            setLoading(false);
        }
    };

    const refreshMessages = async (convId: string) => {
        try {
            const msgs = await getMessagesAction(convId);
            if (msgs.length !== messages.length) {
                setMessages(msgs);
            }
        } catch (e) {
            // silent fail
        }
    };

    const handleSelectConversation = async (conv: Conversation) => {
        setSelectedConv(conv);
        try {
            const msgs = await getMessagesAction(conv.id);
            setMessages(msgs);
        } catch (e) {
            toast.error("Failed to load messages");
        }
    };

    const handleSendMessage = async (text: string, file?: { name: string, data: string }) => {
        if (!selectedConv || !user) return;
        try {
            const msg = await sendMessageAction({
                conversationId: selectedConv.id,
                senderId: user.id,
                senderName: user.name,
                text,
                type: 'text',
                fileName: file?.name,
                fileData: file?.data
            });
            setMessages(prev => [...prev, msg]);
            setConversations(prev => {
                const updated = prev.map(c => c.id === selectedConv.id ? { ...c, lastMessage: file ? `Sent a file: ${file.name}` : text, lastTimestamp: msg.timestamp } : c);
                return updated.sort((a,b) => new Date(b.lastTimestamp || 0).getTime() - new Date(a.lastTimestamp || 0).getTime());
            });
        } catch (e) {
            toast.error("Message not sent");
        }
    };

    const handleStartDM = async (otherUserId: string) => {
        if (!user) return;
        const existing = conversations.find(c => c.type === 'private' && c.memberIds.includes(otherUserId));
        if (existing) {
            handleSelectConversation(existing);
            return;
        }
        const otherUser = users.find(u => u.id === otherUserId);
        if (!otherUser) return;
        try {
            const newConv = await createConversationAction({
                name: otherUser.name,
                type: 'private',
                memberIds: [user.id, otherUserId]
            });
            setConversations(prev => [newConv, ...prev]);
            handleSelectConversation(newConv);
        } catch (e) {
            toast.error("Failed to start DM");
        }
    };

    if (loading) {
        return (
            <div className="h-[80vh] flex items-center justify-center bg-white rounded-[2.5rem] border shadow-xl">
                <Loader2 className="animate-spin text-primary h-12 w-12" />
            </div>
        );
    }

    return (
        <div className="h-[85vh] bg-[#313338] rounded-[2rem] shadow-2xl flex overflow-hidden relative">
            <ChatSidebar 
                conversations={conversations} 
                selectedId={selectedConv?.id} 
                onSelect={handleSelectConversation}
                onStartDM={handleStartDM}
                users={users}
            />
            <div className="flex-1 flex flex-col bg-[#313338]">
                {selectedConv ? (
                    <ChatWindow 
                        conversation={selectedConv} 
                        messages={messages} 
                        onSend={handleSendMessage}
                    />
                ) : (
                    <div className="flex-1 flex items-center justify-center text-white/30 font-black uppercase tracking-widest text-xl">
                        Select a channel to begin
                    </div>
                )}
            </div>
        </div>
    );
}
