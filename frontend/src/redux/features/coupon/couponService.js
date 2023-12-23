import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

//Create Coupon
const createCoupon = async (formData) => {
  const response = await axios.post(API_URL + "coupon/createCoupon", formData);
  return response.data;
};

//get all coupon
const getCoupons = async () => {
  const response = await axios.get(API_URL + "coupon/getCoupons");
  return response.data;
};

//get a Coupon
const getCoupon = async (couponName) => {
  const response = await axios.get(API_URL + "coupon/" + couponName);
  return response.data;
};

//delete Coupon
const deleteCoupon = async (id) => {
  const response = await axios.delete(API_URL + "coupon/" + id);
  return response.data.message;
};

const couponService = {
  createCoupon,
  getCoupons,
  getCoupon,
  deleteCoupon,
};

export default couponService;
