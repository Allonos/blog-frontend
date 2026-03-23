import api from "@/src/services/api/api";
import type { userPostsTypesResponse } from "@/src/utils/types/userPostsTypes";

export const getUserPosts = async (
  userId: string,
  cursor?: string,
): Promise<userPostsTypesResponse> => {
  const response = await api.get(`/post/get-posts-by-user/${userId}`, {
    params: { cursor, limit: 10 },
  });
  return response.data;
};
