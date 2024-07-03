import axios from "axios";
import { useAuthStore } from "@/src/store/useAuthStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const motherApis = {
  getParents: async () => {
    const token = useAuthStore.getState().authToken;
    const response = await apiClient.get("/mothers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
