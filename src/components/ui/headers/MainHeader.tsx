import { useGetCheckAuthServiceQuery } from "@/src/services/react-query/checkAuth/query/useGetCheckAuthServiceQuery";
import { LogOutIcon, SquarePen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from "@/public/assets/jpg/avatar.jpg";
import { useLogoutServiceMutation } from "@/src/services/react-query/logout/mutation/useLogoutServiceMutation";

const MainHeader = () => {
  const navigate = useNavigate();
  const { data: checkAuth, isLoading } = useGetCheckAuthServiceQuery();
  const { mutate: logoutMutate } = useLogoutServiceMutation();

  const logout = () => {
    logoutMutate();
  };

  return (
    <div className="max-w-6xl flex flex-col justify-center items-center mx-auto">
      <div className="w-full py-3 flex items-center justify-between">
        <h1
          className="text-[20px] font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          BlogApp
        </h1>
        {!checkAuth && (
          <div className="flex gap-2 items-center">
            <Link
              to="/login"
              className="text-zinc-400 text-[14px] hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1 bg-blue-600 text-[14px] rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Signup
            </Link>
          </div>
        )}

        {checkAuth && !isLoading && (
          <div className="flex gap-2 items-center">
            <Link
              to="/create-post"
              className="flex gap-2 items-center hover:bg-zinc-800 px-2.5 py-1 rounded-lg transition-colors duration-200"
            >
              <SquarePen width={16} height={16} />
              <h3 className="text-[14px] text-[#9F9FA9]">Create</h3>
            </Link>
            <Link
              to={`/profile/${checkAuth._id}`}
              className="flex gap-2 items-center px-2.5 py-1 rounded-lg"
            >
              <img
                src={checkAuth.profilePic || defaultAvatar}
                alt="profile"
                className="w-6 h-6 rounded-full border border-zinc-600 object-cover"
              />
              <h3 className="text-[14px] text-[#D4D4D8]">
                {checkAuth.username}
              </h3>
            </Link>
            <button
              onClick={logout}
              className="cursor-pointer p-2 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
            >
              <LogOutIcon
                color="#9F9FA9"
                width={16}
                height={16}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
