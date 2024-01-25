import React from "react";
import OrderList from "../OrderList";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const openOrderDetails = (id) => {
    navigate(`/admin/order-details/${id}`);
  };
  return (
    <div className="container min-h-screen">
      <h2 className="h2">All orders</h2>
      <p>
        Open an order to <b>Change order status</b>
      </p>
      <br />

      <OrderList openOrderDetails={openOrderDetails} />
    </div>
  );
};

export default Orders;
