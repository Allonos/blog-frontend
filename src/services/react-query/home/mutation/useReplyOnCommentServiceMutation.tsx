import { replyComment } from "@/src/services/apiServices/replyComment";
import { getPostById } from "@/src/services/apiServices/getPostById";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  getAllPostsResponse,
  postTypes,
} from "@/src/utils/types/postTypes";

interface IProps {
  postId: string;
  commentId: string;
  reply: string;
}

export const useReplyOnCommentServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, reply }: IProps) =>
      replyComment({ commentId, reply }),
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
