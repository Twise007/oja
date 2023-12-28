import React from "react";
import { Link } from "react-router-dom";
import Ratings from "../Ratings";
import { calculateAverageRating, shortenText } from "../../utils";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

const ProductItem = ({
  product,
  grid,
  _id,
  name,
  price,
  image,
  regularPrice,
}) => {
  // const averageRating = calculateAverageRating(product?.ratings);
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
          // averageRating={averageRating}
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

        <div className="justify-center md:justify-end card-actions">
          {product?.quantity > 0 ? (
            <button className="p-1 font-semibold text-blue-800 capitalize transition ease-in-out border border-blue-800 rounded-lg cursor-pointer md:p-2 hover:text-cl-white hover:bg-blue-800 md:border-2">
              Add to Cart
            </button>
          ) : (
            <button
              onClick={() => toast.error("Sorry, Product is out of stock")}
              className="p-1 font-semibold text-red-800 capitalize transition ease-in-out border border-red-800 rounded-lg cursor-pointer md:p-2 hover:text-cl-white hover:bg-red-800 md:border-2"
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
