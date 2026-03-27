import defaultProfilePic from "@/src/assets/jpg/avatar.jpg";
import { useDeletePostServiceMutation } from "@/src/services/react-query/usersPosts/query/useGetUserPostsServiceQuery";
import { useAuthStore } from "@/src/store/useAuthStore";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

const formatCreatedAt = (createdAt: string) => {
  const createdDate = dayjs(createdAt);
  const daysDifference = dayjs().startOf("day").diff(
    createdDate.startOf("day"),
    "day",
  );

  if (daysDifference === 1) return "yesterday";
  if (daysDifference >= 2 && daysDifference < 7) {
    return `${daysDifference} days ago`;
  }
  if (daysDifference === 7) return "1 week ago";
  if (daysDifference > 7) return createdDate.format("DD/MM/YYYY");

  return createdDate.fromNow();
};

interface IProps {
  postId: string;
  userId: string;
  profilePic: string;
  username: string;
  createdAt: string;
}

const PostHeader = (
  { profilePic, username, createdAt, userId, postId }: IProps,
) => {
  const [isPostSettingsOpen, setIsPostSettingsOpen] = useState(false);

  const toggleSettingsOpen = () => {
    setIsPostSettingsOpen((prev) => !prev);
  };

  const { authUser } = useAuthStore();

  let postIsUsers = false;

  if (authUser?._id === userId) {
    postIsUsers = true;
  }

  const { mutate: deletePost } = useDeletePostServiceMutation();

  const handleDeletePost = () => {
    deletePost({ postId }, {
      onSuccess: () => toast.success("Post deleted successfully!"),
    });
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <Link to={`/profile/${userId}`}>
          <img
            src={profilePic !== "" ? profilePic : defaultProfilePic}
            alt="profile"
            className="w-10 h-10 rounded-full border border-zinc-700"
          />
        </Link>
        <div className="flex gap-0.5 flex-col">
          <Link to={`/profile/${userId}`}>
            <h3 className="text-[16px] font-semibold">
              {username}
            </h3>
          </Link>
          <p className="text-[14px] text-[#71717B]">
            {formatCreatedAt(createdAt)}
          </p>
        </div>
      </div>
      {postIsUsers && (
        <div className="relative">
          <div className="cursor-pointer " onClick={toggleSettingsOpen}>
            <Ellipsis width={20} height={20} />
          </div>
          {isPostSettingsOpen && (
            <div
              onClick={handleDeletePost}
              className="absolute w-30 bg-zinc-800 z-10 right-0 px-3 py-1 text-center cursor-pointer rounded-md hover:bg-zinc-700 transition-colors duration-200 "
            >
              <h4 className="font-semibold text-[14px] text-red-500">
                Delete Post
              </h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostHeader;
