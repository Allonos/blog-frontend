import api from "../api/api";

type UserLike = {
  _id?: string;
  id?: string;
  username?: string;
  email?: string;
  profilePic?: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const toUserArray = (payload: unknown): UserLike[] => {
  if (Array.isArray(payload)) {
    return payload as UserLike[];
  }

  if (!isRecord(payload)) {
    return [];
  }

  const candidates: unknown[] = [
    payload.users,
    payload.user,
    payload.data,
    isRecord(payload.data) ? payload.data.users : undefined,
    isRecord(payload.data) ? payload.data.user : undefined,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate as UserLike[];
    }

    if (isRecord(candidate)) {
      return [candidate as UserLike];
    }
  }

  return [];
};

export const getSearchedUsers = async (query: string) => {
  const response = await api.get(
    `/user/find-user?username=${encodeURIComponent(query.trim())}`,
  );

  return toUserArray(response.data)
    .filter((user) => typeof user?.username === "string")
    .map((user) => ({
      _id:
        typeof user._id === "string"
          ? user._id
          : typeof user.id === "string"
            ? user.id
            : user.username!,
      username: user.username!,
      email: typeof user.email === "string" ? user.email : undefined,
      profilePic:
        typeof user.profilePic === "string" ? user.profilePic : undefined,
    }));
};
