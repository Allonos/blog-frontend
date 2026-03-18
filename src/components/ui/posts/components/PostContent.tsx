import { HeartIcon, MessageCircle } from "lucide-react";
import Comment from "@/src/components/ui/comments/Comment";

interface IProps {
  description: string;
  postId: string;
  likes: number;
  comments: [];
  image: string | null;
}

const PostContent = (
  { description, postId, image, likes, comments }: IProps,
) => {
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
          <HeartIcon width={20} height={20} fill="red" stroke="red" />
          <h5 className="text-[14px]">{likes}</h5>
        </div>
        <div className="flex items-center gap-1 ">
          <MessageCircle width={17} height={17} />
          <h5 className="text-[14px]">{comments.length}</h5>
        </div>
      </div>
      {/* {post.comments.length > 0 && ( */}
      <Comment />
      {/* )} */}
    </div>
  );
};

export default PostContent;
