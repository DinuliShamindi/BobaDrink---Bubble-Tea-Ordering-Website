import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

const CART_KEY = "bobabliss_cart";
export const DELIVERY_FEE = 250;
export const FREE_DELIVERY_THRESHOLD = 3000;

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Could not read cart:", err);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error("Could not save cart:", err);
    }
  }, [cart]);

  const addToCart = useCallback((item) => {
    setCart((prev) => {
      // Merge if an identical configuration already exists
      const existing = prev.find(
        (c) =>
          c.drinkId === item.drinkId &&
          c.sugar === item.sugar &&
          c.ice === item.ice &&
          JSON.stringify([...c.toppings].sort()) === JSON.stringify([...item.toppings].sort())
      );
      if (existing) {
        return prev.map((c) => (c === existing ? { ...c, qty: c.qty + item.qty } : c));
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((cartId) => {
    setCart((prev) => prev.filter((c) => c.cartId !== cartId));
  }, []);

  const updateCartQty = useCallback((cartId, qty) => {
    setCart((prev) =>
      prev.map((c) => (c.cartId === cartId ? { ...c, qty: Math.max(1, qty) } : c))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    cartItemCount,
    cartSubtotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
