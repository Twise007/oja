import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CardDiscount = () => {
  const { coupon } = useSelector((state) => state.coupon);

  const { initialCartTotalAmount } = useSelector((state) => state.cart);
  return (
    <>
    {/* remember to the excalmasion mark  */}
      {coupon == null && (
        <div className="flex items-center justify-between gap-2 capitalize text-neutral-400 bg-cl-sec ">
          <i className="p-2 border-r-2 border-cl-black">
            Initial Total : $ {initialCartTotalAmount}{" "}
          </i>
          <i className="p-2 border-r-2 border-cl-black">
            coupon: $ {coupon?.name}
          </i>
          <i className="p-2 ">discount: $ {coupon?.discount}</i>
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

  const { cartTotalAmount, initialCartTotalAmount } = useSelector(
    (state) => state.cart
  );

  const removeCoupon = () => {};
  const verifyCoupon = () => {};

  return (
    <div className="pt-3 my-3 border-t-2">
      <div className="flex items-center justify-between">
        <p>Have a Coupon?</p>
        {coupon === null ? (
          <p className="text-red-500 cursor-pointer" onClick={removeCoupon}>
            <b>Remove Coupon</b>
          </p>
        ) : (
          <p
            className="text-green-500 cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            <b>Add Coupon</b>
          </p>
        )}
      </div>
      <CardDiscount />
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
          <submit
            type="submit"
            className="p-2 border-2 rounded-r-lg border-cl-acn bg-cl-acn text-cl-white"
          >
            Verify
          </submit>
        </form>
      )}
    </div>
  );
};

export default Coupon;
