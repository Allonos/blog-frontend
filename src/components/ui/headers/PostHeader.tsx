import defaultProfilePic from "@/public/assets/jpg/avatar.jpg";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const formatCreatedAt = (createdAt: string) => {
  const createdDate = dayjs(createdAt);
  const daysDifference = dayjs().startOf("day").diff(
    createdDate.startOf("day"),
    "day",
  );

  if (daysDifference === 1) {
    return "yesterday";
  }

  return createdDate.fromNow();
};

interface IProps {
  profilePic: string;
  username: string;
  createdAt: string;
}

const PostHeader = ({ profilePic, username, createdAt }: IProps) => {
  return (
    <div className="flex gap-2 items-center">
      <img
        src={profilePic !== "" ? profilePic : defaultProfilePic}
        alt="profile"
        className="w-10 h-10 rounded-full border border-zinc-700"
      />
      <div className="flex gap-0.5 flex-col">
        <h3 className="text-[16px] font-semibold">
          {username}
        </h3>
        <p className="text-[14px] text-[#71717B]">
          {formatCreatedAt(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default PostHeader;
