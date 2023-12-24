import React from "react";
import { Link } from "react-router-dom";
import Ratings from "../../Ratings";
import { calculateAverageRating, shortenText } from "../../../utils";
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
  description,
}) => {
    const averageRating = calculateAverageRating(product?.ratings)
  return (
    <div
      className={
        grid
          ? `card duration-500 w-64 bg-cl-white border m-2 rounded-md`
          : `card card-side duration-500 w-full bg-cl-white border m-2 rounded-md`
      }
    >
      <Link to={`product-details/${_id}`}>
        <figure>
          <img
            src={image[0]}
            alt={name}
            className={
              grid
                ? `w-[12rem] h-[14rem] p-4 hover:p-2 duration-500`
                : `w-[13rem] h-[14rem] p-4 hover:p-2 duration-500`
            }
          />
        </figure>
      </Link>
      <div className="p-2 border card-body">
        <p className="text-xl ">
          <span className="pr-2 label-text">
            {regularPrice > 0 && regularPrice}
          </span>
          {`$${price}`}
        </p>
        <Ratings  averageRating={averageRating} noOfRating={product?.ratings?.length}/>
        <h2 className="card-title">{shortenText(name, 20)}</h2>

        {!grid && (
          <div
          className="p-1 bg-cl-sec"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                shortenText(product?.description, 200)
              ),
            }}
          ></div>
        )}

        <div className="justify-end card-actions">
          {product?.quantity > 0 ? (
            <button className="px-2 py-2 font-semibold text-blue-800 capitalize transition ease-in-out border-2 border-blue-800 rounded-lg cursor-pointer hover:text-cl-white hover:bg-blue-800">
              Add to Cart
            </button>
          ) : (
            <button
              onClick={() => toast.error("Sorry, Product is out of stock")}
              className="px-2 py-2 font-semibold text-red-800 capitalize transition ease-in-out border-2 border-red-800 rounded-lg cursor-pointer hover:text-cl-white hover:bg-red-800"
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
