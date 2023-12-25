import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SORT_PRODUCT,
  selectFilteredProducts,
} from "../../redux/features/product/filterSlice";

const sortProduct = [
  { id: "rad01", name: "Latest", value: "latest" },
  { id: "rad02", name: "Lowest Price", value: "lowest-price" },
  { id: "rad03", name: "Highest Price", value: "highest-price" },
  { id: "rad04", name: "A - Z", value: "a-z" },
  { id: "rad05", name: "Z - A", value: "z-a" },
];

const ProductFilter = ({ products }) => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState({});

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setSort((prev) => {
  //     return { ...prev, [name]: value };
  //   });
  // };

  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(SORT_PRODUCT({ products, sort }));
  }, [dispatch, products, sort]);
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
        {sortProduct.map((item, i) => {
          return (
            <div className="px-2 form-control" key={i}>
              <label className="justify-start gap-2 cursor-pointer label">
                <input
                  type="radio"
                  name="sortProduct"
                  id={item.id}
                  value={item.value}
                  className="radio"
                  onChange={(e) => setSort(e.target.value)}
                />
                <span className="label-text" for={item.id}>
                  {item.name}
                </span>
              </label>
            </div>
          );
        })}
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
