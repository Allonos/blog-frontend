import defaultAvatar from "@/public/assets/jpg/avatar.jpg";
import { Link } from "react-router-dom";

interface IProps {
  recieverId: string;
  recieverImg?: string;
  recieverUsername?: string;
}

const ChatHeader = ({ recieverId, recieverImg, recieverUsername }: IProps) => {
  return (
    <div className="border-b border-zinc-800 p-2 flex items-center gap-2">
      <Link
        to={`/profile/${recieverId}`}
        className="flex items-center gap-4 cursor-pointer"
      >
        <img
          src={recieverImg || defaultAvatar}
          alt={recieverUsername}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="hover:underline text-[14px] font-medium">
          {recieverUsername}
        </h2>
      </Link>
    </div>
  );
};

export default ChatHeader;
