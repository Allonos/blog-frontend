import api from "@/src/services/api/api";

interface IProps {
  commentId: string;
  replyId: string;
}

export const deleteReply = async ({ commentId, replyId }: IProps) => {
  const response = await api.delete(
    `/comment/reply/delete/${commentId}/${replyId}`,
  );
  return response.data;
};
