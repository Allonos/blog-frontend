import defaultImage from "@/src/assets/jpg/avatar.jpg";
import type { MessageType } from "@/src/utils/types/messageTypes";
import dayjs from "dayjs";

const formatMessageTime = (createdAt: string) => {
  const createdDate = dayjs(createdAt);
  const daysDifference = dayjs().startOf("day").diff(
    createdDate.startOf("day"),
    "day",
  );

  if (daysDifference === 0) return createdDate.format("h:mm A");
  if (daysDifference === 1) return `Yesterday ${createdDate.format("h:mm A")}`;
  if (daysDifference >= 2 && daysDifference < 7) {
    return `${daysDifference} days ago`;
  }
  if (daysDifference === 7) return "1 week ago";
  return createdDate.format("DD/MM/YYYY");
};

interface IProps {
  message: MessageType;
  isMyMessage: boolean;
  profilePic: string;
}

const MessageBubble = ({ message, isMyMessage, profilePic }: IProps) => {
  return (
    <div
      className={`flex items-end gap-2 p-2 md:p-4 mb-4 ${
        isMyMessage ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <img
        src={profilePic || defaultImage}
        alt="avatar"
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
      <div
        className={`flex flex-col gap-1 max-w-[70%] ${
          isMyMessage ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-2 py-1 md:px-4 md:py-2 rounded-2xl text-sm wrap-break-word ${
            isMyMessage
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-zinc-700 text-zinc-100 rounded-bl-sm"
          }`}
        >
          {message.image && (
            <img
              src={message.image}
              alt="attachment"
              className="md:max-w-xs rounded-lg mb-1"
            />
          )}
          {message.text && <p>{message.text}</p>}
        </div>
        <span className="text-xs text-zinc-500">
          {formatMessageTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
