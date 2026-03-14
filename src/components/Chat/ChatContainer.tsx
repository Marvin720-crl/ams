'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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

import { Loader2, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function ChatContainer() {
  const { user } = useAuth();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const processedMessageIds = useRef<Set<string>>(new Set());

  const initChat = useCallback(async () => {
    if (!user) return;
    
    const cachedConvs = localStorage.getItem(`cache_convs_${user.id}`);
    if (cachedConvs) {
        setConversations(JSON.parse(cachedConvs));
        setLoading(false);
    }

    try {
      await ensureSubjectChatsAction();

      const [convs, allUsers] = await Promise.all([
        getConversationsAction(user.id),
        getUsersAction()
      ]);

      const sorted = convs.sort(
        (a, b) =>
          new Date(b.lastTimestamp || 0).getTime() -
          new Date(a.lastTimestamp || 0).getTime()
      );

      setConversations(sorted);
      setUsers(allUsers);
      localStorage.setItem(`cache_convs_${user.id}`, JSON.stringify(sorted));

      if (sorted.length > 0 && !selectedConv) {
        setSelectedConv(sorted[0]);
        loadMessages(sorted[0].id);
      }
    } catch (err) {
      // Silent error, use cache
    } finally {
      setLoading(false);
    }
  }, [user, selectedConv]);

  const loadMessages = async (convId: string) => {
    const cachedMsgs = localStorage.getItem(`cache_msgs_${convId}`);
    if (cachedMsgs) {
        setMessages(JSON.parse(cachedMsgs));
    }

    try {
      const msgs = await getMessagesAction(convId);
      setMessages(msgs);
      processedMessageIds.current = new Set(msgs.map(m => m.id));
      localStorage.setItem(`cache_msgs_${convId}`, JSON.stringify(msgs));
    } catch {
      // Background failure okay, we have cache
    }
  };

  const refreshMessages = useCallback(async (convId: string) => {
    try {
      const [msgs, allUsers] = await Promise.all([
        getMessagesAction(convId),
        getUsersAction()
      ]);
      
      setUsers(allUsers);

      setMessages(prev => {
        if (prev.length !== msgs.length) {
          processedMessageIds.current = new Set(msgs.map(m => m.id));
          localStorage.setItem(`cache_msgs_${convId}`, JSON.stringify(msgs));
          return msgs;
        }
        return prev;
      });
    } catch {
      // Silent fail for polling
    }
  }, []);

  useEffect(() => {
    if (!selectedConv) return;

    const interval = setInterval(() => {
      refreshMessages(selectedConv.id);
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedConv, refreshMessages]);

  useEffect(() => {
    initChat();
  }, [initChat]);

  const handleSelectConversation = async (conv: Conversation) => {
    if (selectedConv?.id === conv.id) {
      setIsSidebarOpen(false);
      return;
    }
    setSelectedConv(conv);
    setIsSidebarOpen(false);
    await loadMessages(conv.id);
  };

  const handleSendMessage = async (
    text: string,
    file?: { name: string; data: string }
  ) => {
    if (!selectedConv || !user) return;

    const tempId = `TEMP-${Date.now()}`;
    const optimisticMsg: ChatMessage = {
      id: tempId,
      conversationId: selectedConv.id,
      senderId: user.id,
      senderName: user.name,
      text,
      timestamp: new Date().toISOString(),
      type: 'text',
      fileName: file?.name,
      fileUrl: file ? 'pending' : undefined
    };

    setMessages(prev => [...prev, optimisticMsg]);

    try {
      const realMsg = await sendMessageAction({
        conversationId: selectedConv.id,
        senderId: user.id,
        senderName: user.name,
        text,
        type: 'text',
        fileName: file?.name,
        fileData: file?.data
      });

      setMessages(prev => prev.map(m => m.id === tempId ? realMsg : m));
      processedMessageIds.current.add(realMsg.id);

      setConversations(prev => {
        const updated = prev.map(c => {
          if (c.id !== selectedConv.id) return c;
          return {
            ...c,
            lastMessage: file ? `File: ${file.name}` : text,
            lastTimestamp: realMsg.timestamp
          };
        });
        return updated.sort((a, b) => new Date(b.lastTimestamp || 0).getTime() - new Date(a.lastTimestamp || 0).getTime());
      });
    } catch {
      toast.error("Message not sent. Weak signal.");
      setMessages(prev => prev.filter(m => m.id !== tempId));
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
    } catch {
      toast.error("Failed to start chat. Signal too weak.");
    }
  };

  if (loading && conversations.length === 0) {
    return (
      <div className="h-[calc(100vh-180px)] flex items-center justify-center bg-[#313338] rounded-3xl border border-white/5 shadow-xl">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-primary h-12 w-12 mx-auto"/>
          <p className="text-white/40 font-black uppercase text-[10px] tracking-widest">Warp Speed Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-180px)] bg-[#313338] rounded-[2rem] shadow-2xl flex overflow-hidden relative">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[65] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <ChatSidebar
        conversations={conversations}
        selectedId={selectedConv?.id}
        onSelect={handleSelectConversation}
        onStartDM={handleStartDM}
        users={users}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col bg-[#313338]">
        {selectedConv ? (
          <ChatWindow
            conversation={selectedConv}
            messages={messages}
            users={users}
            onSend={handleSendMessage}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-8">
            <div className="h-24 w-24 rounded-[3rem] bg-white/5 flex items-center justify-center text-white/10">
              <UserIcon size={48}/>
            </div>
            <div>
              <h3 className="text-white font-black text-2xl tracking-tighter uppercase">Academic Messaging</h3>
              <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest mt-1">Ready for collaboration</p>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden h-12 px-8 bg-primary rounded-full text-white font-black uppercase text-[10px] tracking-widest"
            >
              Open Hub
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
