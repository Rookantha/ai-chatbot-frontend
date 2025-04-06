import type { Metadata } from "next";
import "@/styles/globals.css";


export const metadata: Metadata = {
  title: "AI Chatbot",
  description: "Talk with an AI Assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
