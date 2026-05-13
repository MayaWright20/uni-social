import { directChats } from "@/constants/mock-data";
import { ChatMessage, MessageStatus } from "@/types/messages";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function useChats() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chat = directChats.find((item) => item.id === id) ?? directChats[0];
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      author: chat.name,
      text: chat.lastMessage,
      createdAt: new Date(),
      status: { type: "read", readAt: new Date() },
    },
    {
      id: "2",
      author: "You",
      text: "Yes. I will bring the first messy idea.",
      createdAt: new Date(),
      status: { type: "sent" },
    },
  ]);

  const sendMessage = () => {
    const trimmed = draft.trim();
    const messageId = `${Date.now()}`;

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: messageId,
        author: "You",
        text: trimmed,
        createdAt: new Date(),
        status: { type: "sending" },
      },
    ]);

    const updateMessageStatus = (messageId: string, status: MessageStatus) => {
      setMessages((current) =>
        current.map((msg) => (msg.id === messageId ? { ...msg, status } : msg)),
      );
    };

    setTimeout(() => {
      updateMessageStatus(messageId, { type: "sent" });
    }, 1000);

    setTimeout(() => {
      updateMessageStatus(messageId, { type: "delivered" });
    }, 2000);

    setTimeout(() => {
      updateMessageStatus(messageId, { type: "read", readAt: new Date() });
    }, 3000);

    if (Math.random() < 0.3) {
      setTimeout(() => {
        updateMessageStatus(messageId, {
          type: "failed",
          error: "Network error",
        });
      }, 4000);
    }

    setDraft("");
  };

  return {
    id,
    chat,
    draft,
    setDraft,
    messages,
    setMessages,
    sendMessage,
    directChats,
    isTyping,
    setIsTyping,
  };
}
