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
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ Failed to respond" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
          🤖 AI Chatbot
        </h1>
        <ChatBox messages={messages} loading={loading} />
        <div className="flex items-center gap-2 border-t pt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !userInput.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm disabled:bg-blue-300"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
