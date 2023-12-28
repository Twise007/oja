import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// save cart to mongo DB
const saveCartDB = async (cartData) => {
  const response = await axios.patch(API_URL + "saveCart", cartData);
  return response.data;
};

//get Cart
const getCartDB = async () => {
  const response = await axios.get(API_URL + "getCart");
  return response.data;
};

const cartService = {
  saveCartDB,
  getCartDB,
};

export default cartService;
