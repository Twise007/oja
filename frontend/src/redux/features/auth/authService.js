import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;



//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });

  //   if (response.statusText === "OK") {
  //     toast.success("User Registed Successfully...");
  //   }
  return response.data;
};

const authService = {
  register,
};

export default authService;
