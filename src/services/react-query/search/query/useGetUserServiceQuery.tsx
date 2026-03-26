import { getSearchedUsers } from "@/src/services/apiServices/searchUsers";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface SearchedUser {
  _id: string;
  username: string;
  email?: string;
  profilePic?: string;
}

interface SearchUsersPage {
  users: SearchedUser[];
  page: number;
  hasNextPage: boolean;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export const useGetUserServiceQuery = (query: string) => {
  const normalizedQuery = query.trim();

  return useInfiniteQuery<SearchUsersPage>({
    queryKey: ["search-users", normalizedQuery],
    queryFn: ({ pageParam }) =>
      getSearchedUsers(normalizedQuery, pageParam as number),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: normalizedQuery.length > 0,
  });
};
