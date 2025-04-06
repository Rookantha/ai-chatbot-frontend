"use client";

import { useState } from "react";
import ChatBox from "@/components/ChatBox";
import { sendMessageToAI } from "@/lib/api";
import { Message } from "@/types/message";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMsg: Message = { role: "user", content: userInput };
    setMessages((prev) => [...prev, newMsg]);
    setUserInput("");
    setLoading(true);

    try {
      const aiResponse = await sendMessageToAI(newMsg.content); 
      setMessages((prev) => [...prev, { role: "ai", content: aiResponse }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ Failed to respond" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Chatbot</h1>
      <ChatBox
        messages={messages}
        userInput={userInput}
        onInputChange={setUserInput}
        onSend={handleSend}
        loading={loading}
      />
    </main>
  );
}
