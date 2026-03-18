import api from "@/src/services/api/api";
import type { getAllPostsResponse } from "../types/postTypes";

export const getAllPosts = async (): Promise<getAllPostsResponse> => {
  const response = await api.get("/post/get-all-posts");
  return response.data;
};
