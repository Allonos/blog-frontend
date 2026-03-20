import { deleteComment } from "@/src/services/apiServices/deleteComment";
import { getPostById } from "@/src/services/apiServices/getPostById";
import type {
  getAllPostsResponse,
  postTypes,
} from "@/src/utils/types/postTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

      queryClient.setQueryData<getAllPostsResponse>(
        ["get-all-posts"],
        (old) => {
          if (!old) return old;

          const posts = Array.isArray(old) ? old : old.posts;
          const updated = posts.map((p) =>
            p._id === updatedPost._id ? updatedPost : p
          );

          return Array.isArray(old) ? updated : { ...old, posts: updated };
        },
      );
    },
  });
};
