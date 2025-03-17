import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

interface CartStore {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      setCart: (cart: CartItem[]) => set({ cart }),

      addToCart: (item: CartItem) => {
        set((state) => {
          const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              ),
            };
          } else {
            return { cart: [...state.cart, item] };
          }
        });
      },

      removeFromCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id: string, quantity: number) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: Math.max(quantity, 0) } : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'food-cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
