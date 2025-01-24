import Inputbox from "./Inputbox";
import { ChatMessage } from "./Chatmessage";
import React, { useState } from "react";
interface Message {
  id: string;
  text: string;
  timestamp: string;
  isUser: boolean;
}
export default function Chatcontainer({ fileid }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, sethistory] = useState<Message[]>([]);
  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log(history, "sending this history to backend");
      const response = await fetch(`http://127.0.0.1:8000/ask/${fileid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ question: text, history: history }),
      });

      const data = await response.json();
      console.log(data, "llm responed");
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, responseMessage]);
      console.log(data.history, "history by the server");
      sethistory((prev) => [...prev, data.history]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, there was an error processing your message.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-full px-10 flex flex-col">
      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </main>

      <Inputbox onsendmessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
