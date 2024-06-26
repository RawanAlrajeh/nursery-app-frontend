import axios from "axios";
import { env } from "process";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  role: string;
}

interface VerifyCodePayload {
  otpToken: string;
  code: string;
}

export const authApis = {
  login: async (payload: LoginPayload) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
      payload
    );
    return response.data;
  },

  register: async (payload: RegisterPayload, token: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}auth/new-user`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
  verifyCode: async (payload: { code: string; otpToken: string }) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}auth/verify-code`,
      { code: payload.code },
      {
        headers: {
          Authorization: `Bearer ${payload.otpToken}`,
        },
      }
    );
    return response.data;
  },

  setPassword: async (payload: { token: string; password: string }) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}auth/set-password`,
      payload
    );
    return response.data;
  },

  logout: async (token: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
