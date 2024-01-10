import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import CheckoutSummary from "./CheckoutSummary";
import { SpinnerImg } from "../../Loader";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../../../redux/features/cartSlice";
import {
  selectPaymentMethod,
  selectShippingAddress,
} from "../../../redux/features/product/checkoutSlice";
import { createOrder } from "../../../redux/features/order/orderSlice";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const { coupon } = useSelector((state) => state.coupon);

  const saveOrder = () => {
    // console.log("order created");
    const today = new Date();
    const formData = {
      orderDate: today.toDateString(),
      orderTime: today.toLocaleTimeString(),
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      paymentMethod,
      coupon: coupon != null ? coupon : { name: "nil" },
    };
    dispatch(createOrder(formData));
    navigate("/checkout-success");
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.REACT_APP_FRONTEND_URL}/checkout-success`,
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment Successful");
            saveOrder();
          }
        }
      });
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <div className="container bg-cl-white">
        <h2 className="mb-4 h2">Check out</h2>

        <form onSubmit={handleSubmit} className="w-full ">
          <CheckoutSummary />
          <div className="p-2 my-3 border rounded-lg">
            <h3 className="h3">Stripe Checkout</h3>
            {/* Show any error or success messages */}
            {message && (
              <div className="py-3 text-xl font-bold text-center text-red-600">
                {message}
              </div>
            )}
            <PaymentElement
              className="w-full"
              options={paymentElementOptions}
            />
            <div className="flex items-center justify-between gap-2 my-3 md:justify-evenly">
              <button className=" btnPrimary">
                <Link to="/cart">
                  <p>Go back to Cart</p>
                </Link>
              </button>
              <button
                disabled={isLoading || !stripe || !elements}
                className="px-2 py-2 font-semibold capitalize transition ease-in-out border-2 rounded-lg shadow-lg cursor-pointer md:px-8 border-cl-acn hover:text-cl-acn hover:bg-cl-white text-cl-white bg-cl-acn"
              >
                <span>
                  {isLoading ? (
                    <span className="loading loading-spinner loading-md" />
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
