import api from "@/src/services/api/api";

export const getSearchedUsers = async (query: string, page: number) => {
  const response = await api.get(
    `/user/find-user?username=${encodeURIComponent(query.trim())}`,
    { params: { page, limit: 10 } },
  );

  return response.data;
};
