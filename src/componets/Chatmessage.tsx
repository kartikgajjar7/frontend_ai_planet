import { User } from "lucide-react";

import ReactMarkdown from "react-markdown";

// interface ChatMessageProps {
//   message: string;
//   isUser: boolean;
//   timestamp: string;
// }

// export const ChatMessage = ({ message, isUser, timestamp }) => {
//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
//       <div
//         className={`flex items-start max-w-[70%] ${
//           isUser ? "flex-row-reverse" : "flex-row"
//         }`}
//       >
//         <div className={`mx-2 ${isUser ? "mr-2" : "ml-2"}`}>
//           <div
//             className={`rounded-lg p-3 ${
//               isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
//             }`}
//           >
//             <p className="text-sm">{message}</p>
//           </div>
//           <span className="text-xs text-gray-500 mt-1 block">{timestamp}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

//234

// export function ChatMessage({ message, isUser, timestamp, isBotThinking }) {
//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
//       <div
//         className={`max-w-[70%] rounded-lg p-4 ${
//           isUser ? "bg-blue-500 text-white" : "bg-gray-100"
//         }`}
//       >
//         {isBotThinking ? (
//           <div className="flex items-center gap-2">
//             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
//             <span>Thinking...</span>
//           </div>
//         ) : (
//           <>
//             <p className="text-sm">{message}</p>
//             <p
//               className={`text-xs mt-1 ${
//                 isUser ? "text-blue-100" : "text-gray-500"
//               }`}
//             >
//               {timestamp}
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
export function ChatMessage({ message, isUser, timestamp, isBotThinking }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg p-4 ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-100"
        }`}
      >
        {isBotThinking ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            <span>Thinking...</span>
          </div>
        ) : (
          <>
            {/* Render message as Markdown */}
            <ReactMarkdown className="text-sm">{message}</ReactMarkdown>
            {/* Timestamp */}
            <p
              className={`text-xs mt-1 ${
                isUser ? "text-blue-100" : "text-gray-500"
              }`}
            >
              {timestamp}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
