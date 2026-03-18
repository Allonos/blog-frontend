export interface postTypes {
  author: {
    username: string;
    profilePic: string;
    _id: string;
  };
  comments: [];
  createdAt: string;
  description: string;
  likes: number;
  updatedAt: string;
  _id: string;
  __v: number;
}

export type getAllPostsResponse =
  | {
      posts: postTypes[];
    }
  | postTypes[];
