interface Props {
  role: "user" | "ai";
  content: string;
}

export default function MessageItem({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm shadow 
          ${isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}`}
      >
        {content}
      </div>
    </div>
  );
}
