import { getCheckAuth } from "@/src/services/apiServices/checkAuth";
import type { checkUserTypes } from "@/src/utils/types/checkUserTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetCheckAuthServiceQuery = () => {
  return useQuery<checkUserTypes>({
    queryKey: ["checkAuth"],
    queryFn: () => getCheckAuth(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
