import api from "../api/api";

interface IProps {
  postId: string;
  userId: string;
}

export const deletePost = async ({ postId, userId }: IProps) => {
  const response = await api.delete(`/post/delete/${postId}`, {
    data: { userId },
  });
  return response.data;
};
