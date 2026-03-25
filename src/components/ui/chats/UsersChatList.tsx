import defaultImage from "@/public/assets/jpg/avatar.jpg";
import { useAllUsersChatServiceQuery } from "@/src/services/react-query/chat/query/useAllUsersChatServiceQuery";
import type { checkUserTypes } from "@/src/utils/types/checkUserTypes";
import ChatSkeletons from "@/src/components/ui/skeletons/ChatSkeleton";

const UsersChatList = () => {
  const { data: users, isLoading } = useAllUsersChatServiceQuery();

  console.log(users);

  if (isLoading) {
    return <ChatSkeletons />;
  }

  const lastItem = users.length - 1;

  return (
    <>
      {users.map((user: checkUserTypes, index: number) => (
        <div
          key={user._id}
          className={`py-2 px-6 flex gap-2 items-center border-b ${
            index === lastItem ? "border-b-0" : ""
          } border-zinc-800 hover:bg-zinc-800 cursor-pointer transition-colors duration-200`}
        >
          <img
            src={user.profilePic || defaultImage}
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />
          <h3>{user.username}</h3>
        </div>
      ))}
    </>
  );
};

export default UsersChatList;
