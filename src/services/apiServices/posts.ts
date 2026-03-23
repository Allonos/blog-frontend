import api from "@/src/services/api/api";
import type { getAllPostsResponse } from "../../utils/types/postTypes";

export const getAllPosts = async (
  cursor?: string,
): Promise<getAllPostsResponse> => {
  const response = await api.get("/post/get-all-posts", {
    params: { cursor, limit: 10 },
  });
  return response.data;
};
