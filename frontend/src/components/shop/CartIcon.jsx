import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CAL_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalQuantity,
} from "../../redux/features/cartSlice";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  useEffect(() => {
    dispatch(CAL_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);
  return (
    <div>
      <div className="flex-none ">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="border-0 btn bg-cl-sec btn-circle hover:bg-cl-acn hover:text-cl-white text-cl-acn"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-cl-white badge badge-sm indicator-item">
                {cartTotalQuantity}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="rounded-lg card-body bg-cl-acn2">
              <span className="text-lg font-bold text-cl-black">
                {cartTotalQuantity} Items
              </span>
              <div className="text-lg font-bold text-cl-white">
                Subtotal: <span className="text-2xl text-cl-acn">$ 999</span>
              </div>
              <Link to="/cart" className="card-actions">
                <button className="w-full p-2 m-1 rounded-lg bg-cl-white text-cl-black hover:bg-cl-acn hover:text-cl-white">
                  View cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartIcon;
