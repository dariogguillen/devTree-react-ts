import { isAxiosError } from "axios";
import api from "../config/axios";
import type { ProfileFrom, User } from "../types";

export const getUser = async () => {
  try {
    const { data } = await api<{ response: string; user: User }>("/user");
    return data.user;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const updateProfile = async (formData: ProfileFrom) => {
  try {
    const { data } = await api.patch<{ response: string }>("/user", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
