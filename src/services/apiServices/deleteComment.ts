import api from "@/src/services/api/api";

interface IProps {
  commentId: string;
}

export const deleteComment = async ({ commentId }: IProps) => {
  const response = await api.delete(`/comment/delete/${commentId}`);
  return response.data;
};
