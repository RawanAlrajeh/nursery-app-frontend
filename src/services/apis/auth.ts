import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // This ensures that credentials are included
});

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  role: string;
}

export const authApis = {
  login: async (payload: LoginPayload) => {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
  },
  register: async (payload: RegisterPayload, token: string) => {
    const response = await apiClient.post('/auth/new-user', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  verifyCode: async (payload: { code: string; otpToken: string }) => {
    const response = await apiClient.post('/auth/verify-code', { code: payload.code }, {
      headers: {
        Authorization: `Bearer ${payload.otpToken}`,
      },
    });
    return response.data;
  },
  setPassword: async (payload: { token: string; password: string }) => {
    const response = await apiClient.post('/auth/set-password', payload);
    return response.data;
  },
  logout: async (token: string) => {
    const response = await apiClient.post('/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
