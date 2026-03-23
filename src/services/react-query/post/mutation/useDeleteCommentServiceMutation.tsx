import { deleteComment } from "@/src/services/apiServices/deleteComment";
import { getPostById } from "@/src/services/apiServices/getPostById";
import type {
  getAllPostsResponse,
  postTypes,
} from "@/src/utils/types/postTypes";
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface IProps {
  postId: string;
  commentId: string;
}

export const useDeleteCommentServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: IProps) => deleteComment({ commentId }),

    onSuccess: async (_, { postId }) => {
      const updatedPost: postTypes = await getPostById({ postId });

      queryClient.setQueryData<InfiniteData<getAllPostsResponse>>(
        ["get-all-posts"],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              posts: page.posts.map((p) =>
                p._id === updatedPost._id ? updatedPost : p
              ),
            })),
          };
        },
      );
    },
  });
};
