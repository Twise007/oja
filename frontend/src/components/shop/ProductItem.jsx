import React from "react";
import { Link, useParams } from "react-router-dom";
import Ratings from "../Ratings";
import { calculateAverageRating, shortenText } from "../../utils";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import {
  ADD_TO_CART,
  DECREASE_CART,
  saveCartDB,
  selectCartItems,
} from "../../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductItem = ({
  product,
  grid,
  _id,
  name,
  price,
  image,
  regularPrice,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const averageRating = calculateAverageRating(product?.ratings);
  const cartItems = useSelector(selectCartItems);

  const cart = cartItems.find((cart) => cart._id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart._id === id;
  });

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  return (
    <div
      className={
        grid
          ? `card duration-500 md:w-64 bg-cl-white border m-2 rounded-md w-44`
          : `card md:card-side duration-500 w-full bg-cl-white border m-2 rounded-md`
      }
    >
      <Link to={`/product-details/${_id}`}>
        <figure>
          <img
            src={image[0]}
            alt={name}
            className={
              grid
                ? `w-[8rem] md:w-[12rem] md:h-[14rem] h-[8rem] md:p-4 p-2 hover:p-1 md:hover:p-2 duration-500`
                : `w-[13rem] h-[14rem] md:p-4 p-2 hover:p-1 md:hover:p-2 duration-500`
            }
          />
        </figure>
      </Link>
      <div className="p-1 text-center border md:p-2 card-body md:text-start">
        <p className="text-md md:text-xl">
          <span className="pr-2 label-text">
            {regularPrice > 0 && regularPrice}
          </span>
          {`$${price}`}
        </p>
        <Ratings
          averageRating={averageRating}
          noOfRating={product?.ratings?.length}
        />
        <h2 className="font-semibold text-md md:card-title ">
          {shortenText(name, 20)}
        </h2>

        {!grid && (
          <div
            className="hidden p-1 bg-cl-sec md:flex md:flex-col"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                shortenText(product?.description, 200)
              ),
            }}
          ></div>
        )}

        <div className="flex flex-row items-center justify-between w-full md:flex-col">
          {isCartAdded < 0 ? null : (
            <div className="flex items-center">
              <div
                className="p-1 text-green-500 duration-300 rounded-lg cursor-pointer bg-cl-sec hover:bg-green-500 hover:text-cl-white"
                onClick={() => decreaseCart(product)}
              >
                <FaMinus />
              </div>
              <b className="mx-1"> {cart.cartQuantity} </b>
              <div
                className="p-1 text-red-500 duration-300 rounded-lg cursor-pointer bg-cl-sec hover:bg-red-500 hover:text-cl-white"
                onClick={() => addToCart(product)}
              >
                <FaPlus />
              </div>
            </div>
          )}
          <div className="md:w-full">
            {product?.quantity > 0 ? (
              <button
                className="my-2 btnPrimary md:w-full"
                onClick={() => addToCart(product)}
              >
                Add to cart{" "}
              </button>
            ) : (
              <button
                onClick={() => toast.error("Sorry, Product is out of stock")}
                className="my-2 text-red-700 border-red-700 btnPrimary hover:bg-red-700 md:w-full"
              >
                out of stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
