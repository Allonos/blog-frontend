import { getAllUsersChat } from "@/src/services/apiServices/allUsersChat";
import { useQuery } from "@tanstack/react-query";

export const useAllUsersChatServiceQuery = () => {
  return useQuery({
    queryKey: ["all-users-chat"],
    queryFn: () => getAllUsersChat(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
