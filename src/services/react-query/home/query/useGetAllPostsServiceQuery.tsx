import { getAllPosts } from "@/src/services/apiServices/posts";
import type { getAllPostsResponse } from "@/src/utils/types/postTypes";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetAllPostsServiceQuery = () => {
  return useInfiniteQuery<getAllPostsResponse>({
    queryKey: ["get-all-posts"],
    queryFn: ({ pageParam }) => getAllPosts(pageParam as number),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
};
