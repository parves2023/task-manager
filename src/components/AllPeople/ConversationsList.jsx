import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ConversationsList = ({ onSelectConversation }) => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user) {
      const fetchConversations = async () => {
        try {
          const { data } = await axiosSecure.get(
            `/conversations?user=${user.email}`
          );
          if (data.success) {
            setConversations(data.users);
          }
        } catch (error) {
          console.error("Error fetching conversations:", error);
        }
      };
  
      fetchConversations();
    }
  }, [user]);
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Conversations</h2>
      {conversations.length === 0 ? (
        <p>No conversations available.</p>
      ) : (
        conversations.map((email, index) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-md my-2 bg-gray-100 cursor-pointer hover:bg-gray-200"
            onClick={() => onSelectConversation(email)}
          >
            {email}
          </div>
        ))
      )}
    </div>
  );
};

export default ConversationsList;
