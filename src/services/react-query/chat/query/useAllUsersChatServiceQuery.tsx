import { getAllUsersChat } from "@/src/services/apiServices/allUsersChat";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useAllUsersChatServiceQuery = () => {
  return useInfiniteQuery({
    queryKey: ["all-users-chat"],
    queryFn: ({ pageParam }) => getAllUsersChat({ page: pageParam as number }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
