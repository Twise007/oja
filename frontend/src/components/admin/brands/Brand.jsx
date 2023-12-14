import React from "react";
import CreateBrand from "./CreateBrand";
import BrandList from "./BrandList";
import { useDispatch } from "react-redux";
import { getBrands } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const Brand = () => {
  const dispatch = useDispatch();
  const reloadBrands = () => {
    dispatch(getBrands());
  };

  return (
    <div>
      <CreateBrand reloadBrands={reloadBrands} />
      <BrandList />
    </div>
  );
};

export default Brand;
