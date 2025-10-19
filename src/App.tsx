import { useState } from "react";

type MessageStatus = "not_sent" | "sending" | "sent";

interface Message {
  id: number;
  text: string;
  status: MessageStatus;
}

export default function App() {
  const [username, setUsername] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      status: "sending",
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
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4">
      {/* Username input */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Your username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2 p-2 border border-gray-700 rounded-md bg-gray-800">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex justify-between items-center p-2 bg-gray-700 rounded-md"
          >
            <span>{msg.text}</span>
            <span className="ml-2 text-sm">{getStatusIcon(msg.status)}</span>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-4">No messages yet</p>
        )}
      </div>

      {/* Input for new message */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-md border border-gray-700 bg-gray-800 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
