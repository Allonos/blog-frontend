import { deletePost } from "@/src/services/apiServices/deletPost";
import { getUserPosts } from "@/src/services/apiServices/usersPosts";
import type { userPostsTypesResponse } from "@/src/utils/types/userPostsTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUserPostsServiceQuery = (userId: string) => {
  return useQuery<userPostsTypesResponse>({
    queryKey: ["get-user-posts", userId],
    queryFn: () => getUserPosts(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

interface IProps {
  postId: string;
  userId: string;
}

export const useDeletePostServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: IProps) => deletePost({ postId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
      queryClient.invalidateQueries({ queryKey: ["get-user-posts"] });
    },
  });
};
