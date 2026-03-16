import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <section className="flex flex-col h-screen w-full items-center justify-center">
      <div className="bg-zinc-900 w-75 sm:w-125 rounded-2xl p-6">
        <h1 className="text-[30px] text-center font-medium">Welcome Back</h1>
        <p className="text-center text-[#9F9FA9]">
          Login to your account to continue
        </p>
        <form className="py-6">
          <div className="py-2">
            <label className="block pb-1 text-[14px]">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-zinc-800 py-2 px-1 pl-2 rounded-lg text-[14px] w-full"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-[14px]">Password</label>
            <input
              type="password"
              placeholder="********"
              className="bg-zinc-800 py-2 px-1 pl-2 rounded-lg text-[14px] w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 bg-blue-600 rounded-lg text-[14px]"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center justify-center gap-1">
          <p className="text-[14px] text-[#9F9FA9]">Don't have an account?</p>
          <Link to="/signup" className="text-blue-600 text-[14px]">
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
