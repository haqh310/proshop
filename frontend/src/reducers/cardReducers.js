import { createSlice, current } from "@reduxjs/toolkit";

// ======== CART ITEMS REDUCER ========
const cartItems = localStorage.getItem("cartItems");
const cartItemFromStorage =
  cartItems && cartItems !== "undefined" ? JSON.parse(cartItems) : [];

const shippingAddress = localStorage.getItem("shippingAddress");
const shippingAddressFromStorage =
  shippingAddress && shippingAddress !== "undefined"
    ? JSON.parse(shippingAddress)
    : {};

const initialState = {
  cartItems: cartItemFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: "",
};

export const cardReducer = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const currentState = current(state);
      const existItem = currentState.cartItems.find(
        (x) => x.product === item.product
      );

      if (existItem) {
        return {
          ...currentState,
          cartItems: currentState.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...currentState,
          cartItems: [...currentState.cartItems, item],
        };
      }
    },
    removeItem: (state, action) => {
      const currentState = current(state);
      return {
        ...currentState,
        cartItems: currentState.cartItems.filter(
          (x) => x.product !== action.payload.id
        ),
      };
    },
    saveAddress: (state, action) => {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    },
    paymentMethod: (state, action) => {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    },
    clearItems: (state, action) => {
      return {
        ...state,
        cartItems: []
      };
    },
  },
});

// ======== EXPORT ACTIONS REDUCERS ========
export const { addItem, removeItem, saveAddress, paymentMethod, clearItems } =
  cardReducer.actions;

export default cardReducer;
