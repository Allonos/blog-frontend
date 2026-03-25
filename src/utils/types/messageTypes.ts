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
