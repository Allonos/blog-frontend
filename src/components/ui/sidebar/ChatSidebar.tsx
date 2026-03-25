import { useState } from "react";
import UsersChatList from "@/src/components/ui/chats/UsersChatList";
import ContactsList from "@/src/components/ui/chats/ContactsList";

const ChatSidebar = () => {
  const [activeTab, setActiveTab] = useState<"users" | "chats">("users");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UsersChatList />;
      case "chats":
        return <ContactsList />;
      default:
        return <UsersChatList />;
    }
  };

  return (
    <div className="border-r border-zinc-800 min-w-75">
      <div className="pt-2 border-b border-zinc-800">
        <h2 className="text-[24px] font-bold py-2 px-6">Messages</h2>
        <div className="relative flex w-full">
          <button
            onClick={() => setActiveTab("users")}
            className="py-2 text-sm font-medium flex-1 cursor-pointer hover:bg-zinc-800 transition-colors duration-300"
          >
            All Users
          </button>
          <button
            onClick={() => setActiveTab("chats")}
            className="py-2 text-sm font-medium flex-1 cursor-pointer hover:bg-zinc-800 transition-colors duration-300"
          >
            Chats
          </button>
          <div
            className={`absolute bottom-0 h-0.5 w-1/2 bg-blue-500 transition-transform duration-200 ${
              activeTab === "chats" ? "translate-x-full" : "translate-x-0"
            }`}
          />
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default ChatSidebar;
