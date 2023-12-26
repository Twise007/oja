import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getCartQuantityById } from "../../utils";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  fixedCartTotalAmount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const cartQuantity = getCartQuantityById(
        state.cartItems,
        action.payload._id
      );
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (productIndex >= 0) {
        //item already in the cart
        //increase  the cart quantity
        if (cartQuantity === action.payload.quantity) {
          state.cartItems[productIndex].cartQuantity += 0;
          toast.info(
            `${action.payload.name} Max number reached!!!, Please try again`,
            {
              position: "top-left",
            }
          );
        } else {
          state.cartItems[productIndex].cartQuantity += 1;
          toast.success(`${action.payload.name} Increased by one in cart`, {
            position: "top-left",
          });
        }
      } else {
        //item doesn't exists in the cart
        //add item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} Added to cart`, {
          position: "top-left",
        });
      }
      //save to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartItems[productIndex].cartQuantity > 1) {
        //decrease cart
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.success(`Remove one ${action.payload.name} from cart`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        state.cartItems = newCartItem;
        toast.success(`Remove ${action.payload.name}  from cart`, {
          position: "top-left",
        });
      }

      //save to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = newCartItem;
      toast.success(`Removed ${action.payload.name} from cart`, {
        position: "top-left",
      });
      //save to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.success(`Cart Cleared`, {
        position: "top-left",
      });
      //save to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CAL_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems?.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;

        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CAL_TOTAL_QUANTITY,
} = cart.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cart.reducer;
