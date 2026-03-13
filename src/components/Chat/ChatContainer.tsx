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

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ChatContainer() {
  const { user } = useAuth();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Cache for tracking message IDs to prevent duplicates during slow net
  const processedMessageIds = useRef<Set<string>>(new Set());

  /* -------------------------------------- */
  /* INITIAL LOAD */
  /* -------------------------------------- */

  const initChat = useCallback(async () => {
    if (!user) return;
    setLoading(true);

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

      if (sorted.length > 0 && !selectedConv) {
        setSelectedConv(sorted[0]);
        loadMessages(sorted[0].id);
      }
    } catch (err) {
      toast.error("Network delay detected. Retrying...");
    } finally {
      setLoading(false);
    }
  }, [user, selectedConv]);

  /* -------------------------------------- */
  /* LOAD MESSAGES */
  /* -------------------------------------- */

  const loadMessages = async (convId: string) => {
    try {
      const msgs = await getMessagesAction(convId);
      setMessages(msgs);
      processedMessageIds.current = new Set(msgs.map(m => m.id));
    } catch {
      toast.error("Connection slow. Still loading...");
    }
  };

  /* -------------------------------------- */
  /* REFRESH MESSAGES (SMART POLLING) */
  /* -------------------------------------- */

  const refreshMessages = useCallback(async (convId: string) => {
    try {
      const msgs = await getMessagesAction(convId);
      
      // Only update state if message count changed to save re-renders
      setMessages(prev => {
        if (prev.length !== msgs.length) {
          processedMessageIds.current = new Set(msgs.map(m => m.id));
          return msgs;
        }
        return prev;
      });
    } catch {
      // Silent fail for polling to avoid interrupting user
    }
  }, []);

  /* -------------------------------------- */
  /* POLLING (3 seconds for faster sync) */
  /* -------------------------------------- */

  useEffect(() => {
    if (!selectedConv) return;

    const interval = setInterval(() => {
      refreshMessages(selectedConv.id);
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedConv, refreshMessages]);

  /* -------------------------------------- */
  /* INITIAL CHAT LOAD */
  /* -------------------------------------- */

  useEffect(() => {
    initChat();
  }, [initChat]);

  /* -------------------------------------- */
  /* SELECT CONVERSATION */
  /* -------------------------------------- */

  const handleSelectConversation = async (conv: Conversation) => {
    if (selectedConv?.id === conv.id) return;
    setSelectedConv(conv);
    setMessages([]); // Immediate UI clear for snappiness
    await loadMessages(conv.id);
  };

  /* -------------------------------------- */
  /* SEND MESSAGE (OPTIMISTIC UI) */
  /* -------------------------------------- */

  const handleSendMessage = async (
    text: string,
    file?: { name: string; data: string }
  ) => {
    if (!selectedConv || !user) return;

    // 1. Create a local temporary message for instant feedback
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
      fileUrl: file ? 'pending' : undefined // Placeholder
    };

    // Update messages list instantly
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

      // Replace optimistic message with the real one from server
      setMessages(prev => prev.map(m => m.id === tempId ? realMsg : m));
      processedMessageIds.current.add(realMsg.id);

      // Update conversation preview instantly
      setConversations(prev => {
        const updated = prev.map(c => {
          if (c.id !== selectedConv.id) return c;
          return {
            ...c,
            lastMessage: file ? `Sent a file: ${file.name}` : text,
            lastTimestamp: realMsg.timestamp
          };
        });

        return updated.sort(
          (a, b) =>
            new Date(b.lastTimestamp || 0).getTime() -
            new Date(a.lastTimestamp || 0).getTime()
        );
      });
    } catch {
      // If server fails, remove the optimistic message and alert user
      setMessages(prev => prev.filter(m => m.id !== tempId));
      toast.error("Failed to send message. Please check your connection.");
    }
  };

  /* -------------------------------------- */
  /* START DIRECT MESSAGE */
  /* -------------------------------------- */

  const handleStartDM = async (otherUserId: string) => {
    if (!user) return;

    const existing = conversations.find(
      c =>
        c.type === 'private' &&
        c.memberIds.includes(otherUserId)
    );

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
      toast.error("Failed to start conversation. Connection slow.");
    }
  };

  /* -------------------------------------- */
  /* LOADING UI */
  /* -------------------------------------- */

  if (loading && !selectedConv) {
    return (
      <div className="h-[80vh] flex items-center justify-center bg-[#313338] rounded-3xl border border-white/5 shadow-xl">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-primary h-12 w-12 mx-auto"/>
          <p className="text-white/40 font-black uppercase text-[10px] tracking-widest">Optimizing Connection...</p>
        </div>
      </div>
    );
  }

  /* -------------------------------------- */
  /* CHAT LAYOUT */
  /* -------------------------------------- */

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
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-8">
            <div className="h-24 w-24 rounded-[3rem] bg-white/5 flex items-center justify-center text-white/10 animate-pulse">
              <UserIcon size={48}/>
            </div>
            <div>
              <h3 className="text-white font-black text-2xl tracking-tighter uppercase">Academic Messaging</h3>
              <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest mt-1">Select a workspace to begin collaboration</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
