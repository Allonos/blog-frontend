import defaultProfilePic from "@/public/assets/jpg/avatar.jpg";
import CommentReply from "../commentReply/CommentReply";
import type { commentType } from "@/src/utils/types/postTypes";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface IProps {
  comment: commentType;
}

const Comment = ({ comment }: IProps) => {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="pt-4">
      <div className="pt-1 flex gap-2">
        <img
          src={
            comment.author.profilePic !== ""
              ? comment.author.profilePic
              : defaultProfilePic
          }
          alt="profile"
          className="w-8 h-8 rounded-full border border-zinc-700"
        />
        <div className="flex flex-col gap-2 bg-[#27272A] w-full rounded-lg p-3">
          <div className="flex flex-col gap-1">
            <h4 className="text-[14px] font-semibold">
              {comment.author.username}
            </h4>
            <p className="text-[14px] font-medium text-[#D4D4D8]">
              {comment.text}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <h4 className="text-[12px] text-[#71717B]">
              {dayjs(comment.createdAt).fromNow()}
            </h4>
            <button
              className="text-[12px] text-[#71717B] hover:text-white transition-colors duration-150 cursor-pointer"
              onClick={() => setShowReply((prev) => !prev)}
            >
              {showReply ? "Hide reply" : "Reply"}
            </button>
          </div>
        </div>
      </div>

      {showReply && (
        <div className="pl-10 pt-2">
          <CommentReply />
        </div>
      )}
    </div>
  );
};

export default Comment;
