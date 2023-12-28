import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Gadgets",
    image: "https://i.ibb.co/5GVkd3m/c1.jpg",
  },
  {
    id: 2,
    title: "Women Fashion",
    image: "https://i.ibb.co/nQKLjrW/c2.jpg",
  },
  {
    id: 3,
    title: "Sport Sneakers",
    image: "https://i.ibb.co/fNkBYgr/c3.jpg",
  },
];

const Category = ({ title, image }) => {
  const navigate = useNavigate();
  return (
    <div className="w-auto h-64 bg-white shadow-2xl rounded-tl-2xl rounded-br-2xl">
      <img src={image} alt="product" className="w-full h-44 rounded-tl-2xl " />
      <div className="flex items-center justify-between p-2 pt-4 ">
        <h3 className=" h3 fond-bold">{title}</h3>
        <button
          className="p-1 m-1 btnPrimary"
          onClick={() => navigate("/shop")}
        >
          {"Shop Now"}
        </button>
      </div>
    </div>
  );
};
const ProductCategory = () => {
  return (
    <div className="columnBox">
      {categories.map((cat) => {
        return (
          <div key={cat.id}>
            <Category title={cat.title} image={cat.image} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductCategory;
