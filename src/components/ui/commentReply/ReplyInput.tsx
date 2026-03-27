import CommentReply from "@/src/components/ui/commentReply/CommentReply";
import type { replyTypes } from "@/src/utils/types/Reply";
import { useState } from "react";
import { useReplyOnCommentServiceMutation } from "@/src/services/react-query/home/mutation/useReplyOnCommentServiceMutation";
import defaultProfilePic from "@/src/assets/jpg/avatar.jpg";
import { useAuthStore } from "@/src/store/useAuthStore";
import type { commentType } from "@/src/utils/types/postTypes";

interface IProps {
  postId: string;
  comment: commentType;
}

const ReplyInput = ({ postId, comment }: IProps) => {
  const [reply, setReply] = useState<string>("");

  const { mutate: replyOnComment } = useReplyOnCommentServiceMutation();

  const handleReply = () => {
    setReply(reply);
    replyOnComment({ postId, commentId: comment._id, reply });
    setReply("");
  };

  const { authUser } = useAuthStore();

  return (
    <div className="pl-10 pt-2">
      {comment.replies.map((reply: replyTypes) => (
        <CommentReply
          key={reply._id}
          reply={reply}
          postId={postId}
          commentId={comment._id}
        />
      ))}
      <div className="flex gap-2 items-center mt-4">
        <img
          src={authUser?.profilePic || defaultProfilePic}
          className="w-6 h-6 rounded-full border border-zinc-700"
          alt="profile pic"
        />
        <div className="flex items-center gap-2 flex-1 ml-2">
          <div className="flex-1">
            <textarea
              placeholder="Write a reply..."
              rows={1}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = el.scrollHeight + "px";
              }}
              className="w-full bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-700 rounded-md px-2 py-1 resize-none overflow-hidden"
            />
          </div>
          <div>
            <button
              className="bg-blue-500 text-white px-2 py-1 text-[14px] rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-200"
              onClick={handleReply}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyInput;
