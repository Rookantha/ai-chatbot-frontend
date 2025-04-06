import MessageItem from "./Message";
import { Message } from "@/types/message";

interface ChatBoxProps {
  messages: Message[];
  userInput: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
  loading: boolean;
}

export default function ChatBox({
  messages,
  userInput,
  onInputChange,
  onSend,
  loading,
}: ChatBoxProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-96 overflow-y-auto p-4 bg-white rounded shadow-sm border border-gray-200">
        {messages.map((msg, idx) => (
          <MessageItem key={idx} role={msg.role} content={msg.content} />
        ))}
        {loading && <p className="text-gray-400">AI is typing...</p>}
      </div>
      <div className="flex gap-2">
        <input
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your message..."
        />
        <button
          onClick={onSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
