import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import ProductForm from "./ProductForm";
import {
  RESET_PROD,
  createProduct,
} from "../../../redux/features/product/productSlice";
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
  const [files, setFiles] = useState([]);
  const { isLoading, message } = useSelector((state) => state.product);

  const { name, category, brand, quantity, color, price, regularPrice } =
    product;

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
      image: files,
    };
    await dispatch(createProduct(formData));
    // console.log(formData);
  };

  useEffect(() => {
    if (message === "Product created successfully") {
      navigate("/admin/all-products");
    }
    dispatch(RESET_PROD());
  }, [message, navigate, dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      <h2 className="h2">Add new Product</h2>
      <ProductForm
        saveProduct={saveProduct}
        product={product}
        setProduct={setProduct}
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
