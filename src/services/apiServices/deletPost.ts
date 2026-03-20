import api from "../api/api";

interface IProps {
  postId: string;
}

export const deletePost = async ({ postId }: IProps) => {
  const response = await api.delete(`/post/delete/${postId}`);
  return response.data;
};
