import { Link, useNavigate } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl flex flex-col justify-center items-center mx-auto">
      <div className="w-full py-3 flex items-center justify-between">
        <h1
          className="text-[20px] font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          BlogApp
        </h1>
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
      </div>
    </div>
  );
};

export default MainHeader;
