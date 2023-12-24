import React from "react";
import { BiCategory, BiListUl } from "react-icons/bi";
import { Search } from "../../utils";

const ProductList = () => {
  return (
    <div className="flex flex-col pt-4 md:pt-14">
      <div className="flex flex-col items-start justify-start gap-2 pb-2 border-b-2 md:items-center md:justify-between md:flex-row md:gap-0">
        <div className="flex items-center justify-center h3">
          <BiCategory
            color="blue"
            className="mx-2 duration-300 border rounded-md cursor-pointer hover:text-xl"
          />
          <BiListUl
            color="red"
            className="mx-2 duration-300 border rounded-md cursor-pointer hover:text-xl"
          />
          <p className="font-light h2">
            <span className="font-bold">13</span> Product found
          </p>
        </div>
        <div className="md:w-[40%] w-[100%]">
          <Search />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ProductList;
