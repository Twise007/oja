import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loginStatus } from "./redux/features/auth/authSlice";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

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
        <div className="text-cl-black bg-cl-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
