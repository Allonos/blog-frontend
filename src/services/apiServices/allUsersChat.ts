import api from "../api/api";

export const getAllUsersChat = async () => {
  const response = await api.get("/user");
  return response.data;
};
