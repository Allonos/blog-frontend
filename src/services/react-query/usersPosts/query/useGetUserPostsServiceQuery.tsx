import { deletePost } from "@/src/services/apiServices/deletPost";
import { getUserPosts } from "@/src/services/apiServices/usersPosts";
import type { userPostsTypesResponse } from "@/src/utils/types/userPostsTypes";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetUserPostsServiceQuery = (userId: string) => {
  return useInfiniteQuery<userPostsTypesResponse>({
    queryKey: ["get-user-posts", userId],
    queryFn: ({ pageParam }) => getUserPosts(userId, pageParam as number),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
};

interface IProps {
  postId: string;
}

export const useDeletePostServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: IProps) => deletePost({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
      queryClient.invalidateQueries({ queryKey: ["get-user-posts"] });
    },
  });
};
