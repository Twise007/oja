import React, { useState } from "react";
import { BiCategory } from "react-icons/bi";

const ProductFilter = () => {
  return (
    <div className={`h-screen duration-500 px-2 border-r pt-4 md:pt-14 `}>
      <div className="mb-2">
        <h5 className="text-lg text-bold">Product Categories</h5>
        <div className="px-2 form-control">
          <label className="justify-start gap-2 cursor-pointer label">
            <input type="radio" checked name="radio-1" className="checkbox " />
            <span className="label-text">Remember me</span>
          </label>
        </div>
        <div className="px-2 form-control">
          <label className="justify-start gap-2 cursor-pointer label">
            <input type="radio" checked name="radio-1" className="checkbox " />
            <span className="label-text">Remember me</span>
          </label>
        </div>
      </div>
      <div className="my-2">
        <h4 className="mt-6 text-md text-bold">Sort by</h4>
        <div className="px-2 form-control">
          <label className="justify-start gap-2 cursor-pointer label">
            <input
              type="radio"
              name="radio-10"
              value="latest"
              className="radio"
              checked
            />
            <span className="label-text">Latest</span>
          </label>
        </div>
        <div className="px-2 form-control">
          <label className="justify-start gap-2 cursor-pointer label">
            <input
              type="radio"
              name="radio-10"
              value="lowest-price"
              className="radio"
              checked
            />
            <span className="label-text">Lowest Price</span>
          </label>
        </div>
        <div className="px-2 form-control">
          <label className="justify-start gap-2 cursor-pointer label">
            <input
              type="radio"
              name="radio-10"
              value="highest-price"
              className="radio"
              checked
            />
            <span className="label-text">Highest Price</span>
          </label>
        </div>
        <div className="px-2 form-control">
          <label className="justify-start gap-2 cursor-pointer label">
            <input
              type="radio"
              name="radio-10"
              value="a-z"
              className="radio"
              checked
            />
            <span className="label-text">A - Z</span>
          </label>
        </div>
        <div className="px-2 form-control">
          <label className="justify-start gap-2 cursor-pointer label">
            <input
              type="radio"
              name="radio-10"
              value="z-a"
              className="radio"
              checked
            />
            <span className="label-text">Z -A</span>
          </label>
        </div>
      </div>
      <div className="my-2">
        <h4 className="mt-6 text-md text-bold">Brand</h4>
        <select className="w-full max-w-xs bg-transparent select select-bordered">
          <option>Who shot first?</option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>
      <div className="my-2">
        <h4 className="mt-6 text-md text-bold">Price</h4>
        <input
          type="range"
          min={0}
          max="10"
          value="40"
          className="range range-sm"
        />
        <div className="flex justify-between w-full px-2 text-xs">
          <span className="text-label">50</span>
          <span className="text-label">1300</span>
        </div>
      </div>
      <button className="w-full mt-2 btnPrimary">Clear Filter</button>
    </div>
  );
};

export default ProductFilter;
