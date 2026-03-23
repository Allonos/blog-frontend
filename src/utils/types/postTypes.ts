export interface commentType {
  _id: string;
  author: {
    _id: string;
    username: string;
    profilePic: string;
  };
  text: string;
  replies: [];
  createdAt: string;
}

export interface postTypes {
  author: {
    username: string;
    profilePic: string;
    _id: string;
  };
  comments: commentType[];
  image: string | null;
  createdAt: string;
  description: string;
  likes: string[];
  updatedAt: string;
  _id: string;
  __v: number;
}

export interface getAllPostsResponse {
  posts: postTypes[];
  nextCursor: string | null;
  hasNextPage: boolean;
}
