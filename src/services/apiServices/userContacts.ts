import api from "@/src/services/api/api";

export const getUserContacts = async ({ page }: { page: number }) => {
  const response = await api.get("/user/contacts", {
    params: { page, limit: 14 },
  });
  return response.data;
};
