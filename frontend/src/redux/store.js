import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/product/productSlice";
import categoryReducer from "./features/categoryAndBrand/categoryAndBrandSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
  },
});
