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
      <div className="flex flex-col space-y-4">
        <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-lg max-h-[500px] overflow-y-auto">
          <ChatBox
            messages={messages}
            userInput={userInput}
            onInputChange={setUserInput}
            onSend={handleSend}
            loading={loading}
          />
        </div>
        <div className="flex items-center space-x-2 border-t pt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !userInput.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-blue-300"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
