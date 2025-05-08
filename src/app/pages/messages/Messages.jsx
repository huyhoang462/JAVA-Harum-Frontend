import Sidebar from "./partical/Sidebar";
import chatData from "./partical/data";
import ChatWindow from "./partical/ChatWindow";
import InfoBar from "./partical/Inforbar";
import React, { useState } from "react";

export default function Message() {
  const [selectedUserId, setSelectedUserId] = useState(chatData[0].id);

  const selectedUser = chatData.find((u) => u.id === selectedUserId);

  return (
    <div className="flex h-screen">
      <Sidebar
        users={chatData}
        onSelectUser={setSelectedUserId}
        selectedUserId={selectedUserId}
      />
      <ChatWindow user={selectedUser} />
      <InfoBar user={selectedUser} />
    </div>
  );
}