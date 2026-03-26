export interface MessageType {
  _id: string;
  senderId: string;
  recieverId: {
    _id: string;
    profilePic?: string;
    username: string;
  };
  text: string;
  image?: string;
  createdAt: string;
}

export interface MessagePageResponse {
  messages: MessageType[];
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}
