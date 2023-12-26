import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  SORT_PRODUCT,
} from "../../redux/features/product/filterSlice";
import { BiMinus, BiPlus } from "react-icons/bi";
import { GET_PRICE_RANGE } from "../../redux/features/product/productSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const sortProduct = [
  { id: "rad01", name: "Latest", value: "latest" },
  { id: "rad02", name: "Lowest Price", value: "lowest-price" },
  { id: "rad03", name: "Highest Price", value: "highest-price" },
  { id: "rad04", name: "A - Z", value: "a-z" },
  { id: "rad05", name: "Z - A", value: "z-a" },
];

const ProductFilter = () => {
  const [open, setOpen] = useState(true);
  const [openCat, setOpenCat] = useState(true);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState([50, 4000]);

  const dispatch = useDispatch();
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );

  const allCategories = [
    "All",
    ...new Set(products?.map((product) => product.category)),
  ];

  const allBrands = [
    "All",
    ...new Set(products?.map((product) => product.brand)),
  ];

  const filterProductCategory = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products: products, category: cat }));
  };

  useEffect(() => {
    dispatch(SORT_PRODUCT({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(GET_PRICE_RANGE({ products }));
  }, [dispatch, products]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const clearFilter = () => {
    setOpen(true);
    setOpenCat(true);
    setCategory("All");
    setSort("latest");
    setBrand("All");
    setPrice([minPrice, maxPrice]);
  };
  return (
    <div
      className={`h-screen duration-500 px-2 border-r pt-4 md:pt-14 bg-cl-sec overflow-y-scroll`}
    >
      <div className="p-2 mb-2 duration-500 rounded-md bg-cl-white">
        <div
          className="flex items-center justify-between border-b cursor-pointer text-bold"
          onClick={() => setOpenCat(!openCat)}
        >
          <p>Categories</p>
          <div className="duration-1000">
            {openCat ? <BiPlus /> : <BiMinus />}
          </div>
        </div>
        <div
          className={`${
            openCat ? "hidden duration-700" : "h-fit duration-700"
          } capitalize`}
        >
          {allCategories.map((cat, index) => {
            return (
              <div className="w-full " key={index}>
                <button
                  className={
                    `${category}` === cat
                      ? `text-cl-acn font-semibold bg-cl-sec w-full text-start pl-1 rounded-xs capitalize duration-100 border-r-cl-acn border-r-2`
                      : ` p-1 w-full text-start capitalize label-text hover:bg-cl-sec hover:text-cl-acn duration-300 rounded-sm`
                  }
                  onClick={() => filterProductCategory(cat)}
                >
                  {cat}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-2 my-2 duration-500 rounded-md bg-cl-white">
        <div
          className="flex items-center justify-between border-b cursor-pointer text-bold"
          onClick={() => setOpen(!open)}
        >
          <p>Sort by</p>
          <div className="duration-1000">{open ? <BiPlus /> : <BiMinus />}</div>
        </div>
        <div
          className={`${
            open ? "hidden duration-700" : "h-fit duration-700"
          } capitalize`}
        >
          {sortProduct.map((item, i) => {
            return (
              <div className="px-2 form-control" key={i}>
                <label className="justify-start gap-2 cursor-pointer label">
                  <input
                    type="radio"
                    name="sortProduct"
                    id={item.id}
                    value={item.value}
                    className=" peer/draft radio-xs"
                    onChange={(e) => setSort(e.target.value)}
                  />
                  <span
                    className="label-text hover:text-cl-acn peer-checked/draft:text-cl-acn"
                    for={item.id}
                  >
                    {item.name}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="my-2">
        <h4 className="mt-6 text-md text-bold">Brands</h4>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full max-w-xs bg-transparent select select-bordered"
        >
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>

      <div className="my-2 ">
        <h4 className="mt-6 text-md text-bold">Price</h4>
        <div className="p-2 mb-4">
          <Slider
            range
            marks={{
              1: `${price[0]}`,
              1000: `${price[1]}`,
            }}
            min={minPrice}
            max={maxPrice}
            defaultValue={[minPrice, maxPrice]}
            tipFormatter={(value) => `$${value}`}
            tipProps={{
              placement: "top",
              visible: true,
            }}
            value={price}
            onChange={(price) => setPrice(price)}
          />
        </div>
      </div>

      <button
        className="w-full mt-2 text-red-500 border-red-500 btnPrimary hover:bg-red-500"
        onClick={clearFilter}
      >
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;
