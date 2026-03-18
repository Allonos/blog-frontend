import { updateProfile } from "@/src/services/apiServices/updateProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IUpdateProfileData {
  profilePic?: string;
  username?: string;
  bio?: string;
}

interface IProps {
  id: string;
  data: IUpdateProfileData;
}

export const useUpdateProfileServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: IProps) => updateProfile(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-posts", variables.id],
      });
    },
  });
};
