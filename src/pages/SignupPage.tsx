import SignupForm from "@/src/components/ui/SignupForm";
import { useState } from "react";
import { useSignupServiceMutation } from "../services/react-query/signup/mutation/useSignupServiceMutation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const { mutate: signup, isPending } = useSignupServiceMutation();
  const navigate = useNavigate();

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signup(
      {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      },
      {
        onSuccess: () => navigate("/login"),
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Signup failed");
          } else {
            toast.error("Signup failed");
          }
        },
      },
    );
  };

  return (
    <SignupForm
      onSubmit={handleSignup}
      formData={formData}
      onChange={handleChange}
      isPending={isPending}
    />
  );
};

export default SignupPage;
