import { useAuthStore } from "@/src/store/useAuthStore";
import { useRouter } from "next/router";

export const useLogout = () => {
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const router = useRouter();

  const logout = () => {
    clearTokens();
    router.push("/auth/login");
  };

  return { logout };
};
