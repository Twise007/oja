import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loginStatus } from "./redux/features/auth/authSlice";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { AdminOnlyRoute } from "./components/hiddenLink";
import Notfound from "./pages/Notfound";
import ProductDetails from "./components/shop/ProductDetails";
import Shop from "./pages/product/Shop";
import CheckoutDetails from "./pages/product/CheckoutDetails";
import Cart from "./pages/product/Cart";
import Checkout from "./pages/product/Checkout";

const App = () => {
  axios.defaults.withCredentials = true;
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-details" element={<CheckoutDetails />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/checkout-stripe" element={<Checkout />} />

            <Route
              path="/admin/*"
              element={
                <AdminOnlyRoute>
                  <Admin />
                </AdminOnlyRoute>
              }
            />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </>
  );
};

export default App;
