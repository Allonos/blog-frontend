import { getAllPosts } from "@/src/services/apiServices/posts";
import type { getAllPostsResponse } from "@/src/services/types/postTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPostsServiceQuery = () => {
  return useQuery<getAllPostsResponse>({
    queryKey: ["get-all-posts"],
    queryFn: () => getAllPosts(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
