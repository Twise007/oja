import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import OrderDetailsComp from "../../components/OrderDetailsComp";

const OrderDetails = () => {
  return (
    <section>
      <div className="container min-h-screen">
        <h2 className="h2">my order details</h2>
        <Link
          to="/order-history"
          className="flex items-center gap-2 px-2 duration-300 cursor-pointer hover:bg-cl-sec w-fit hover:font-bold"
        >
          <BsArrowLeft />
          <p>Go back to Order</p>
        </Link>
        <OrderDetailsComp />
      </div>
    </section>
  );
};

export default OrderDetails;
