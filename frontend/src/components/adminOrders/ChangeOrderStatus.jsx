import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SpinnerImg } from "../Loader";
import { updateOrderStatus } from "../../redux/features/order/orderSlice";

const statusList = [
  // { id: "-- Choose me --" },
  { id: "Order Placed..." },
  { id: "Pending..." },
  { id: " Shipped..." },
  { id: " Delivered..." },
];

const ChangeOrderStatus = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const { isLoading } = useSelector((state) => state.order);
  const updateOrder = async (e, id) => {
    e.preventDefault();
    const formData = {
      orderStatus: status,
    };
    await dispatch(updateOrderStatus({ id, formData }));
  };

  return (
    <div className="hero">
      {isLoading && <SpinnerImg />}

      <div className="w-full max-w-xs rounded-md form-control hero-content bg-cl-sec">
        <form onSubmit={(e) => updateOrder(e, id)} className="flex flex-col">
          <div className="label">
            <span className="font-semibold h3">Update status below</span>
          </div>
          <select
            className="italic font-normal outline-none select bg-cl-acn text-cl-white border-cl-acn"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusList.map((statusList, index) => (
              <option
                key={index}
                value={statusList.id}
                disabled={statusList.id < 1}
              >
                {statusList.id}
              </option>
            ))}
          </select>
          {!isLoading && (
            <button className="w-full mt-4 btnPrimary">Submit Status</button>
          )}
          {isLoading && (
            <button
              disabled
              className="mt-4 border-2 rounded-lg border-cl-acn text-cl-acn"
            >
              <span className="loading loading-spinner loading-md"></span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangeOrderStatus;
