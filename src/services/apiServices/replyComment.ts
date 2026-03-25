import api from "@/src/services/api/api";

interface IProps {
  commentId: string;
  reply: string;
}

export const replyComment = async ({ commentId, reply }: IProps) => {
  const response = await api.post(`/comment/reply/${commentId}`, { reply });
  return response.data;
};
