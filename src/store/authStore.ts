import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  uuid: string;
  name: string;
  username: string;
  role: string;
  phone?: string;
  address?: string 
}

interface Store {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  cartId: number | null

  hasHydrated: boolean;

  setUser: (user: User) => void;
  setAuthentication: (isAuthenticated: boolean) => void;
  setToken: (token: string) => void;
  setCartId: (cartId: number) => void;
  logout: () => void;
}

const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      hasHydrated: false,
      cartId: null,

      setUser: (user) => set({ user, isAuthenticated: true }),
      setAuthentication: (isAuthenticated) => set({ isAuthenticated }),
      setToken: (token) => set({ token }),
      setCartId: (cartId) => set({cartId}),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          token: null,
          cartId: null
        }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hasHydrated: true });
      },
    }
  )
);

export default useAuthStore;
