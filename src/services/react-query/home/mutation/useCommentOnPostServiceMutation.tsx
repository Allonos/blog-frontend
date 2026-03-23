import { commentOnPost } from "@/src/services/apiServices/comment";
import { getPostById } from "@/src/services/apiServices/getPostById";
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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
