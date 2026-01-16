import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  uuid: string;
  name: string;
  username: string;
  role: string;
}

interface Store {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  setAuthentication: (isAuthenticated: boolean) => void;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setAuthentication: (isAuthenticated) => set({ isAuthenticated }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", 
    }
  )
);

export default useAuthStore;
