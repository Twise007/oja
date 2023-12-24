import React, { useEffect, useState } from "react";
import { BiCategory, BiListUl } from "react-icons/bi";
import { Search } from "../../utils";

import ProductItem from "./productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../redux/features/product/filterSlice";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className="flex flex-col pt-4 md:pt-12">
      <div className="sticky flex flex-col items-start justify-start gap-2 pb-2 border-b-2 md:items-center md:justify-between md:flex-row md:gap-0">
        <div className="flex items-center justify-center h3">
          <BiCategory
            color="blue"
            onClick={() => setGrid(true)}
            className="mx-2 duration-300 border rounded-md cursor-pointer hover:text-xl"
          />
          <BiListUl
            color="red"
            onClick={() => setGrid(false)}
            className="mx-2 duration-300 border rounded-md cursor-pointer hover:text-xl"
          />
          <p className="font-light h2">
            <span className="font-bold">{products.length}</span> Product found
          </p>
        </div>
        <div className="md:w-[40%] w-[100%]">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className={`h-[90vh] p-2 overflow-y-scroll bg-cl-sec `}>
        {products.length === 0 ? (
          <p>No Product Found</p>
        ) : (
          <div className="md:ml-2 columnBox">
            {filteredProducts.map((product) => {
              return (
                <div key={product._id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
