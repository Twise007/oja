import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { CLEAR_CART } from "../../../redux/features/cartSlice";

const CheckOutSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CLEAR_CART());
  }, [dispatch]);
  return (
    <>
      <Confetti />
      <section>
        <div className="container min-h-screen">
          <h2 className="h2">Checkout Successful</h2>
          <p>Thank you for your purchase</p>
          <br />
          <button className=" btnPrimary">
            <Link to="/order-history">View Orders</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default CheckOutSuccess;
