import React, { useState } from "react";
import ConversationsList from "./ConversationsList";
import MessagesList from "./MessagesList";

const AllMessages = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="p-6">
      {selectedUser ? (
        <MessagesList selectedUser={selectedUser} onBack={() => setSelectedUser(null)} />
      ) : (
        <ConversationsList onSelectConversation={setSelectedUser} />
      )}
    </div>
  );
};

export default AllMessages;
