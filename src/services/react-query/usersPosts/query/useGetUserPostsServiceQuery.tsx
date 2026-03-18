import { getUserPosts } from "@/src/services/apiServices/usersPosts";
import type { userPostsTypesResponse } from "@/src/utils/types/userPostsTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetUserPostsServiceQuery = (userId: string) => {
  return useQuery<userPostsTypesResponse>({
    queryKey: ["get-user-posts", userId],
    queryFn: () => getUserPosts(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
