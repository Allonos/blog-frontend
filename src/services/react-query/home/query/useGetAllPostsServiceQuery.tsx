import { getAllPosts } from "@/src/services/apiServices/posts";
import type { getAllPostsResponse } from "@/src/utils/types/postTypes";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetAllPostsServiceQuery = () => {
  return useInfiniteQuery<getAllPostsResponse>({
    queryKey: ["get-all-posts"],
    queryFn: ({ pageParam }) => getAllPosts(pageParam as string | undefined),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
    staleTime: 1000 * 60 * 5,
  });
};
