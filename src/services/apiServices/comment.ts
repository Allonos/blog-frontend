import api from "@/src/services/api/api";

interface IProps {
  postId: string;
  comment: string;
}

export const commentOnPost = async ({ postId, comment }: IProps) => {
  const response = await api.post(`/comment/${postId}`, { comment });

  return response.data;
};
