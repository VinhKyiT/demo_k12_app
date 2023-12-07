import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART } from './cart.constants';

export const addToCart = payload => ({
  type: ADD_TO_CART,
  payload,
});
export const updateCart = payload => {
  return {
    type: UPDATE_CART,
    payload: { id: payload.id, quantity: payload.quantity },
  };
};
export const removeFromCart = payload => ({
  type: REMOVE_FROM_CART,
  payload,
});
