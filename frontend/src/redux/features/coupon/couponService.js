import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/coupon`;

//Create Coupon
const createCoupon = async (formData) => {
  const response = await axios.post(API_URL + "createCoupon", formData);
  return response.data;
};

//get Category
const getCoupons = async () => {
  const response = await axios.get(API_URL + "getCoupons");
  return response.data;
};

//delete Coupon
const getCoupon = async (id) => {
  const response = await axios.get(API_URL + "get/" + id);
  return response.data.message;
};

//delete Coupon
const deleteCoupon = async (slug) => {
  const response = await axios.delete(API_URL + "coupon/" + slug);
  return response.data.message;
};

const couponService = {
  createCoupon,
  getCoupons,
  getCoupon,
  deleteCoupon,
};

export default couponService;
