import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_COUPON,
  getCoupon,
} from "../../redux/features/coupon/couponSlice";
import { toast } from "react-toastify";
import {  BsArrowUpCircle } from "react-icons/bs";

export const CardDiscount = () => {
  const { coupon } = useSelector((state) => state.coupon);
  const { initialCartTotalAmount } = useSelector((state) => state.cart);
  return (
    <>
      {coupon !== null && (
        <div className="flex items-center justify-between gap-2 capitalize text-neutral-400 bg-cl-sec ">
          <i className="p-2 border-r-2 border-cl-black">
            Initial Sub-Total : $ {initialCartTotalAmount}
          </i>
          <i className="p-2 border-r-2 border-cl-black">
            coupon name: {coupon?.name}
          </i>
          <i className="p-2 ">discount of: {coupon?.discount}%</i>
        </div>
      )}
    </>
  );
};

const Coupon = () => {
  const dispatch = useDispatch();
  const [couponName, setCouponName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { coupon } = useSelector((state) => state.coupon);

  const verifyCoupon = async (e) => {
    e.preventDefault();
    if (couponName.length < 6) {
      return toast.error("Coupon name must be up to 6 characters");
    }
    await dispatch(getCoupon(couponName));
    setCouponName("");
  };

  const removeCoupon = () => {
    dispatch(REMOVE_COUPON());
  };

  return (
    <div className="pt-3 my-3 border-y-2">
      <div className="flex items-center justify-between gap-3">
        <p>Have a Coupon?</p>
        {coupon === null ? (
          <p
            className="flex items-center gap-1 text-green-500 duration-700 cursor-pointer hover:font-extrabold"
            onClick={() => setShowForm(!showForm)}
          >
            <BsArrowUpCircle
              className={`duration-700 ${showForm && "rotate-180 text-cl-acn"}`}
            />
            <b>Add Coupon</b>
          </p>
        ) : (
          <p
            className="text-red-500 duration-300 cursor-pointer hover:font-extrabold"
            onClick={removeCoupon}
          >
            <b>Remove Coupon</b>
          </p>
        )}
      </div>
      <div className="duration-300">
        <CardDiscount />
      </div>
      {showForm && (
        <form
          onSubmit={verifyCoupon}
          className="flex items-center justify-center my-2"
        >
          <input
            type="text"
            className="w-full p-2 shadow-md outline-none bg-cl-sec placeholder:italic"
            placeholder="Coupon Name"
            name="name"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value.toUpperCase())}
            required
          />
          <button
            type="submit"
            className="p-2 border-2 rounded-r-lg border-cl-acn bg-cl-acn text-cl-white"
          >
            Verify
          </button>
        </form>
      )}
    </div>
  );
};

export default Coupon;
