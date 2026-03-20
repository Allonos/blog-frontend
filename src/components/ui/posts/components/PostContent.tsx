import { HeartIcon, MessageCircle } from "lucide-react";
import Comment from "@/src/components/ui/comments/Comment";
import { useLikePostServiceMutation } from "@/src/services/react-query/home/mutation/useLikePostServiceMutation";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useState } from "react";
import type { commentType } from "@/src/utils/types/postTypes";

interface IProps {
  description: string;
  postId: string;
  likes: string[];
  comments: commentType[];
  image: string | null;
}

const COMMENTS_LIMIT = 3;

const PostContent = (
  { description, postId, image, likes, comments }: IProps,
) => {
  const { mutate: likePost } = useLikePostServiceMutation();
  const [likesCount, setLikesCount] = useState(likes.length);
  const [showAll, setShowAll] = useState(false);

  const { authUser } = useAuthStore();

  const [isLiked, setIsLiked] = useState(
    authUser ? likes.includes(authUser._id) : false,
  );

  const visibleComments = showAll
    ? comments
    : comments.slice(0, COMMENTS_LIMIT);

  return (
    <div className="mt-3">
      <p className="text-[#D4D4D8] text-[16px]">{description}</p>
      {image && (
        <img
          src={image}
          alt={`post ${postId}`}
          className="max-h-100 rounded-lg mt-3 object-cover w-full"
        />
      )}

      <div className="mt-4 flex gap-4 pb-3">
        <div className="flex items-center gap-1">
          <button
            className=" cursor-pointer"
            onClick={() => {
              likePost({ postId });
              setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
              setIsLiked(!isLiked);
            }}
          >
            <HeartIcon
              width={20}
              height={20}
              fill={isLiked ? "red" : "none"}
              stroke="red"
            />
          </button>
          <h5 className="text-[14px]">{likesCount}</h5>
        </div>
        <div className="flex items-center gap-1 ">
          <MessageCircle width={17} height={17} />
          <h5 className="text-[14px]">{comments.length}</h5>
        </div>
      </div>
      <div className="w-full h-px bg-zinc-700 mt-4" />
      {comments.length > 0 && (
        <div>
          {visibleComments.map((comment) => (
            <Comment postId={postId} key={comment._id} comment={comment} />
          ))}
          {comments.length > COMMENTS_LIMIT && (
            <button
              className="mt-3 text-[13px] text-[#71717B] hover:text-white transition-colors duration-150 cursor-pointer"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll
                ? "Show less"
                : `Show ${comments.length - COMMENTS_LIMIT} more comment${
                  comments.length - COMMENTS_LIMIT > 1 ? "s" : ""
                }`}
            </button>
          )}
        </div>
      )}
      {comments.length === 0 && (
        <div className="pt-4">
          <p className="text-zinc-400 text-[14px]">No comments yet</p>
        </div>
      )}
    </div>
  );
};

export default PostContent;
