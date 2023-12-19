import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  RESET_PROD,
  getProduct,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../../redux/features/product/productSlice";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, message } = useSelector((state) => state.product);
  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [description, setDescription] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [files, setFiles] = useState([]);

  const { categories, brands } = useSelector((state) => state.category);
  
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);
    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
    if (productEdit && productEdit.image) setFiles(productEdit.image);
  }, [productEdit]);

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
    filterBrands(product?.category);
  }, [product?.category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    if (files.length < 1) {
      return toast.error("Please add an image");
    }

    const formData = {
      name: product?.name,
      category: product?.category,
      brand: product?.brand,
      color: product?.color,
      quantity: Number(product?.quantity),
      regularPrice: Number(product?.regularPrice),
      price: Number(product?.price),
      description,
      images: files, //possible make the images to image
    };
    await dispatch(updateProduct({ id, formData }));
    console.log(formData);
  };

  useEffect(() => {
    if (message === "Product updated Successful") {
      navigate("/admin/all-products");
    }
    dispatch(RESET_PROD());
  }, [message, navigate, dispatch]);

  return;
  <div>
    <h2 className="h2">Edit Product</h2>
    {isLoading && <Loader />}
    <ProductForm
      saveProduct={saveProduct}
      product={product}
      handleInputChange={handleInputChange}
      categories={categories}
      filteredBrands={filteredBrands}
      isEditing={true}
      description={description}
      setDescription={setDescription}
      files={files}
      setFiles={setFiles}
    />
  </div>;
};

export default EditProduct;
