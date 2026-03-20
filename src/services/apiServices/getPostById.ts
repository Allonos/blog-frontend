import api from "../api/api";

interface IProps {
  postId: string;
}

export const getPostById = async ({ postId }: IProps) => {
  const response = await api.get(`post/get-post/${postId}`);
  return response.data;
};
