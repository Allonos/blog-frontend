import type { postTypes } from "@/src/utils/types/postTypes";

export interface userPostsTypesResponse {
  username: string;
  email: string;
  profilePic: string;
  bio: string;
  posts: postTypes[];
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}
