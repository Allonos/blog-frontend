import api from "@/src/services/api/api";

interface IProps {
  id: string;
  description: string;
  image?: File | null;
}

export const createPost = async ({ description, image }: IProps) => {
  const formData = new FormData();
  formData.append("description", description);
  if (image) {
    formData.append("image", image);
  }

  const response = await api.post("/post/create", formData);
  return response.data;
};
