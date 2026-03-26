import api from "@/src/services/api/api";

interface IProps {
  id: string;
  page: number;
}

export const getMessages = async ({ id, page = 1 }: IProps) => {
  const response = await api.get(`/message/get-messages/${id}`, {
    params: { page, limit: 10 },
  });
  return response.data;
};
