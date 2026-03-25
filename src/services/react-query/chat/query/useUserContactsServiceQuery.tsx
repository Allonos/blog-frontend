import { getUserContacts } from "@/src/services/apiServices/userContacts";
import { useQuery } from "@tanstack/react-query";

export const useGetUsersContactsServiceQuery = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: () => getUserContacts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
