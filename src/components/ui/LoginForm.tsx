import { Link } from "react-router-dom";
import type React from "react";

interface FormData {
  email: string;
  password: string;
}

interface IProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  isPending: boolean;
}

const LoginForm = ({ onSubmit, formData, onChange, isPending }: IProps) => {
  return (
    <section className="flex flex-col h-screen w-full items-center justify-center">
      <div className="bg-zinc-900 w-75 sm:w-125 rounded-2xl p-6">
        <h1 className="text-[30px] text-center font-medium">Welcome Back</h1>
        <p className="text-center text-[#9F9FA9]">
          Login to your account to continue
        </p>

        <form className="py-6" onSubmit={onSubmit}>
          <div className="py-2">
            <label className="block pb-1 text-[14px]">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              className="bg-zinc-800 py-2 px-1 pl-2 rounded-lg text-[14px] w-full"
            />
          </div>

          <div className="py-2">
            <label className="block pb-1 text-[14px]">Password</label>
            <input
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={(e) => onChange("password", e.target.value)}
              className="bg-zinc-800 py-2 px-1 pl-2 rounded-lg text-[14px] w-full"
            />
          </div>

          <button
            type="submit"
            className={`w-full mt-2 px-4 py-2 bg-blue-600 rounded-lg text-[14px] ${
              isPending ? "cursor-not-allowed" : "cursor-pointer"
            } hover:bg-blue-700 transition-colors duration-200`}
            disabled={isPending}
          >
            {isPending ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="flex items-center justify-center gap-1">
          <p className="text-[14px] text-[#9F9FA9]">Don't have an account?</p>
          <Link
            to="/signup"
            className="text-blue-600 text-[14px] cursor-pointer"
          >
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
