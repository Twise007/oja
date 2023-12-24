import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/features/product/productSlice";
import ProductFilter from "../components/shop/ProductFilter";
import ProductList from "../components/shop/ProductList";
import { SpinnerImg } from "../components/Loader";

const Shop = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { isLoading, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const toggleFilter = () => {
    showFilter(!showFilter);
  };

  return (
    <div>
      <div className="flex ">
        {/* <div>{isLoading ? null : <ProductFilter />}</div> */}
        <div>
          <ProductFilter />
        </div>
        <div className="container relative flex-1 h-screen ml-2 overflow-y-scroll">
          {/* <div>{isLoading ? <SpinnerImg /> : <ProductList />}</div> */}
          <div>
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
