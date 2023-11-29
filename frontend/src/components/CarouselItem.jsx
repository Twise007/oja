import React from "react";
import { Link } from "react-router-dom";
import { shortenText } from "../utils";

const CarouselItem = ({ url, name, price, description }) => {
  return (
    <div className="w-auto p-2 m-2 my-4 rounded-lg shadow-xl card">
      <Link to="/product-details">
        <img src={url} alt="product" className="w-full rounded-t-lg h-52" />
        <div className="items-center text-center">
          <p className="py-2">{price}</p>
          <h4 className="text-xl font-semibold text-cl-acn">{shortenText(name, 18)}</h4>
          <p>{shortenText(description, 26)}</p>
        </div>
      </Link>
      <button className="my-2 btnPrimary">Add to Cart</button>
    </div>
  );
};

export default CarouselItem;
