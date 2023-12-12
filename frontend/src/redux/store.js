import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import  categoryReducer  from "./features/categoryAndBrand/categoryAndBrandSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
});
