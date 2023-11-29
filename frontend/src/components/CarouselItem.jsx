import React from "react";
import { Link } from "react-router-dom";
import { shortenText } from "../utils";

const CarouselItem = ({ url, name, price, description }) => {
  return (
    <div className="w-auto m-4 shadow-xl p card bg-cl-white">
      <Link to="/product-details">
        <img src={url} alt="product" className="w-full border-b-2 rounded-t-lg border-b-cl-sec h-52" />
        <div className="items-center w-full text-center">
          <p className="py-2 font-bold text-cl-acn">{price}</p>
          <h4 className="text-xl font-semibold">{shortenText(name, 18)}</h4>
          <p>{shortenText(description, 26)}</p>
        </div>
      </Link>
      <button className="m-2 btnPrimary">Add to Cart</button>
    </div>
  );
};

export default CarouselItem;
