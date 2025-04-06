interface Props {
    role: "user" | "ai";
    content: string;
  }
  
  export default function MessageItem({ role, content }: Props) {
    const isUser = role === "user";
    return (
      <div className={`mb-2 text-sm ${isUser ? "text-right" : "text-left"}`}>
        <span className={`inline-block px-3 py-2 rounded ${isUser ? "bg-blue-100" : "bg-gray-100"}`}>
          {content}
        </span>
      </div>
    );
  }
  