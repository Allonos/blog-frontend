import defaultProfilePic from "@/src/assets/jpg/avatar.jpg";

import type { commentType } from "@/src/utils/types/postTypes";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useDeleteCommentServiceMutation } from "@/src/services/react-query/post/mutation/useDeleteCommentServiceMutation";

import { Ellipsis } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReplyInput from "../commentReply/ReplyInput";

dayjs.extend(relativeTime);

interface IProps {
  comment: commentType;
  postId: string;
}

const Comment = ({ comment, postId }: IProps) => {
  const [showReply, setShowReply] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const { authUser } = useAuthStore();

  const { mutate: deleteComment } = useDeleteCommentServiceMutation();

  const navigate = useNavigate();

  return (
    <div className="pt-4">
      <div className="pt-1 flex gap-2">
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/profile/${comment.author._id}`)}
        >
          <img
            src={comment.author.profilePic !== ""
              ? comment.author.profilePic
              : defaultProfilePic}
            alt="profile"
            className="w-8 h-8 rounded-full border border-zinc-700"
          />
        </div>
        <div className="flex flex-col gap-2 bg-[#27272A] w-full rounded-lg p-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h4
                className="text-[14px] font-semibold cursor-pointer hover:underline"
                onClick={() => navigate(`/profile/${comment.author._id}`)}
              >
                {comment.author.username}
              </h4>
              {authUser?._id === comment.author._id && (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu((prev) => !prev)}
                    className="text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                  >
                    <Ellipsis size={16} />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 top-6 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-10 min-w-35">
                      <button
                        className="px-4 py-2 text-[13px] text-red-400 hover:bg-zinc-700 w-full text-left rounded-md cursor-pointer"
                        onClick={() => {
                          deleteComment({ postId, commentId: comment._id });
                          setShowMenu(false);
                        }}
                      >
                        Delete comment
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
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
              {showReply ? "Hide replies" : "Show replies"}
            </button>
          </div>
        </div>
      </div>

      {showReply && <ReplyInput postId={postId} comment={comment} />}
    </div>
  );
};

export default Comment;
