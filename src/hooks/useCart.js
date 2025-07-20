import { useState, useCallback, useEffect } from 'react';
import { cartService } from '../services/cartService';

export const useCart = () => {
  const [cart, setCart] = useState(cartService.getCart());

  const addToCart = useCallback((product, quantity = 1) => {
    const updatedCart = cartService.addToCart(product, quantity);
    setCart({ ...updatedCart });
  }, []);

  const removeFromCart = useCallback((productId) => {
    const updatedCart = cartService.removeFromCart(productId);
    setCart({ ...updatedCart });
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    const updatedCart = cartService.updateQuantity(productId, newQuantity);
    setCart({ ...updatedCart });
  }, []);

  const clearCart = useCallback(() => {
    const updatedCart = cartService.clearCart();
    setCart({ ...updatedCart });
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
};