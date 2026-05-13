import { directChats } from "@/constants/mock-data";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function useChats() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chat = directChats.find((item) => item.id === id) ?? directChats[0];
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", from: chat.name, text: chat.lastMessage },
    { id: "2", from: "You", text: "Yes. I will bring the first messy idea." },
  ]);

  const sendMessage = () => {
    const trimmed = draft.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: `${Date.now()}`, from: "You", text: trimmed },
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
