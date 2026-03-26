import { Loader2, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatLayout from "@/src/components/ui/layout/ChatLayout";
import ChatSidebar from "@/src/components/ui/sidebar/ChatSidebar";
import ChatInput from "@/src/components/ui/chats/ChatInput";
import MessageBubble from "@/src/components/ui/chats/MessageBubble";
import { useGetUsersChatMessageQuery } from "@/src/services/react-query/chat/query/useGetUsersChatMessageQuery";
import { useAuthStore } from "@/src/store/useAuthStore";
import ChatHeader from "@/src/components/ui/headers/ChatHeader";
import { useAllUsersChatServiceQuery } from "@/src/services/react-query/chat/query/useAllUsersChatServiceQuery";
import type { checkUserTypes } from "@/src/utils/types/checkUserTypes";
import MessageBubblesSkeleton from "@/src/components/ui/skeletons/MessageBubbleSkeleton";
import type { MessageType } from "@/src/utils/types/messageTypes";
import { useListenMessages } from "@/src/hooks/useListenMessages";

const MessagesPage = () => {
  const { userId } = useParams();
  const { authUser } = useAuthStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef(0);
  const pageCountRef = useRef(0);

  useListenMessages(userId || "");

  const {
    data: messages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUsersChatMessageQuery({
    id: userId || "",
  });

  const {
    data: users,
    isLoading: isUsersLoading,
  } = useAllUsersChatServiceQuery();

  const otherUser = !isUsersLoading &&
    users?.pages?.flatMap((page) => page.users)?.find((user: checkUserTypes) =>
      user._id === userId
    );

  useEffect(() => {
    const currentPageCount = messages?.pages?.length ?? 0;

    if (
      currentPageCount > 1 &&
      currentPageCount > pageCountRef.current &&
      prevScrollHeightRef.current
    ) {
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight -
          prevScrollHeightRef.current;
        prevScrollHeightRef.current = 0;
      }
      pageCountRef.current = currentPageCount;
      return;
    }

    pageCountRef.current = currentPageCount;
    bottomRef.current?.scrollIntoView();
  }, [messages, userId]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || !hasNextPage || isFetchingNextPage) return;
    if (container.scrollTop === 0) {
      prevScrollHeightRef.current = container.scrollHeight;
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <MessageBubblesSkeleton />;
  }

  return (
    <ChatLayout>
      <div className="flex h-full">
        <div
          className={userId
            ? "hidden md:block md:min-w-75"
            : "w-full md:max-w-75"}
        >
          <ChatSidebar />
        </div>
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
      </div>
    </ChatLayout>
  );
};

export default MessagesPage;
