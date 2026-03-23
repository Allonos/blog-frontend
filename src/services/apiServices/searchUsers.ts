import api from "../api/api";

export const getSearchedUsers = async (query: string) => {
  const response = await api.get(
    `/user/find-user?username=${encodeURIComponent(query.trim())}`,
  );

  return response.data;
};
