import { createPost } from "@/src/services/apiServices/createPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IProps {
  id: string;
  description: string;
  image?: string | null;
}

export const useCreatePostServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, description, image }: IProps) =>
      createPost({ id, description, image }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
    },
  });
};
