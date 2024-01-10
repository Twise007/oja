import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CAL_TOTAL_AMOUNT,
  selectCartTotalAmount,
} from "../../../redux/features/cartSlice";
import { Link } from "react-router-dom";
import { CardDiscount } from "../Coupon";

const CheckoutSummary = () => {
  const dispatch = useDispatch();
  const { coupon } = useSelector((state) => state.coupon);
  const { cartItems, cartTotalQuantity } = useSelector((state) => state.cart);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  useEffect(() => {
    dispatch(CAL_TOTAL_AMOUNT({ coupon }));
  }, [dispatch, cartItems, coupon]);

  return (
    <div className="p-2 border rounded-lg h-fit">
      <h3 className="mb-3 font-bold text-center h3">Check out summary</h3>
      {cartItems.length === 0 ? (
        <>
          <p>No item in your cart.</p>
          <Link to="/#products" className="w-full btnPrimary">
            back to shop
          </Link>
        </>
      ) : (
        <>
          <div className="">
            <div className=" max-h-[25rem] overflow-y-scroll mb-3  border rounded-lg py-4">
              {cartItems.map((item) => {
                const { _id, name, price, cartQuantity, image } = item;
                return (
                  <div
                    className="px-1 py-1 m-2 duration-300 rounded-lg bg-cl-sec md:px-4 "
                    key={_id}
                  >
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
                            Unit price: ${" "}
                            <span className=" md:text-xl">{price}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 md:gap-6 md:flex-row">
                        <p>
                          Quantity :<span className="h3">{cartQuantity}</span>
                        </p>
                        <h2>
                          Total Amount : $
                          <span className="h3">
                            {(cartQuantity * price).toFixed(2)}
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <CardDiscount />

            <div className="flex items-baseline justify-between p-1 px-2 m-1 my-3 rounded-md bg-cl-black text-cl-white">
              <p>Order total</p>
              <p>{`Cart items(s): ${cartTotalQuantity}`}</p>

              <h2>
                Total price: $
                <span className="font-extrabold h3">
                  {cartTotalAmount.toFixed(2)}
                </span>
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutSummary;
