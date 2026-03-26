import { getMessages } from "@/src/services/apiServices/getMessages";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { MessagePageResponse } from "@/src/utils/types/messageTypes";

interface IProps {
  id: string;
}

export const useGetUsersChatMessageQuery = ({ id }: IProps) => {
  return useInfiniteQuery<MessagePageResponse>({
    queryKey: ["get-users-chat-messages", id],
    queryFn: ({ pageParam }) => getMessages({ id, page: pageParam as number }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
