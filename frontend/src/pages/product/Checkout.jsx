import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/shop/checkout/CheckoutForm";
import { extractIdAndCartQuantity } from "../../utils";
import { useSelector } from "react-redux";
import { selectShippingAddress } from "../../redux/features/product/checkoutSlice";
import { selectUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout ...");
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const user = useSelector(selectUser);
  const shippingAddress = useSelector(selectShippingAddress);
  const { coupon } = useSelector((state) => state.coupon);
  const description = `Oja Payment: by email:${user.email}, Amount:${cartTotalAmount}`;

  const productIDs = extractIdAndCartQuantity(cartItems);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/order/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: productIDs,
          shipping: shippingAddress,
          description,
          coupon,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Somethings went wrong");
        // console.log(error);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="h-screen">
      <section>
        <div className="container">
          {!clientSecret && <h2 className="h2">{message}</h2>}
        </div>
      </section>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
