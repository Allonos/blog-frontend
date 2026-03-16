import { getSignup } from "@/src/services/apiServices/signup";
import { useMutation } from "@tanstack/react-query";

interface IProps {
  username: string;
  email: string;
  password: string;
}

export const useSignupServiceMutation = () => {
  return useMutation({
    mutationFn: ({ username, email, password }: IProps) =>
      getSignup({ username, email, password }),
  });
};
