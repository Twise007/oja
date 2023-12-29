import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/product/productSlice";
import filterReducer from "./features/product/filterSlice";
import categoryReducer from "./features/categoryAndBrand/categoryAndBrandSlice";
import couponReducer from "./features/coupon/couponSlice";
import cartReducer from "./features/cartSlice";
import checkoutReducer from "./features/product/checkoutSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    category: categoryReducer,
    coupon: couponReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});
