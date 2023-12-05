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
import { useDispatch } from "react-redux";
import { loginStatus } from "./redux/features/auth/authSlice";
import Profile from "./pages/Profile";

const App = () => {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginStatus());
  }, []);
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
