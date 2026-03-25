import { getMessages } from "@/src/services/apiServices/getMessages";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  id: string;
}

export const useGetUsersChatMessageQuery = ({ id }: IProps) => {
  return useQuery({
    queryKey: ["get-users-chat-messages", id],
    queryFn: () => getMessages({ id }),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
