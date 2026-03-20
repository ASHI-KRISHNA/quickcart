import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('quickcart-cart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    ));
  };

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}