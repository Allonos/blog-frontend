import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLogin } from "@/src/services/apiServices/login";
import { useAuthStore } from "@/src/store/useAuthStore";

interface IProps {
  email: string;
  password: string;
}

export const useLoginServiceMutation = () => {
  const queryClient = useQueryClient();
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  return useMutation({
    mutationFn: ({ email, password }: IProps) => getLogin({ email, password }),
    onSuccess: (data) => {
      setAuthUser(data);
      queryClient.invalidateQueries({ queryKey: ["checkAuth"] });
      queryClient.removeQueries({ queryKey: ["get-all-posts"] });
    },
  });
};
