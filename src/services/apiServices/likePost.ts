import api from "@/src/services/api/api";

interface IProps {
  postId: string;
}

export const likePost = async ({ postId }: IProps) => {
  const response = await api.post(`/post/like/${postId}`);
  return response.data;
};
