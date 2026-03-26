import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import defaultProfilePic from "@/public/assets/jpg/avatar.jpg";
import {
  type SearchedUser,
  useGetUserServiceQuery,
} from "@/src/services/react-query/search/query/useGetUserServiceQuery";

const DURATION = 200;

const SearchModal = ({ onClose }: { onClose: () => void }) => {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const { data, isLoading } = useGetUserServiceQuery(query);
  const navigate = useNavigate();
  const users: SearchedUser[] = data ?? [];
  const shouldShowResults = query.trim().length > 0;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, DURATION);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center pt-20 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={handleClose}
    >
      <div
        className={`bg-zinc-900 rounded-lg p-6 w-full max-w-md mx-4 transition-all duration-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-bold">Search users</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-md hover:bg-zinc-800 transition-colors duration-150"
          >
            <X width={18} height={18} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full p-2 rounded-md border-zinc-600 bg-zinc-800 text-[14px] text-white border"
        />

        {users.length === 0 && !isLoading && shouldShowResults && (
          <p className="text-[14px] text-[#71717B] pt-4">No user found</p>
        )}

        {users.length === 0 && !isLoading && !shouldShowResults && (
          <p className="text-[14px] text-[#71717B] pt-4">
            Start typing to search for users...
          </p>
        )}

        {!isLoading && shouldShowResults && (
          <div className="mt-4 space-y-3 max-h-54 overflow-y-auto p-2 rounded-lg bg-zinc-950 no-scrollbar">
            {users.map((user: SearchedUser) => (
              <div
                key={user._id}
                onClick={() => handleUserClick(user._id)}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
