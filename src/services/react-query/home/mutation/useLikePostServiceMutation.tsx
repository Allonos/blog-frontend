import { likePost } from "@/src/services/apiServices/likePost";
import { useMutation } from "@tanstack/react-query";

interface IProps {
  postId: string;
}

export const useLikePostServiceMutation = () => {
  return useMutation({
    mutationFn: ({ postId }: IProps) => likePost({ postId }),
  });
};
