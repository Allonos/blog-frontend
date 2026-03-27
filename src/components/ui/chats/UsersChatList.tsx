import defaultImage from "@/src/assets/jpg/avatar.jpg";
import { useAllUsersChatServiceQuery } from "@/src/services/react-query/chat/query/useAllUsersChatServiceQuery";
import type { checkUserTypes } from "@/src/utils/types/checkUserTypes";
import ChatSkeletons from "@/src/components/ui/skeletons/ChatSkeleton";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const UsersChatList = () => {
  const {
    data: users,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAllUsersChatServiceQuery();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <ChatSkeletons />;
  }

  return (
    <>
      {users?.pages?.flatMap((page) => page.users)?.map((
        user: checkUserTypes,
      ) => (
        <Link
          to={`/messages/${user._id}`}
          key={user._id}
          className="py-2 px-6 flex gap-2 items-center border-b border-zinc-800 hover:bg-zinc-800 transition-colors duration-200"
        >
          <img
            src={user.profilePic || defaultImage}
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />
          <h3>{user.username}</h3>
        </Link>
      ))}
      <div ref={sentinelRef} />
      {isFetchingNextPage && <ChatSkeletons />}
    </>
  );
};

export default UsersChatList;
