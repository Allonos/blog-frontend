import { getUserContacts } from "@/src/services/apiServices/userContacts";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetUsersContactsServiceQuery = () => {
  return useInfiniteQuery({
    queryKey: ["contacts"],
    queryFn: ({ pageParam }) => getUserContacts({ page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
