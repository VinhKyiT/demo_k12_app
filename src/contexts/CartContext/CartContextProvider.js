import React, { createContext, useCallback, useMemo, useReducer } from 'react';

export const CartContext = createContext();

export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

const cartInitialState = {
  carts: [],
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART: {
      const isItemInCart = state.carts.find(product => product.id === payload.id);
      if (isItemInCart) {
        return {
          ...state,
          carts: [...state.carts].map(item =>
            item.id === payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
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
        carts: [...state.carts].map(item =>
          item.id === payload.id
            ? {
                ...item,
                quantity: item.quantity + payload.quantity,
              }
            : item,
        ),
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        carts: state.carts.filter(item => item.id !== payload),
      };
    }
    default:
      return state;
  }
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const handleAddToCart = useCallback(item => {
    dispatch({ type: ADD_TO_CART, payload: item });
  }, []);
  const handleUpdateCartItem = useCallback((itemId, quantity) => {
    dispatch({ type: UPDATE_CART_ITEM, payload: { id: itemId, quantity } });
  }, []);
  const handleRemoveFromCart = useCallback(itemId => {
    dispatch({ type: REMOVE_FROM_CART, payload: itemId });
  }, []);

  const memoizedValue = useMemo(
    () => ({ cartData: state, handleAddToCart, handleUpdateCartItem, handleRemoveFromCart }),
    [handleAddToCart, handleRemoveFromCart, handleUpdateCartItem, state],
  );

  return <CartContext.Provider value={memoizedValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
