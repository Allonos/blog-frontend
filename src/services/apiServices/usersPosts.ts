import api from "@/src/services/api/api";
import type { userPostsTypesResponse } from "@/src/utils/types/userPostsTypes";

export const getUserPosts = async (
  userId: string,
): Promise<userPostsTypesResponse> => {
  const response = await api.get(`/post/get-posts-by-user/${userId}`);
  return response.data;
};
