import create from "zustand";

// Define the interface for the AuthState
interface AuthState {
  otpToken: string | null;
  authToken: string | null;
  role: string | null;
  name: string | null; // Add username to the state
  setOtpToken: (otpToken: string) => void;
  setAuthToken: (authToken: string) => void;
  setRole: (role: string) => void;
  setName: (name: string) => void; // Add setUsername function
  clearTokens: () => void;
}

// Create the Zustand store with the AuthState interface
export const useAuthStore = create<AuthState>((set) => ({
  otpToken:
    typeof window !== "undefined" ? localStorage.getItem("otpToken") : null,
  authToken:
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null,
  role: typeof window !== "undefined" ? localStorage.getItem("role") : null,
  name: typeof window !== "undefined" ? localStorage.getItem("name") : null,
  setOtpToken: (otpToken: string) => {
    localStorage.setItem("otpToken", otpToken);
    set({ otpToken });
  },
  setAuthToken: (authToken: string) => {
    localStorage.setItem("authToken", authToken);
    set({ authToken });
  },
  setRole: (role: string) => {
    localStorage.setItem("role", role);
    set({ role });
  },
  setName: (name: string) => {
    localStorage.setItem("name", name);
    set({ name });
  },
  clearTokens: () => {
    localStorage.removeItem("otpToken");
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    set({ otpToken: null, authToken: null, role: null, name: null });
  },
}));
