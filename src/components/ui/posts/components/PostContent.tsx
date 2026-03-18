import defaultProfilePic from "@/public/assets/jpg/avatar.jpg";
import { HeartIcon, MessageCircle } from "lucide-react";
import Comment from "@/src/components/ui/comments/Comment";

interface IProps {
  description: string;
  postId: string;
  likes: number;
  comments: [];
}

const PostContent = ({ description, postId, likes, comments }: IProps) => {
  return (
    <div className="mt-3">
      <p className="text-[#D4D4D8] text-[16px]">{description}</p>
      <img
        src={defaultProfilePic}
        alt={`post ${postId}`}
        className="h-100 rounded-lg mt-3 object-cover w-full"
      />

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
