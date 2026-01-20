import { _isoTime } from "zod/v4/core";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface cartItem {
  bookId: string;
  quantity: number;
}

interface cartState {
  items: cartItem[];
  addItem: (item: cartItem) => void;
  totalitems: () => number;
  removeItem: (bookId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<cartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.bookId === item.bookId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.bookId === item.bookId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      totalitems() {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      removeItem: (bookId) =>
        set((state) => ({
          items: state.items.filter((i) => i.bookId !== bookId),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "guest-cart-storage",
    }
  )
);
