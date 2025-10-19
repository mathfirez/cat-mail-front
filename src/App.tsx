import { useState } from "react";

type MessageStatus = "not_sent" | "sending" | "sent";

interface Message {
  id: number;
  text: string;
  status: MessageStatus;
  sender: string;
  receiver: string;
}

export default function App() {
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    if (!username.trim() || !receiver.trim() || !newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      text: newMessage.slice(0, 255),
      status: "sending",
      sender: username,
      receiver,
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate sending delay
    setTimeout(() => {
      setMessages((msgs) =>
        msgs.map((m) => (m.id === message.id ? { ...m, status: "sent" } : m))
      );
    }, 1000 + Math.random() * 1000);
  };

  const getStatusIcon = (status: MessageStatus) => {
    switch (status) {
      case "not_sent":
        return "❌";
      case "sending":
        return "⏳";
      case "sent":
        return "✔️";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      {/* Sender + Receiver inputs side by side */}
      <div className="flex gap-4 mb-4">
        {/* Sender */}
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Your username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              if (e.target.value.length <= 50) setUsername(e.target.value);
            }}
            placeholder="Enter your username"
            className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Receiver */}
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Receiver username</label>
          <input
            type="text"
            value={receiver}
            onChange={(e) => {
              if (e.target.value.length <= 50) setReceiver(e.target.value);
            }}
            placeholder="Enter receiver username"
            className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 p-3 border border-gray-700 rounded-md bg-gray-800">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex justify-between items-start p-4 bg-gray-700 rounded-md"
          >
            <div className="flex-1 min-w-0">
              {/* flex-1 + min-w-0 allows text to wrap inside a flex container */}
              <span className="font-semibold text-blue-300">{msg.sender}</span>
              <span className="text-gray-400 ml-1">→ {msg.receiver}</span>
              <p className="mt-1 break-words whitespace-pre-wrap">{msg.text}</p>
            </div>
            <span className="ml-2 text-sm flex-shrink-0">
              {getStatusIcon(msg.status)}
            </span>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-4">No messages yet</p>
        )}
      </div>

      {/* Input for new message */}
      <div className="flex gap-2 mt-auto">
        <textarea
          value={newMessage}
          onChange={(e) => {
            if (e.target.value.length <= 255) setNewMessage(e.target.value);
          }}
          placeholder={
            username && receiver
              ? "Type a message..."
              : "Set sender and receiver usernames first"
          }
          disabled={!username.trim() || !receiver.trim()}
          className={`flex-1 rounded-md border border-gray-700 bg-gray-800 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-normal min-h-[50px] resize-none ${
            !username.trim() || !receiver.trim()
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!username.trim() || !receiver.trim() || !newMessage.trim()}
          className={`px-4 py-2 rounded-md font-semibold bg-blue-600 hover:bg-blue-700 ${
            !username.trim() || !receiver.trim() || !newMessage.trim()
              ? "opacity-50 cursor-not-allowed hover:bg-blue-600"
              : ""
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
}
