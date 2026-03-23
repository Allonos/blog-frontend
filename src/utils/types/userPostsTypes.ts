import type { postTypes } from "@/src/utils/types/postTypes";

export interface userPostsTypesResponse {
  username: string;
  email: string;
  profilePic: string;
  bio: string;
  posts: postTypes[];
  nextCursor: string | null;
  hasNextPage: boolean;
}
