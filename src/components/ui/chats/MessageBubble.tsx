import defaultImage from "@/public/assets/jpg/avatar.jpg";
import type { MessageType } from "@/src/utils/types/messageTypes";
import dayjs from "dayjs";

interface IProps {
  message: MessageType;
  isMyMessage: boolean;
  profilePic: string;
}

const MessageBubble = ({ message, isMyMessage, profilePic }: IProps) => {
  return (
    <div
      className={`flex items-end gap-2 p-4 mb-4 ${
        isMyMessage ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <img
        src={profilePic || defaultImage}
        alt="avatar"
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
      <div
        className={`flex flex-col gap-1 max-w-[70%] ${
          isMyMessage ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-2 rounded-2xl text-sm break-words ${
            isMyMessage
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-zinc-700 text-zinc-100 rounded-bl-sm"
          }`}
        >
          {message.image && (
            <img
              src={message.image}
              alt="attachment"
              className="max-w-xs rounded-lg mb-1"
            />
          )}
          {message.text && <p>{message.text}</p>}
        </div>
        <span className="text-xs text-zinc-500">
          {dayjs(message.createdAt).format("h:mm A")}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
