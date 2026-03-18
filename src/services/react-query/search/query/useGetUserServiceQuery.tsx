import { getSearchedUsers } from "@/src/services/apiServices/searchUsers";
import { useQuery } from "@tanstack/react-query";

export interface SearchedUser {
  _id: string;
  username: string;
  email?: string;
  profilePic?: string;
}

export const useGetUserServiceQuery = (query: string) => {
  const normalizedQuery = query.trim();

  return useQuery<SearchedUser[]>({
    queryKey: ["search-users", normalizedQuery],
    queryFn: () => getSearchedUsers(normalizedQuery),
    enabled: normalizedQuery.length > 0,
  });
};
