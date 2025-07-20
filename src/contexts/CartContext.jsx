import { createContext, useContext } from "react";
import {useCart} from "../hooks/useCart";
import PropTypes from 'prop-types';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartState = useCart();
  


  return (
    <CartContext.Provider value={cartState}>
      {children}
    </CartContext.Provider>
  );
};

 
 CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  
  return context;
};