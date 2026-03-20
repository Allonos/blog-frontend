import { getPostById } from "@/src/services/apiServices/getPostById";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  postId: string;
}

export const useGetPostByIdServiceQuery = ({ postId }: IProps) => {
  return useQuery({
    queryKey: ["get-post-by-id", postId],
    queryFn: async () => getPostById({ postId }),
    enabled: !!postId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
