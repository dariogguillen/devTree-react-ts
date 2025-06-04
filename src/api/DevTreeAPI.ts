import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User, UserResponse } from "../types";

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

export const updateProfile = async (formData: User) => {
  try {
    const { data } = await api.patch<{ response: string }>("/user", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await api.post<{ response: string; image: string }>(
      "/user/image",
      formData,
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const { data } = await api<{ response: string; user: UserResponse }>(
      `/${username}`,
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
