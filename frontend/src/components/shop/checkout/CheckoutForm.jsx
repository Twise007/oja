import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import CheckoutSummary from "./CheckoutSummary";
import { SpinnerImg } from "../../Loader";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const saveOrder = () => {
    console.log("Order saved");
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
      <section>
        <div className="container min-h-screen">
          <h2 className="h2">Check out</h2>
          <form onSubmit={handleSubmit}>
            <CheckoutSummary />
            <div>
              <h3 className="h3">Stripe Checkout</h3>
              <PaymentElement
                className="mb-[24px]"
                options={paymentElementOptions}
              />
              <button
                disabled={isLoading || !stripe || !elements}
                className="w-full btnPrimary"
              >
                <span id="button-text">
                  {isLoading ? <SpinnerImg /> : "Pay now"}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div className="pt-3">{message}</div>}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
