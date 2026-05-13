import { directChats } from "@/constants/mock-data";
import { ChatMessage } from "@/types/messages";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function useChats() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chat = directChats.find((item) => item.id === id) ?? directChats[0];
  const [draft, setDraft] = useState("");
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

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}`,
        author: "You",
        text: trimmed,
        createdAt: new Date(),
        status: { type: "sending" },
      },
    ]);
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
  };
}
