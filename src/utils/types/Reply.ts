export interface replyTypes {
  createdAt: string;
  text: string;
  updatedAt: string;
  _id: string;
  author: authorType;
}

interface authorType {
  _id: string;
  profilePic: string;
  username: string;
}
