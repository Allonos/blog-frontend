import api from "@/src/services/api/api";

interface IUpdateProfileData {
  profilePic?: string;
  username?: string;
  bio?: string;
}

export const updateProfile = async (id: string, data: IUpdateProfileData) => {
  const response = await api.patch(`/user/update/${id}`, data);
  return response.data;
};
