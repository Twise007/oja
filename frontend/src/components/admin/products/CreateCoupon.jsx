import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import {
  createCoupon,
  getCoupons,
} from "../../../redux/features/coupon/couponSlice";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiresAt, setExpiresAt] = useState(Date.now());
  const [discount, setDiscount] = useState(0);
  const { isLoading } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  const saveCoupon = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      return toast.error("Coupon name must be up to 3 characters");
    }
    if (discount.length < 1) {
      return toast.error("Discount must be great than one");
    }
    const formData = {
      name,
      discount,
      expiresAt,
    };
    await dispatch(createCoupon(formData));
    await dispatch(getCoupons());
    setName("");
    setDiscount(0);
    setExpiresAt();
  };
  return (
    <div className="mb-2">
      {isLoading && <Loader />}
      <h2 className="h2">Create Coupon</h2>
      <p>
        Use this form to <b>Create a Coupon</b>
      </p>
      <form
        onSubmit={saveCoupon}
        className="p-2 my-2 border shadow-xl rounded-xl bg-cl-sec"
      >
        <div className="form-control">
          <label className=" label">
            <span className="font-medium label-text">Coupon Name :</span>
          </label>
          <input
            className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black"
            type="text"
            required
            placeholder="Coupon Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className=" label">
            <span className="font-medium label-text">Coupon Discount :</span>
          </label>
          <input
            className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black"
            type="number"
            required
            placeholder="Coupon Discount"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className=" label">
            <span className="font-medium label-text">Expire Date :</span>
          </label>
          <DatePicker
            className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black text-cl-black"
            required
            selected={expiresAt}
            value={expiresAt}
            onChange={(date) => setExpiresAt(date)}
          />
        </div>
        <button className="my-3 btnPrimary " type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default CreateCoupon;
