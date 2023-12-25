import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/features/product/productSlice";
import ProductFilter from "../components/shop/ProductFilter";
import ProductList from "../components/shop/ProductList";
import { SpinnerImg } from "../components/Loader";
import { BsGear } from "react-icons/bs";

const Shop = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { isLoading, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  return (
    <div>
      <div className="flex ">
        <div
          className={`${showFilter ? "hidden" : "h-fit duration-700"}  md:flex`}
        >
          <div>{isLoading ? null : <ProductFilter products={products} />}</div>
        </div>

        <div
          className={`relative flex-1 h-screen ml-1 overflow-y-scroll bg-white md:container md:ml-2 `}
        >
          <div>
            {isLoading ? <SpinnerImg /> : <ProductList products={products} />}
          </div>
        </div>
        <div
          onClick={() => setShowFilter(!showFilter)}
          className={`pt-4 md:hidden cursor-pointer group max-h-[50px]`}
        >
          <BsGear className="text-2xl duration-700 border rounded-md cursor-pointer text-cl-acn group-hover:rotate-[360deg] h-fit" />
        </div>
      </div>
    </div>
  );
};

export default Shop;
