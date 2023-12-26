import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ADD_TO_CART,
  CAL_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  selectCartItems,
  selectCartTotalQuantity,
} from "../redux/features/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
  };

  const removeFromCart = (product) => {
    dispatch(REMOVE_FROM_CART(product));
  };

  const clearCart = (product) => {
    dispatch(CLEAR_CART(product));
  };

  useEffect(() => {
    dispatch(CAL_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  return (
    <section>
      <div className="container">
        <div className="flex flex-col justify-center w-full text-center ">
          <form className=" min-h-[80vh]">
            <h2 className="h2">Shopping Cart</h2>

            {cartItems?.length === 0 ? (
              <div className="h-[50vh] my-10 capitalize text-5xl font-normal text-center hero text-rose-500">
                There are no items in your cart
              </div>
            ) : (
              <>
                {cartItems?.map((cart, index) => {
                  const { _id, name, price, image, cartQuantity } = cart;
                  return (
                    <div
                      className="px-1 py-1 m-2 duration-500 ease-in-out rounded-lg bg-cl-sec md:px-4 hover:shadow-lg hover:my-3 hover:py-2"
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
                              Price : ${" "}
                              <span className=" md:text-xl">{price}</span>
                            </p>
                          </div>
                          <div className="flex flex-row gap-4 md:text-xl">
                            <div
                              className="p-1 text-red-500 duration-300 rounded-lg cursor-pointer bg-cl-white hover:bg-red-500 hover:text-cl-white"
                              onClick={() => decreaseCart(cart)}
                            >
                              <FaMinus />
                            </div>
                            <div
                              className="p-1 text-green-500 duration-300 rounded-lg cursor-pointer bg-cl-white hover:bg-green-500 hover:text-cl-white"
                              onClick={() => addToCart(cart)}
                            >
                              <FaPlus />
                            </div>
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
                          <button
                            type="submit"
                            className="w-full text-center duration-300 bg-white border rounded-lg cursor-pointer md:py-1 md:text-xl border-rose-500 text-rose-500 hover:text-white hover:bg-rose-500"
                            onClick={() => removeFromCart(cart)}
                          >
                            Delete Row
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <h1 className="m-2 text-lg text-center md:text-end md:mr-8">
                  Cart item(s): <span className="h3">{cartTotalQuantity}</span>
                </h1>

                <button
                  type="submit"
                  onClick={clearCart}
                  className="w-full py-1 my-2 duration-300 border border-red-800 rounded-lg hover:bg-red-800 hover:text-white "
                >
                  Clear All Items
                </button>
              </>
            )}
          </form>
          <Link to="/" className="btnPrimary">
            Go back To The Home Screen
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
