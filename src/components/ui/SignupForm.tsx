import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
    <section className="flex flex-col h-screen w-full items-center justify-center">
      <div className="bg-zinc-900 w-75 sm:w-125 rounded-2xl p-6">
        <h1 className="text-[30px] text-center font-semibold">Signup</h1>
        <p className="text-center text-[#9F9FA9]">
          Sign up to start sharing your thoughts
        </p>
        <form className="py-6">
          <div className="py-2">
            <label className="block pb-1 text-[14px]">Username</label>
            <input
              type="text"
              placeholder="johndoe"
              className="bg-zinc-800 py-2 px-1 pl-2 rounded-lg text-[14px] w-full"
            />
          </div>
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
            <p className="text-[12px] py-1 text-[#71717B]">
              Must be at least 6 characters
            </p>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 rounded-lg text-[14px]"
          >
            Signup
          </button>
        </form>

        <div className="flex items-center justify-center gap-1">
          <p className="text-[14px] text-[#9F9FA9]">Already have an account?</p>
          <Link to="/login" className="text-blue-600 text-[14px]">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
