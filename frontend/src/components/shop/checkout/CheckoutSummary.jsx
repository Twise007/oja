import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CAL_TOTAL_AMOUNT } from "../../../redux/features/cartSlice";
import { Link } from "react-router-dom";
import { CardDiscount } from "../Coupon";

const CheckoutSummary = () => {
  const dispatch = useDispatch();
  const { coupon } = useSelector((state) => state.coupon);
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(CAL_TOTAL_AMOUNT({ coupon }));
  }, [dispatch, cartItems, coupon]);

  return (
    <div>
      <h3 className="h3">Check out summary</h3>
      {cartItems.length === 0 ? (
        <>
          <p>No item in your cart.</p>
          <Link to="/#products" className="w-full btnPrimary">
            back to shop
          </Link>
        </>
      ) : (
        <>
          <div>
            <p>
              <b>{`Cart items(s): ${cartTotalQuantity}`}</b>
              <b>{`Subtotal: $6667,00`}</b>
              {/* <b>{cartTotalAmount.tofixed(2)}</b> */}
            </p>

            <CardDiscount />

            {cartItems.map((item) => {
              const { _id, name, price, cartQuantity } = item;
              return (
                <div key={_id} className="my-2 bg-cl-sec">
                  <p>Product: {name}</p>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Unit price: {price}</p>
                  <p>Set price: {price * cartQuantity}</p>
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
