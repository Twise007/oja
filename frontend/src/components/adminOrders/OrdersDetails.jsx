import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import OrderDetailsComp from "../OrderDetailsComp";
import ChangeOrderStatus from "./ChangeOrderStatus";

const OrdersDetails = () => {
  return (
    <div className="container min-h-screen">
      <h2 className="h2">order details</h2>
      <Link
        to="/admin/orders"
        className="flex items-center gap-2 px-2 duration-300 cursor-pointer hover:bg-cl-sec w-fit hover:font-bold"
      >
        <BsArrowLeft />
        <p>Go back to Order</p>
      </Link>
      <OrderDetailsComp />
      <br />
      <ChangeOrderStatus />
    </div>
  );
};

export default OrdersDetails;
