import api from "../api/api";

export const getUserContacts = async () => {
  const response = await api.get("/user/contacts");
  return response.data;
};
