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
    <section className="flex flex-col h-screen  w-full items-center justify-center">
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

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-zinc-700" />
          <span className="text-[12px] text-[#71717B]">or</span>
          <div className="flex-1 h-px bg-zinc-700" />
        </div>

        <a
          href="http://localhost:8080/api/auth/google"
          className="flex items-center justify-center gap-2 w-full mb-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-[14px] transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-4 h-4 shrink-0"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Continue with Google
        </a>

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
