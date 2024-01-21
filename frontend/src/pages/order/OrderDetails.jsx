import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrder } from "../../redux/features/order/orderSlice";
import { BsArrowLeft } from "react-icons/bs";
import { SpinnerImg } from "../../components/Loader";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  return (
    <section>
      <div className="container min-h-screen">
        <h2 className="h2">order details</h2>
        <Link
          to="/order-history"
          className="flex items-center gap-2 px-2 duration-300 cursor-pointer hover:bg-cl-sec w-fit hover:font-bold"
        >
          <BsArrowLeft />
          <p>Go back to Order</p>
        </Link>
        <div>
          {isLoading && order === null ? (
            <SpinnerImg />
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-full p-2 mx-1 rounded-md bg-cl-sec md:mx-10">
                <div className="flex items-center justify-between gap-2 p-2 my-1 text-left border-b">
                  <h3 className="h3 text-cl-acn">Ship to</h3>{" "}
                  {order?.shippingAddress?.name}
                </div>
                <div className="flex items-center justify-between gap-2 p-2 my-1 text-left border-b">
                  <h3 className="h3 text-cl-acn">Order ID</h3> {order?._id}
                </div>
                <div className="flex items-center justify-between gap-2 p-2 my-1 text-left border-b">
                  <h3 className="h3 text-cl-acn">Order Amount</h3> $
                  {order?.orderAmount}
                </div>
                <div className="flex items-center justify-between gap-2 p-2 my-1 text-left border-b">
                  <h3 className="h3 text-cl-acn">Coupon</h3>{" "}
                  {order?.coupon.name} | {order?.coupon?.discount}%
                </div>
                <div className="flex items-center justify-between gap-2 p-2 my-1 text-left border-b">
                  <h3 className="h3 text-cl-acn">Payment Method</h3>{" "}
                  {order?.paymentMethod}
                </div>
                <div className="flex items-center justify-between gap-2 p-2 my-1 text-left border-b">
                  <h3 className="h3 text-cl-acn">Order Status</h3>{" "}
                  {order?.orderStatus}
                </div>
                <div className="flex justify-between gap-2 p-2 my-1 text-left border-b">
                  <h3 className="h3 text-cl-acn">Shipping Address</h3>
                  <div>
                    <b>Address:</b> {order?.shippingAddress.line1}
                    {order?.shippingAddress.line2}
                    {order?.shippingAddress.city}
                    <br />
                    <b>State:</b> {order?.shippingAddress.state}
                    <br />
                    <b>Country:</b> {order?.shippingAddress.country}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center w-full mt-2 text-center">
                <div className=" max-h-[28rem] overflow-y-scroll mb-3  border rounded-lg py-4">
                  {order?.cartItems.map((cart, index) => {
                    const { _id, name, price, image, cartQuantity } = cart;
                    return (
                      <div
                        className="px-1 py-1 m-2 duration-300 rounded-lg bg-cl-sec md:px-4 hover:shadow-lg hover:my-3 hover:py-2"
                        key={_id}
                      >
                        <p className="text-xl font-bold text-end text-cl-acn">
                          {index + 1}.
                        </p>
                        <>
                          <h5 className="pl-2 font-semibold text-center uppercase md:text-xl md:text-start">
                            {name}
                          </h5>
                          <div className="flex items-center justify-between gap-4 px-2 py-1 md:py-0">
                            <div className="flex flex-col items-center md:gap-4 md:flex-row">
                              <div className="flex flex-col items-center text-center md:text-end">
                                <img
                                  src={image[0]}
                                  alt={name}
                                  className="object-cover w-20 h-20 m-1 md:m-2 rounded-xl"
                                />
                                <p className="">
                                  Price : ${" "}
                                  <span className=" md:text-xl">{price}</span>
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                              <div className="flex flex-col gap-2 md:gap-6 md:flex-row">
                                <p>
                                  Total Items :
                                  <span className="h3">{cartQuantity}</span>
                                </p>
                                <h2>
                                  Total Amount : $
                                  <span className="h3">
                                    {(cartQuantity * price).toFixed(2)}
                                  </span>
                                </h2>
                              </div>
                              <Link to={`/review-product/${_id}`}>
                                <button className="w-full btnPrimary">
                                  Review Product
                                </button>
                              </Link>
                            </div>
                          </div>
                        </>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
