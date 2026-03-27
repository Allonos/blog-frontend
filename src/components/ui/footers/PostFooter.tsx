import { useAuthStore } from "@/src/store/useAuthStore";

import defaultProfilePic from "@/src/assets/jpg/avatar.jpg";
import { useCommentOnPostServiceMutation } from "@/src/services/react-query/home/mutation/useCommentOnPostServiceMutation";
import { useState } from "react";

interface IProps {
  postId: string;
}

const PostFooter = ({ postId }: IProps) => {
  const { authUser } = useAuthStore();
  const [comment, setComment] = useState<string>("");
  const { mutate: commentOnPost } = useCommentOnPostServiceMutation();

  const handleComment = (comment: string) => {
    setComment(comment);
    commentOnPost({ postId, comment });
    setComment("");
  };

  return (
    <div className="mt-4 flex gap-4 items-center">
      <img
        src={authUser?.profilePic || defaultProfilePic}
        className="w-8 h-8 rounded-full border border-zinc-700"
        alt="profile pic"
      />
      <div className="flex-1">
        <textarea
          placeholder="Write a comment..."
          rows={1}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
          }}
          className="w-full bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-700 rounded-md p-2 resize-none overflow-hidden"
        />
      </div>
      <div>
        <button
          className="bg-blue-500 text-white px-3 py-2 text-[14px] rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-200"
          onClick={() => handleComment(comment)}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostFooter;
