import api from "@/src/services/api/api";
import type { checkUserTypes } from "@/src/utils/types/checkUserTypes";

export const getCheckAuth = async (): Promise<checkUserTypes> => {
  const response = await api.get("/auth/check");
  return response.data;
};
