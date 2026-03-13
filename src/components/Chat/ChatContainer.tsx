'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

      if (sorted.length > 0) {
        setSelectedConv(sorted[0]);
        loadMessages(sorted[0].id);
      }

    } catch (err) {

      toast.error("Failed to load chat data");

    } finally {

      setLoading(false);

    }

  }, [user]);

  /* -------------------------------------- */
  /* LOAD MESSAGES */
  /* -------------------------------------- */

  const loadMessages = async (convId: string) => {

    try {

      const msgs = await getMessagesAction(convId);
      setMessages(msgs);

    } catch {

      toast.error("Failed to load messages");

    }

  };

  /* -------------------------------------- */
  /* REFRESH MESSAGES */
  /* -------------------------------------- */

  const refreshMessages = async (convId: string) => {

    try {

      const msgs = await getMessagesAction(convId);

      setMessages(prev => {
        if (prev.length !== msgs.length) {
          return msgs;
        }
        return prev;
      });

    } catch {

      /* silent fail */

    }

  };

  /* -------------------------------------- */
  /* POLLING (5 seconds) */
  /* -------------------------------------- */

  useEffect(() => {

    if (!selectedConv) return;

    const interval = setInterval(() => {
      refreshMessages(selectedConv.id);
    }, 5000);

    return () => clearInterval(interval);

  }, [selectedConv]);

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

    setSelectedConv(conv);
    await loadMessages(conv.id);

  };

  /* -------------------------------------- */
  /* SEND MESSAGE */
  /* -------------------------------------- */

  const handleSendMessage = async (
    text: string,
    file?: { name: string; data: string }
  ) => {

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

      /* Update messages instantly */

      setMessages(prev => [...prev, msg]);

      /* Update conversation preview */

      setConversations(prev => {

        const updated = prev.map(c => {

          if (c.id !== selectedConv.id) return c;

          return {

            ...c,
            lastMessage: file
              ? `Sent a file: ${file.name}`
              : text,

            lastTimestamp: msg.timestamp

          };

        });

        return updated.sort(
          (a, b) =>
            new Date(b.lastTimestamp || 0).getTime() -
            new Date(a.lastTimestamp || 0).getTime()
        );

      });

    } catch {

      toast.error("Message not sent");

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

      toast.error("Failed to start DM");

    }

  };

  /* -------------------------------------- */
  /* LOADING UI */
  /* -------------------------------------- */

  if (loading) {

    return (

      <div className="
        h-[80vh]
        flex
        items-center
        justify-center
        bg-white
        rounded-3xl
        border
        shadow-xl
      ">

        <Loader2 className="animate-spin text-primary h-12 w-12"/>

      </div>

    );

  }

  /* -------------------------------------- */
  /* CHAT LAYOUT */
  /* -------------------------------------- */

  return (

    <div className="
      h-[85vh]
      bg-[#313338]
      rounded-[2rem]
      shadow-2xl
      flex
      overflow-hidden
      relative
    ">

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

          <div className="
            flex-1
            flex
            items-center
            justify-center
            text-white/30
            font-black
            uppercase
            tracking-widest
            text-xl
          ">

            Select a conversation to begin

          </div>

        )}

      </div>

    </div>

  );

}