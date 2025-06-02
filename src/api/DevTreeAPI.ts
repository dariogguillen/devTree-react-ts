import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User } from "../types";

export const getUser = async () => {
  try {
    const { data } = await api<{ response: string; user: User }>("/user");
    console.log({ getUser: data });
    return data.user;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
