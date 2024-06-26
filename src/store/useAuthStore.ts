import create from 'zustand';

interface AuthState {
  otpToken: string | null;
  authToken: string | null;
  setOtpToken: (otpToken: string) => void;
  setAuthToken: (authToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  otpToken: typeof window !== 'undefined' ? localStorage.getItem('otpToken') : null,
  authToken: typeof window !== 'undefined' ? localStorage.getItem('authToken') : null,
  setOtpToken: (otpToken: string) => {
    localStorage.setItem('otpToken', otpToken);
    set({ otpToken });
  },
  setAuthToken: (authToken: string) => {
    localStorage.setItem('authToken', authToken);
    set({ authToken });
  },
  clearTokens: () => {
    localStorage.removeItem('otpToken');
    localStorage.removeItem('authToken');
    set({ otpToken: null, authToken: null });
  },
}));
