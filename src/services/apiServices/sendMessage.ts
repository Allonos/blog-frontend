import api from "@/src/services/api/api";

interface IProps {
  id: string;
  text: string;
  image: string;
}

export const sendMessage = async ({ id, text, image }: IProps) => {
  const response = await api.post(`/message/send-message/${id}`, {
    text,
    image,
  });
  return response.data;
};
