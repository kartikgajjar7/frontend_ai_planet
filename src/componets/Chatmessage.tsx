import { User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export const ChatMessage = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex items-start max-w-[70%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className={`mx-2 ${isUser ? "mr-2" : "ml-2"}`}>
          <div
            className={`rounded-lg p-3 ${
              isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            <p className="text-sm">{message}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1 block">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};
