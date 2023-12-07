import { ADD_TO_CART, REINIT_CART, REMOVE_FROM_CART, UPDATE_CART } from './cart.constants';

const cartInitialState = {
  carts: [],
};

const cartReducer = (state = cartInitialState, action) => {
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
    case UPDATE_CART: {
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
export default cartReducer;
