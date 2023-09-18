import React, { createContext, useReducer } from 'react';

export const CartContext = createContext();

export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';

const cartInitialValue = {
  carts: [],
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART: {
      const isItemInCart = state.carts.find(item => item?.id === payload?.id);
      if (isItemInCart) {
        return {
          ...state,
          carts: [
            ...state.carts.map(item =>
              item?.id === payload?.id ? { ...item, quantity: item?.quantity + 1 } : { ...item },
            ),
          ],
        };
      }
      return {
        ...state,
        carts: [...state.carts, { ...payload, quantity: 1 }],
      };
    }
    case UPDATE_CART_ITEM: {
      return {
        ...state,
        carts: state.carts.map(item =>
          item?.id === payload?.id
            ? { ...item, quantity: item?.quantity + payload?.quantity }
            : { ...item },
        ),
      };
    }
    case REMOVE_CART_ITEM: {
      return {
        ...state,
        carts: [...state.carts.filter(item => item?.id !== payload)],
      };
    }
    default:
      return state;
  }
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialValue);
  const handleAddToCart = item => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };
  const handleUpdateCart = (id, quantity) => {
    dispatch({ type: UPDATE_CART_ITEM, payload: { id, quantity } });
  };
  const handleRemoveCart = id => {
    dispatch({ type: UPDATE_CART_ITEM, payload: id });
  };
  return (
    <CartContext.Provider
      value={{ handleAddToCart, handleUpdateCart, handleRemoveCart, cartData: state }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
