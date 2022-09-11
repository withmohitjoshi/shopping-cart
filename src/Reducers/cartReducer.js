import {
  GET_PRODUCTS,
  ADD_TO_CART,
  REMOVE_TO_CART,
  CHANGE_QTY,
  HAS_ERROR,
} from "../Utils/constants";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload };

    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };

    case REMOVE_TO_CART:
      return {
        ...state,
        cart: state.cart.filter(
          ({ id: productId }) => productId !== action.payload
        ),
      };

    case CHANGE_QTY:
      const res = state.cart.map((cartItem) =>
        cartItem.id === action.payload
          ? { ...cartItem, qyt: action.qyt }
          : { ...cartItem }
      );

      return { ...state, cart: res };

    case HAS_ERROR:
      return { ...state, hasError: action.payload };

    default:
      return state;
  }
};
