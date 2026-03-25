import api from "@/src/services/api/api";

interface IProps {
  id: string;
  description: string;
  image?: string | null;
}

export const createPost = async ({ id, description, image }: IProps) => {
  const response = await api.post("/post/create", {
    id,
    description,
    ...(image && { image }),
  });

  return response.data;
};
