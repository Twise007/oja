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
      <h3 className="mb-3 underline h3">Check out summary</h3>
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
            <div className="flex items-start justify-between text-xl font-light">
              <p>{`Cart items(s): ${cartTotalQuantity}`}</p>

              <p className="flex items-center justify-between">
                Subtotal:
                <b>{cartTotalAmount.toFixed(2)}</b>
              </p>
            </div>

            <CardDiscount />

            {cartItems.map((item) => {
              const { _id, name, price, cartQuantity } = item;
              return (
                <div
                  key={_id}
                  className="p-2 my-2 rounded-md text-cl-sec bg-cl-acn2"
                >
                  <h3 className="h3">Product: {name}</h3>
                  <p>
                    Quantity:{" "}
                    <span className="h3 text-cl-acn">{cartQuantity}</span>
                  </p>
                  <div className="flex items-center justify-between">
                    <p>Unit price: ${price}</p>
                    <p>
                      Total price: $
                      <span className="font-bold h3 text-cl-acn">
                        {price * cartQuantity}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutSummary;
