import api from "@/src/services/api/api";

interface IProps {
  id: string;
}

export const getMessages = async ({ id }: IProps) => {
  const response = await api.get(`/message/get-messages/${id}`);
  return response.data;
};
