// CartContext.jsx - UPDATED VERSION
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    setCartCount(savedCart.reduce((total, item) => total + item.quantity, 0));
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    const newCount = newCart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(newCount);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      updateCart(updatedCart);
    } else {
      const updatedCart = [...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url || product.image,
        brand: product.brand?.name || product.brand,
        quantity
      }];
      updateCart(updatedCart);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    updateCart(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // ADD THIS FUNCTION - This is what's missing!
  const getCartItemsCount = () => {
    return cartCount; // or: return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount // MAKE SURE THIS IS INCLUDED HERE!
    }}>
      {children}
    </CartContext.Provider>
  );
};