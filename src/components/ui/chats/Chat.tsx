import { Loader2, MessageCircle } from "lucide-react";
import ChatHeader from "@/src/components/ui/headers/ChatHeader";
import type {
  MessagePageResponse,
  MessageType,
} from "@/src/utils/types/messageTypes";
import MessageBubble from "@/src/components/ui/chats/MessageBubble";
import ChatInput from "@/src/components/ui/chats/ChatInput";
import { useAuthStore } from "@/src/store/useAuthStore";
import type { InfiniteData } from "@tanstack/react-query";
import type { checkUserTypes } from "@/src/utils/types/checkUserTypes";

interface IProps {
  userId: string;
  otherUser: checkUserTypes | undefined;
  messages: InfiniteData<MessagePageResponse> | undefined;
  isFetchingNextPage: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

const Chat = (
  {
    userId,
    otherUser,
    messages,
    isFetchingNextPage,
    scrollContainerRef,
    bottomRef,
    handleScroll,
  }: IProps,
) => {
  const { authUser } = useAuthStore();

  return (
    <>
      {userId
        ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <ChatHeader
              recieverId={otherUser?._id || ""}
              recieverImg={otherUser?.profilePic}
              recieverUsername={otherUser?.username}
            />
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto"
            >
              {isFetchingNextPage && (
                <div className="flex justify-center py-3">
                  <Loader2 size={18} className="animate-spin text-zinc-400" />
                </div>
              )}
              {messages?.pages?.slice().reverse().flatMap((page) =>
                page.messages
              )?.map((
                message: MessageType,
              ) => (
                <MessageBubble
                  key={message._id}
                  message={message}
                  isMyMessage={message.senderId === authUser?._id}
                  profilePic={message.senderId === authUser?._id
                    ? authUser?.profilePic ?? ""
                    : otherUser?.profilePic ?? ""}
                />
              ))}
              {messages?.pages?.[0]?.messages?.length === 0 && (
                <div className="flex flex-col h-full items-center justify-center gap-3 mt-10">
                  <MessageCircle size={48} className="text-zinc-500" />
                  <p className="text-lg font-semibold text-zinc-300">
                    No messages yet
                  </p>
                  <p className="text-sm text-zinc-500">
                    Start the conversation by sending a message.
                  </p>
                </div>
              )}
              <div className="w-full h-5" />
              <div ref={bottomRef} />
            </div>
            <ChatInput />
          </div>
        )
        : (
          <div className="hidden md:flex flex-1 flex-col items-center justify-center gap-3">
            <MessageCircle size={48} className="text-zinc-500" />
            <p className="text-lg font-semibold text-zinc-300">
              Select a conversation
            </p>
            <p className="text-sm text-zinc-500">
              Choose the conversation from the list to start messaging.
            </p>
          </div>
        )}
    </>
  );
};

export default Chat;
