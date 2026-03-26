import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocketStore } from "@/src/store/useSocketStore";
import type { MessageType } from "@/src/utils/types/messageTypes";

export const useListenMessages = (userId: string) => {
  const { socket } = useSocketStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket || !userId) return;

    const handleNewMessage = (message: MessageType) => {
      if (message.senderId !== userId) return;

      queryClient.setQueryData(
        ["get-users-chat-messages", userId],
        (prev: MessageType[] = []) => [...prev, message],
      );
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, userId, queryClient]);
};
