import React, { createContext, useMemo, useCallback, useReducer } from 'react';
import { cartInitialState, cartReducer } from './cartReducer';
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART } from './constants';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const handleAddToCart = useCallback(item => {
    dispatch({ type: ADD_TO_CART, payload: item });
  }, []);

  const handleUpdateCart = useCallback((itemId, quantity) => {
    dispatch({ type: UPDATE_CART, payload: { id: itemId, quantity } });
  }, []);

  const handleRemoveFromCart = useCallback(itemId => {
    dispatch({ type: REMOVE_FROM_CART, payload: itemId });
  }, []);

  const memoizedValue = useMemo(
    () => ({ handleAddToCart, cartData: state, handleUpdateCart, handleRemoveFromCart }),
    [handleAddToCart, state, handleUpdateCart, handleRemoveFromCart],
  );

  return <CartContext.Provider value={memoizedValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
