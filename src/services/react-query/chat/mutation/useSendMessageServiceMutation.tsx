import { sendMessage } from "@/src/services/apiServices/sendMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import type {
  MessagePageResponse,
  MessageType,
} from "@/src/utils/types/messageTypes";

interface IProps {
  id: string;
  text: string;
  image: string;
}

export const useSendMessageServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, text, image }: IProps) =>
      sendMessage({ id, text, image }),
    onSuccess: (newMessage: MessageType, { id }) => {
      queryClient.setQueryData(
        ["get-users-chat-messages", id],
        (prev: InfiniteData<MessagePageResponse> | undefined) => {
          if (!prev) return prev;
          return {
            ...prev,
            pages: prev.pages.map((page, index) =>
              index === 0
                ? { ...page, messages: [...page.messages, newMessage] }
                : page
            ),
          };
        },
      );
    },
  });
};
