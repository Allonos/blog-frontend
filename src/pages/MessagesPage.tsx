import { MessageCircle } from "lucide-react";
import ChatLayout from "@/src/components/ui/layout/ChatLayout";
import ChatSidebar from "@/src/components/ui/sidebar/ChatSidebar";

const MessagesPage = () => {
  return (
    <ChatLayout>
      <div className="flex h-screen">
        <ChatSidebar />
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <MessageCircle size={48} className="text-zinc-500" />
          <p className="text-lg font-semibold text-zinc-300">
            Select a conversation
          </p>
          <p className="text-sm text-zinc-500">
            Choose the conversation from the list to start messaging.
          </p>
        </div>
      </div>
    </ChatLayout>
  );
};

export default MessagesPage;
