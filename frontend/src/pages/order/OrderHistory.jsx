import React from "react";
import { useNavigate } from "react-router-dom";
import OrderList from "../../components/OrderList";

const OrderHistory = () => {
  const navigate = useNavigate();

  const openOrderDetails = (id) => {
    navigate(`/order-details/${id}`);
  };

  return (
    <section>
      <div className="container min-h-screen">
        <h2 className="h2">your order history</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br />
        <OrderList openOrderDetails={openOrderDetails} />
      </div>
    </section>
  );
};

export default OrderHistory;
