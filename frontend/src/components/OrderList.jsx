import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowDownCircle } from "react-icons/bs";
import { getOrders } from "../redux/features/order/orderSlice";
import Loader from "./Loader";


const OrderList = ({ openOrderDetails }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { isLoading, orders } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  //   const openOrderDetails = (id) => {
  //     navigate(`/order-details/${id}`);
  //   };

  return (
    <div>
      <div className="container min-h-screen">
        <div
          className="flex items-center justify-between p-3 font-medium border cursor-pointer bg-cl-sec rounded-xl"
          onClick={() => setOpen(!open)}
        >
          <p>Order List</p>
          <BsArrowDownCircle
            className={`  duration-700 ${open && "rotate-180 text-cl-acn"}`}
          />
        </div>

        <div
          className={` shadow-xl md:mx-4 my-2 md:p-2 duration-500 rounded-xl  ${
            open ? "hidden" : "h-fit"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="md:table md:p-2 table-sm">
              <thead>
                <tr className="text-xl border-cl-acn border-y-[1px] text-cl-black font-normal">
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && <Loader />}
                {orders.length === 0 ? (
                  <tr className="mt-2 font-normal text-center uppercase md:text-xl ">
                    No Order Found
                  </tr>
                ) : (
                  <>
                    {orders?.map((order, index) => {
                      const {
                        _id,
                        orderDate,
                        orderTime,
                        orderAmount,
                        orderStatus,
                      } = order;
                      return (
                        <tr
                          key={index}
                          className="cursor-pointer hover:bg-cl-sec"
                          onClick={() => openOrderDetails(_id)}
                        >
                          <td>{index + 1}</td>
                          <td className="capitalize">
                            {orderDate} at {orderTime}
                          </td>
                          <td className="capitalize">{_id}</td>
                          <td className="capitalize">${orderAmount}</td>
                          <td className="font-bold capitalize">
                            <p
                              className={
                              orderStatus !== "Delivered"
                                ? `${"pending"}`
                                : `${"delivered"}`
                            }
                            >
                              {orderStatus}
                            </p>
                            
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
