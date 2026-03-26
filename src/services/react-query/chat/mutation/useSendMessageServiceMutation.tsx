import { sendMessage } from "@/src/services/apiServices/sendMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MessageType } from "@/src/utils/types/messageTypes";

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
        (prev: MessageType[] = []) => [...prev, newMessage],
      );
    },
  });
};
