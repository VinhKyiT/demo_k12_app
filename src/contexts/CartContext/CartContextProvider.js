import React, { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { AppState } from 'react-native';
import { getData, storeData } from '../../helpers/storage';

export const CartContext = createContext();

export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const REINIT_CART = 'REINIT_CART';

export const cartInitialState = {
  carts: [],
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case REINIT_CART: {
      return payload;
    }
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

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (nextAppState.match(/inactive|background/)) {
        await storeData('CART_DATA', state);
      } else if (nextAppState === 'active') {
        const cartData = await getData('CART_DATA');
        dispatch({ type: REINIT_CART, payload: cartData });
      }
    });
    return () => {
      subscription.remove();
    };
  }, [state]);

  const handleAddToCart = useCallback(item => {
    dispatch({ type: ADD_TO_CART, payload: item });
  }, []);
  const handleUpdateCartItem = useCallback((itemId, quantity) => {
    dispatch({ type: UPDATE_CART_ITEM, payload: { id: itemId, quantity } });
  }, []);
  const handleRemoveFromCart = useCallback(itemId => {
    dispatch({ type: REMOVE_FROM_CART, payload: itemId });
  }, []);

  const removeAllCart = useCallback(() => {
    dispatch({ type: REINIT_CART, payload: cartInitialState });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      cartData: state,
      handleAddToCart,
      handleUpdateCartItem,
      handleRemoveFromCart,
      removeAllCart,
    }),
    [handleAddToCart, handleRemoveFromCart, handleUpdateCartItem, removeAllCart, state],
  );

  return <CartContext.Provider value={memoizedValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
