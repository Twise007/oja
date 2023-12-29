import React from "react";
import { Link } from "react-router-dom";
import { shortenText } from "../utils";
import { ADD_TO_CART, saveCartDB } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";

function removeHTMLTags(input) {
  const regex = /<[^>]+>/g;
  return input.replace(regex, "");
}

const CarouselItem = ({
  url,
  name,
  price,
  regularPrice,
  description,
  product,
}) => {
  const desc = removeHTMLTags(description);
  
  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  return (
    <div className="w-auto mx-2 shadow-xl bg-cl-white">
      <Link to={`/product-details/${product._id}`}>
        <img
          src={url}
          alt="product"
          className="w-full border-b-2 rounded-t-lg border-b-cl-sec h-52"
        />
        <div className="items-center w-full text-center">
          <p className="text-md md:text-xl">
            <span className="pr-2 label-text">
              {regularPrice > 0 && regularPrice}
            </span>
            {`${price}`}
          </p>

          <h4 className="text-xl font-semibold">{shortenText(name, 18)}</h4>
          <p>{shortenText(desc, 26)}</p>
        </div>
      </Link>
      <button
        className="w-full my-2 btnPrimary"
        onClick={() => addToCart(product)}
      >
        Add to cart{" "}
      </button>
    </div>
  );
};

export default CarouselItem;
