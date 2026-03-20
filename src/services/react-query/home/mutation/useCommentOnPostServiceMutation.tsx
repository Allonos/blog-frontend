import { commentOnPost } from "@/src/services/apiServices/comment";
import { getPostById } from "@/src/services/apiServices/getPostById";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  getAllPostsResponse,
  postTypes,
} from "@/src/utils/types/postTypes";

interface IProps {
  postId: string;
  comment: string;
}

export const useCommentOnPostServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, comment }: IProps) =>
      commentOnPost({ postId, comment }),
    onSuccess: async (_, { postId }) => {
      const updatedPost: postTypes = await getPostById({ postId });

      queryClient.setQueryData<getAllPostsResponse>(
        ["get-all-posts"],
        (old) => {
          if (!old) return old;

          const posts = Array.isArray(old) ? old : old.posts;
          const updated = posts.map((p) => p._id === postId ? updatedPost : p);

          return Array.isArray(old) ? updated : { ...old, posts: updated };
        },
      );
    },
  });
};
