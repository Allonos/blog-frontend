import { useState } from "react";
import defaultProfilePic from "@/public/assets/jpg/avatar.jpg";
import {
  type SearchedUser,
  useGetUserServiceQuery,
} from "@/src/services/react-query/search/query/useGetUserServiceQuery";

const Search = () => {
  const [query, setQuery] = useState("");

  const {
    data,
    isLoading,
  } = useGetUserServiceQuery(query);

  const users: SearchedUser[] = data ?? [];

  const shouldShowResults = query.trim().length > 0;

  console.log(data);

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
        <div className="pt-4 space-y-3 max-h-54 overflow-y-auto pr-1">
          {users.map((user: SearchedUser) => (
            <div
              key={user._id}
              className="flex items-center gap-3 p-2 rounded-md bg-zinc-800"
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
        </div>
      )}
    </div>
  );
};

export default Search;
