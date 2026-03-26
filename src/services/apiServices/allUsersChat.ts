import api from "@/src/services/api/api";

interface IProps {
  page: number;
}

export const getAllUsersChat = async ({ page }: IProps) => {
  const response = await api.get("/user", {
    params: { page, limit: 14 },
  });
  return response.data;
};
