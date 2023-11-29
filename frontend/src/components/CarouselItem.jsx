import React from "react";
import { Link } from "react-router-dom";
import { shortenText } from "../utils";

const CarouselItem = ({ url, name, price, description }) => {
  return (
    <div className="m-2 rounded-lg shadow-xl card w-[20rem]">
      <Link to="/product-details">
        <img src={url} alt="product" className="w-full rounded-t-lg h-60" />
        <div className="items-center text-center card-body ">
          <p>{`$${price}`}</p>
          <h4 className="card-title">{shortenText(name, 18)}</h4>
          <p>{shortenText(description, 26)}</p>
        </div>
      </Link>
      <button className="mb-2 btnPrimary">Add to Cart</button>
    </div>
  );
};

export default CarouselItem;
