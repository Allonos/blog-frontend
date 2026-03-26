import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { useSocketStore } from "@/src/store/useSocketStore";
import type { MessageType, MessagePageResponse } from "@/src/utils/types/messageTypes";

export const useListenMessages = (userId: string) => {
  const { socket } = useSocketStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket || !userId) return;

    const handleNewMessage = (message: MessageType) => {
      if (message.senderId !== userId) return;

      queryClient.setQueryData(
        ["get-users-chat-messages", userId],
        (prev: InfiniteData<MessagePageResponse> | undefined) => {
          if (!prev) return prev;
          return {
            ...prev,
            pages: prev.pages.map((page, index) =>
              index === 0
                ? { ...page, messages: [...page.messages, message] }
                : page
            ),
          };
        },
      );
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, userId, queryClient]);
};
