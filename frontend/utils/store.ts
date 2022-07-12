import React, { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

export const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "" },
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action?.payload;
      console.log(newItem);

      const existItem = state.cart.cartItems.find(
        (item: any) => item.slug === newItem.slug
      );
      console.log(existItem);

      const cartItems = existItem
        ? state.cart.cartItems.map((item: any) =>
            item.slug === existItem.slug ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));

      return { ...state, cart: { ...state.cart, cartItems } };
    case "REMOVE_CART_ITEM":
      const newCartItem = state?.cart.cartItems.filter(
        (item: any) => item.slug !== action.payload.slug
      );
      Cookies.set(
        "cart",
        JSON.stringify({ ...state.cart, cartItems: newCartItem })
      );

      return { ...state, cart: { ...state.cart, cartItems: newCartItem } };

    case "CART_RESET":
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };

    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    default:
      return state;
  }
};
