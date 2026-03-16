import { useMutation } from "@tanstack/react-query";
import { getLogin } from "@/src/services/apiServices/login";

interface IProps {
  email: string;
  password: string;
}

export const useLoginServiceMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: IProps) => getLogin({ email, password }),
  });
};
