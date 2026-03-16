import LoginForm from "@/src/components/ui/LoginForm";
import { useLoginServiceMutation } from "../services/react-query/login/mutation/useLoginServiceMutation";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const { mutate: login, isPending } = useLoginServiceMutation();
  const navigate = useNavigate();

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(
      {
        email: formData.email.trim(),
        password: formData.password,
      },
      {
        onSuccess: () => navigate("/"),
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Login failed");
          } else {
            toast.error("Login failed");
          }
        },
      },
    );
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      formData={formData}
      onChange={handleChange}
      isPending={isPending}
    />
  );
};

export default LoginPage;
