import React from "react";
import CreateCategory from "./CreateCategory";
import CategoryList from "./CategoryList";
import { getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { useDispatch } from "react-redux";

const Category = () => {
  const dispatch = useDispatch();

  const reloadCategory = () => {
    dispatch(getCategories());
  };
  return (
    <div>
      <CreateCategory reloadCategory={reloadCategory} />
      <CategoryList />
    </div>
  );
};

export default Category;
