export interface postTypes {
  author: {
    username: string;
    profilePic: string;
    _id: string;
  };
  comments: [];
  image: string | null;
  createdAt: string;
  description: string;
  likes: string[];
  updatedAt: string;
  _id: string;
  __v: number;
}

export type getAllPostsResponse =
  | {
      posts: postTypes[];
    }
  | postTypes[];
