import api from "../api/api";

interface IProps {
  email: string;
  password: string;
}

export const getLogin = async ({ email, password }: IProps) => {
  const response = await api.post("/auth/login", { email, password });

  return response.data;
};
