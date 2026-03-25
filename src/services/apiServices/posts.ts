import api from "@/src/services/api/api";
import type { getAllPostsResponse } from "@/src/utils/types/postTypes";

export const getAllPosts = async (
  page: number = 1,
): Promise<getAllPostsResponse> => {
  const response = await api.get("/post/get-all-posts", {
    params: { page, limit: 10 },
  });
  return response.data;
};
