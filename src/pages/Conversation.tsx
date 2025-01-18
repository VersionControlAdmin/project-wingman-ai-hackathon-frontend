import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MicrophoneButton } from "@/components/MicrophoneButton";
import { Meteors } from "@/components/ui/meteors";

const Conversation = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch messages based on conversation ID from location
    const fetchMessages = async () => {
      // Simulate fetching messages
      const fetchedMessages = [
        { id: 1, text: "Hello!", sender: "user" },
        { id: 2, text: "Hi there!", sender: "friend" },
      ];
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, [location]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [...prev, { id: Date.now(), text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-primary">
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <Meteors />
        </div>
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex p-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border rounded p-2"
              placeholder="Type a message..."
            />
            <Button onClick={handleSendMessage} className="ml-2">Send</Button>
            <MicrophoneButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
