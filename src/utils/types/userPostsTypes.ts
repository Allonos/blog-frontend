import type { postTypes } from "@/src/utils/types/postTypes";

export interface userPostsTypesResponse {
  bio: string;
  email: string;
  profilePic: string;
  username: string;
  posts: postTypes[];
}
