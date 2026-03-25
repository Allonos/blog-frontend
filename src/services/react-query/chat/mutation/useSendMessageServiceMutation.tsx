import { sendMessage } from "@/src/services/apiServices/sendMessage";
import { useMutation } from "@tanstack/react-query";

interface IProps {
  id: string;
  text: string;
  image: string;
}

export const useSendMessageServiceMutation = () => {
  return useMutation({
    mutationFn: ({ id, text, image }: IProps) =>
      sendMessage({ id, text, image }),
  });
};
