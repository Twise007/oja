import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SAVE_PAYMENT_METHOD } from "../../redux/features/product/checkoutSlice";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

const PaymentOptions = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");

  const setPayment = (e) => {
    e.preventDefault();
    // console.log(paymentMethod);
    if (paymentMethod === "") {
      return toast.error("Please select a payment method.");
    }
    dispatch(SAVE_PAYMENT_METHOD(paymentMethod));
    
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      navigate("/login?redirect=cart");
    }
  };

  return (
    <div>
      <p>Please select a payment method</p>
      <form onSubmit={setPayment}>
        <label
          className="justify-start gap-2 my-1 duration-300 rounded-lg cursor-pointer label bg-cl-sec hover:shadow-lg hover:py-2"
          htmlFor="stripe"
        >
          <input
            type="radio"
            name="paymentMethod"
            id="stripe"
            value={"stripe"}
            className=" peer/draft radio-xs"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="label-text hover:text-cl-acn peer-checked/draft:text-cl-acn">
            Stripe
          </span>
        </label>
        <label
          className="justify-start gap-2 my-1 duration-300 rounded-lg cursor-pointer label bg-cl-sec hover:shadow-lg hover:py-2"
          htmlFor="flutterWave"
        >
          <input
            type="radio"
            name="paymentMethod"
            id="flutterWave"
            value={"flutterWave"}
            className=" peer/draft radio-xs"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="label-text hover:text-cl-acn peer-checked/draft:text-cl-acn">
            Flutter Wave
          </span>
        </label>
        <label
          className="justify-start gap-2 my-1 duration-300 rounded-lg cursor-pointer label bg-cl-sec hover:shadow-lg hover:py-2"
          htmlFor="payPal"
        >
          <input
            type="radio"
            name="paymentMethod"
            id="payPal"
            value={"payPal"}
            className=" peer/draft radio-xs"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="label-text hover:text-cl-acn peer-checked/draft:text-cl-acn">
            Paypal
          </span>
        </label>
        <label
          className="justify-start gap-2 my-1 duration-300 rounded-lg cursor-pointer label bg-cl-sec hover:shadow-lg hover:py-2"
          htmlFor="wallet"
        >
          <input
            type="radio"
            name="paymentMethod"
            id="wallet"
            value={"wallet"}
            className=" peer/draft radio-xs"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="label-text hover:text-cl-acn peer-checked/draft:text-cl-acn">
            Wallet
          </span>
        </label>
        <button type="submit" className="w-full mt-2 btnPrimary">
          Check out
        </button>
      </form>
    </div>
  );
};

export default PaymentOptions;
