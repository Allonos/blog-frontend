import api from "@/src/services/api/api";

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
