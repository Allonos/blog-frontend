import api from "@/src/services/api/api";
import type { userPostsTypesResponse } from "@/src/utils/types/userPostsTypes";

export const getUserPosts = async (
  userId: string,
  page: number = 1,
): Promise<userPostsTypesResponse> => {
  const response = await api.get(`/post/get-posts-by-user/${userId}`, {
    params: { page, limit: 10 },
  });
  return response.data;
};
