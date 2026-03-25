import api from "@/src/services/api/api";

interface IProps {
  username: string;
  email: string;
  password: string;
}

export const getSignup = async ({ username, email, password }: IProps) => {
  const response = await api.post("/auth/signup", {
    username,
    email,
    password,
  });

  return response.data;
};
