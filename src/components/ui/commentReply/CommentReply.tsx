import defaultProfilePic from "@/public/assets/jpg/avatar.jpg";
import type { replyTypes } from "@/src/utils/types/Reply";
import dayjs from "dayjs";
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useDeleteReplyServiceMutation } from "@/src/services/react-query/post/mutation/useDeleteReplyServiceMutation";
import { useNavigate } from "react-router-dom";

interface IProps {
  reply: replyTypes;
  postId: string;
  commentId: string;
}

const CommentReply = ({ reply, postId, commentId }: IProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const { authUser } = useAuthStore();
  const { mutate: deleteReply } = useDeleteReplyServiceMutation();

  const navigate = useNavigate();

  return (
    <div className="pt-1 flex gap-2">
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/profile/${reply.author._id}`)}
      >
        <img
          src={reply.author.profilePic || defaultProfilePic}
          alt="profile"
          className="w-8 h-8 rounded-full border border-zinc-700"
        />
      </div>
      <div className="flex flex-col gap-2 bg-[#27272A] w-full rounded-lg p-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h4
              className="text-[14px] font-semibold cursor-pointer hover:underline"
              onClick={() => navigate(`/profile/${reply.author._id}`)}
            >
              {reply.author.username}
            </h4>
            {authUser?._id === reply.author._id && (
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
                        deleteReply({ postId, commentId, replyId: reply._id });
                        setShowMenu(false);
                      }}
                    >
                      Delete reply
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="text-[14px] font-medium text-[#D4D4D8]">
            {reply.text}
          </p>
        </div>
        <h4 className="text-[12px] text-[#71717B]">
          {dayjs(reply.createdAt).fromNow()}
        </h4>
      </div>
    </div>
  );
};

export default CommentReply;
