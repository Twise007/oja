import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SpinnerImg } from "../Loader";

const statusList = [
  //   { id: "-- Choose me --", },
  { id: "Order Placed..." },
  { id: "Processing..." },
  { id: " Shipped..." },
  { id: " Delivered..." },
];

const ChangeOrderStatus = () => {
  const [status, setStatus] = useState("second");
  const { isLoading } = useSelector((state) => state.order);
  const updateOrder = () => {};

  return (
    <div>
      {isLoading && <SpinnerImg />}
      <div className=" max-w-fit">
        <div className="text-xl font-medium ">
          <div className="h3">Update status</div>
        </div>
        <div className="">
          <form onSubmit={updateOrder}>
            <select
              className="w-full max-w-xs bg-transparent select select-bordered"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusList.map((statusList, index) => (
                <>
                  <option key={index} value={statusList.id} disabled>
                    {statusList.id}
                  </option>
                </>
              ))}
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeOrderStatus;
