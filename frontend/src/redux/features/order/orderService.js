import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/order/`;

//Create order
const createOrder = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data.message;
};

//get all order
const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const orderService = {
  createOrder,
  getOrders,
};

export default orderService;
