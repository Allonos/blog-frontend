import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatLayout from "@/src/components/ui/layout/ChatLayout";
import ChatSidebar from "@/src/components/ui/sidebar/ChatSidebar";
import { useGetUsersChatMessageQuery } from "@/src/services/react-query/chat/query/useGetUsersChatMessageQuery";
import { useAllUsersChatServiceQuery } from "@/src/services/react-query/chat/query/useAllUsersChatServiceQuery";
import type { checkUserTypes } from "@/src/utils/types/checkUserTypes";
import MessageBubblesSkeleton from "@/src/components/ui/skeletons/MessageBubbleSkeleton";

import { useListenMessages } from "@/src/hooks/useListenMessages";
import Chat from "../components/ui/chats/Chat";

const MessagesPage = () => {
  const { userId } = useParams();

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

  const otherUser = !isUsersLoading
    ? users?.pages?.flatMap((page) => page.users)?.find((user: checkUserTypes) =>
      user._id === userId
    )
    : undefined;

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
        <Chat
          userId={userId || ""}
          otherUser={otherUser}
          messages={messages}
          isFetchingNextPage={isFetchingNextPage}
          scrollContainerRef={scrollContainerRef}
          bottomRef={bottomRef}
          handleScroll={handleScroll}
        />
      </div>
    </ChatLayout>
  );
};

export default MessagesPage;
