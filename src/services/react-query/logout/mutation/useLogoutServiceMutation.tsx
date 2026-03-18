import { logout } from "@/src/services/apiServices/logout";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogoutServiceMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      navigate("/login");
    },
  });
};
