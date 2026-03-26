import { useEffect, useRef, useState } from "react";
import defaultProfilePic from "@/public/assets/jpg/avatar.jpg";
import {
  type SearchedUser,
  useGetUserServiceQuery,
} from "@/src/services/react-query/search/query/useGetUserServiceQuery";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUserServiceQuery(query);

  const users: SearchedUser[] = data?.pages?.flatMap((page) => page.users) ??
    [];
  const shouldShowResults = query.trim().length > 0;
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  return (
    <div className="sticky w-87.5 top-25 right-0 bg-zinc-900 p-6 rounded-lg">
      <h2 className="text-[20px] font-semibold pb-4">Search Users</h2>
      <input
        type="text"
        placeholder="Search by username"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full p-2 rounded-md border-zinc-600 bg-zinc-800 text-[14px] text-white border"
      />

      {users.length === 0 && !isLoading && shouldShowResults && (
        <p>No user found</p>
      )}

      {users.length === 0 && !isLoading && !shouldShowResults && (
        <p className="text-[14px] text-[#71717B] pt-2 text-center">
          Start typing to search for users...
        </p>
      )}

      {!isLoading && (
        <div className="pt-4 space-y-3 max-h-80 overflow-y-auto pr-1 no-scrollbar">
          {users.map((user: SearchedUser) => (
            <div
              key={user._id}
              onClick={() => navigate(`/profile/${user._id}`)}
              className="flex items-center gap-3 p-2 rounded-md bg-zinc-800 cursor-pointer hover:bg-zinc-700 transition-colors duration-150"
            >
              <img
                src={user.profilePic || defaultProfilePic}
                alt={user.username}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="text-[14px] text-white truncate">
                  {user.username}
                </p>
              </div>
            </div>
          ))}
          {isFetchingNextPage && (
            <div className="flex items-center gap-3 p-2 rounded-md bg-zinc-800 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-zinc-700" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-zinc-700 rounded w-3/4" />
                <div className="h-4 bg-zinc-700 rounded w-1/2" />
              </div>
            </div>
          )}
          <div ref={sentinelRef} />
        </div>
      )}
      {isLoading && (
        <div className="pt-4 space-y-3 max-h-80 overflow-y-auto pr-1 no-scrollbar">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-md bg-zinc-800 animate-pulse"
            >
              <div className="w-9 h-9 rounded-full bg-zinc-700" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-zinc-700 rounded w-3/4" />
                <div className="h-4 bg-zinc-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
