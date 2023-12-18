import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/products/`;

//Create Products
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

//get Products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//delete Products
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
};

export default productService;
