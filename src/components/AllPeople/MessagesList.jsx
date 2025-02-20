import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MessagesList = ({ selectedUser, onBack }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const axiosSecure = useAxiosSecure();

  // Fetch messages from the server
  const fetchMessages = async () => {
    if (user && selectedUser) {
      try {
        const { data } = await axiosSecure.get(
          `/messages?user=${user.email}&chatWith=${selectedUser}`
        );
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  // Initial fetch and set interval to poll messages every 5 seconds
  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [user, selectedUser]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        sender: user.email,
        receiver: selectedUser,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };

      fetch(`http://localhost:5000/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMessages([...messages, message]);
            setNewMessage("");
          }
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  return (
    <div>
      <button onClick={onBack} className="text-blue-500 underline mb-4">
        Back to Conversations
      </button>
      <h2 className="text-2xl font-bold mb-4">Chat with {selectedUser}</h2>
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p>No messages.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md ${
                msg.sender === user.email
                  ? "bg-blue-500 text-white text-right"
                  : "bg-gray-200 text-black text-left"
              }`}
            >
              <p className="font-semibold">
                {msg.sender === user.email ? "You" : msg.sender}
              </p>
              <p>{msg.text}</p>
              <p className="text-sm mt-2">
                {new Date(msg.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="mt-6 flex items-center space-x-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="p-3 w-full border rounded-lg flex-1"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-3 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagesList;
