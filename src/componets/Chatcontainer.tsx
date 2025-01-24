import Inputbox from "./Inputbox";
import axios from "axios";
import { ChatMessage } from "./Chatmessage";
import React, { useState } from "react";
// interface Message {
//   id: string;
//   text: string;
//   timestamp: string;
//   isUser: boolean;
// }
// export default function Chatcontainer({
//   fileid,
//   messages,
//   setMessages,
//   history,
//   sethistory,
// }) {
//   //   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   //   const [history, sethistory] = useState<Message[]>([]);
//   const handleSendMessage = async (text: string) => {
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text,
//       isUser: true,
//       timestamp: new Date().toLocaleTimeString(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setIsLoading(true);

//     try {
//       console.log(history, "sending this history to backend");
//       // const response = await fetch(`http://127.0.0.1:8080/ask/${fileid}`, {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },

//       //   body: JSON.stringify({ question: text, history: history }),
//       // });
//       const response = await axios.post(
//         `http://127.0.0.1:8000/ask/${fileid}`,
//         {
//           question: text,
//           history: history,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response, "response from the server");

//       const responseMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: response.data.answer,
//         isUser: false,
//         timestamp: new Date().toLocaleTimeString(),
//       };

//       setMessages((prev) => [...prev, responseMessage]);
//       console.log(response.data.history, "history by the server");
//       sethistory((prev) => [...prev, response.data.history]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: "Sorry, there was an error processing your message.",
//         isUser: false,
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="flex flex-col  px-10 h-full ">
//       <main className="flex-1 overflow-y-auto p-4">
//         {/* Container for chat messages with max-width and no overflow */}
//         <div className="flex-1 overflow-y-auto px-4 py-4 w-full h-full mx-auto">
//           {messages.map((message) => (
//             <ChatMessage
//               key={message.id}
//               message={message.text}
//               isUser={message.isUser}
//               timestamp={message.timestamp}
//             />
//           ))}
//         </div>
//       </main>

//       <Inputbox onsendmessage={handleSendMessage} disabled={isLoading} />
//     </div>
//   );
// }
//part 2
export default function Chatcontainer({
  fileid,
  messages,
  setMessages,
  history,
  sethistory,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);

    // Add temporary thinking message
    const thinkingMessage: Message = {
      id: `thinking-${Date.now()}`,
      text: "Thinking...",
      isUser: false,
      isBotThinking: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, thinkingMessage]);

    setIsLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/ask/${fileid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: text, history: history }),
      });

      const data = await response.json();
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Replace thinking message with actual response
      setMessages((prev) => [
        ...prev.filter((msg) => msg.id !== thinkingMessage.id),
        responseMessage,
      ]);

      sethistory((prev) => [...prev, data.history]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, there was an error processing your message.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Replace thinking message with error
      setMessages((prev) => [
        ...prev.filter((msg) => msg.id !== thinkingMessage.id),
        errorMessage,
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-10 h-full">
      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex-1 overflow-y-auto px-4 py-4 w-full h-full mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
              isBotThinking={message.isBotThinking}
            />
          ))}
        </div>
      </main>

      <Inputbox onsendmessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
