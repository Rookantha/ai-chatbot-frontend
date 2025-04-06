import MessageItem from "./MessageItem";
import { Message } from "@/types/message";

interface ChatBoxProps {
  messages: Message[];
  loading: boolean;
}

export default function ChatBox({ messages, loading }: ChatBoxProps) {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-[60vh] px-4 py-2 bg-white rounded-lg border shadow-sm scroll-smooth">
      {messages.map((msg, idx) => (
        <MessageItem key={idx} role={msg.role} content={msg.content} />
      ))}
      {loading && (
        <div className="text-sm text-gray-500 italic px-2">AI is typing...</div>
      )}
    </div>
  );
}
