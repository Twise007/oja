import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/features/product/productSlice";
import ProductFilter from "../components/shop/ProductFilter";
import ProductList from "../components/shop/ProductList";

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
    <section>
      <div className="container">
        <aside>
          <ProductFilter />
        </aside>
        <aside>
          <ProductList />
        </aside>
      </div>
    </section>
  );
};

export default Shop;
