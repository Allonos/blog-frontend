import api from "@/src/services/api/api";

export const getAllUsersChat = async () => {
  const response = await api.get("/user");
  return response.data;
};
