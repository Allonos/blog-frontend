import api from "@/src/services/api/api";

interface IUpdateProfileData {
  profilePic?: File;
  username?: string;
  bio?: string;
}

export const updateProfile = async (id: string, data: IUpdateProfileData) => {
  const formData = new FormData();
  if (data.username) formData.append("username", data.username);
  if (data.bio) formData.append("bio", data.bio);
  if (data.profilePic) formData.append("profilePic", data.profilePic);

  const response = await api.patch(`/user/update/${id}`, formData);
  return response.data;
};
