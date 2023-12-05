import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });
  return response.data;
};

//Logged in user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

//Logout in user
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

//Get logging details
const loginStatus = async () => {
  const response = await axios.get(API_URL + "loginStatus");
  return response.data;
};

//Get user details
const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

//update user profile
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

//update user photo
const updatePhoto = async (userData) => {
  const response = await axios.patch(API_URL + "updatePhoto", userData);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  loginStatus,
  getUser,
  updateUser,
  updatePhoto,
};

export default authService;
