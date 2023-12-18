import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import ProductForm from "./ProductForm";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { createProduct } from "../../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  category: "",
  brand: "",
  quantity: "",
  color: "",
  price: "",
  regularPrice: "",
};
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [description, setDescription] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [files, setFiles] = useState([]);
  const { isLoading } = useSelector((state) => state.product);
  const { categories, brands } = useSelector((state) => state.category);

  const { name, category, brand, quantity, color, price, regularPrice } =
    product;

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  //filter brand based on selected category
  const filterBrands = (selectedCategory) => {
    const newBrands = brands.filter(
      (brand) => brand.category === selectedCategory
    );
    setFilteredBrands(newBrands);
  };

  useEffect(() => {
    filterBrands(category);
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const generateSku = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();

    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    if (files.length < 1) {
      return toast.error("Please add an image");
    }

    const formData = {
      name,
      sku: generateSku(category),
      category,
      brand,
      color,
      quantity: Number(quantity),
      regularPrice: Number(regularPrice),
      price: Number(price),
      description,
      images: files, //possible make the images to image
    };
    await dispatch(createProduct(formData));
    console.log(formData);

    navigate("/admin/all-products");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h2 className="h2">Add new Product</h2>
      <ProductForm
        saveProduct={saveProduct}
        product={product}
        handleInputChange={handleInputChange}
        categories={categories}
        filteredBrands={filteredBrands}
        isEditing={false}
        description={description}
        setDescription={setDescription}
        files={files}
        setFiles={setFiles}
      />
    </div>
  );
};

export default AddProduct;
