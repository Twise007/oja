import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Uploadwidget from "./Uploadwidget";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const ProductForm = ({
  saveProduct,
  isEditing,
  product,
  setProduct,
  description,
  setDescription,
  files,
  setFiles,
}) => {
  const dispatch = useDispatch();
  const [filteredBrands, setFilteredBrands] = useState([]);

  const { categories, brands } = useSelector((state) => state.category);

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

  const removeImage = (image) => {
    setFiles(files.filter((img) => img !== image));
  };
  return (
    <div>
      <form onSubmit={saveProduct} className="md:mx-6">
        <div className="mt-4">
          <Uploadwidget files={files} setFiles={setFiles} />

          <div className="form-control">
            <label className=" label">
              <span className="font-medium label-text">Product Images :</span>
            </label>
            <aside className="flex flex-row justify-center p-2 overflow-x-scroll border rounded-box bg-cl-sec">
              {files.length > 0 &&
                files.map((image, index) => (
                  <div className="m-1 border rounded-xl bg-cl-white">
                    <div
                      key={image}
                      className="flex flex-col justify-between w-40 h-full "
                    >
                      <img
                        src={image}
                        alt="productImage"
                        height={100}
                        className="pb-2 rounded-t-lg"
                      />
                      <div className="flex items-center justify-between p-1 rounded bg-cl-sec">
                        <BsTrash
                          size={25}
                          onClick={() => removeImage(image)}
                          className="cursor-pointer hover:text-red-500"
                        />
                        <div className="text-xl font-semibold ">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {files.length < 1 && (
                <p className="mx-2 text-center">
                  No image set for this product
                </p>
              )}
            </aside>
          </div>

          <div className="form-control">
            <label className=" label">
              <span className="font-medium label-text">Product Name :</span>
            </label>
            <input
              className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black"
              type="text"
              required
              placeholder="Product Name"
              name="name"
              value={product?.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <label className=" label">
              <span className="font-medium label-text">Product Category :</span>
            </label>
            <select
              name="category"
              className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black"
              value={product?.category}
              onChange={handleInputChange}
            >
              {isEditing ? (
                <option value={product?.category}>{product?.category}</option>
              ) : (
                <option>select category</option>
              )}
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat.name}
                    className="flex w-full gap-4 py-2 capitalize bg-cl-sec hover:bg-cl-white"
                  >
                    <p className="py-2 capitalize bg-red-500">{cat.name}</p>
                  </option>
                ))}
            </select>
          </div>

          <div className="form-control">
            <label className=" label">
              <span className="font-medium label-text">Product Brand :</span>
            </label>
            <select
              name="brand"
              className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black"
              value={product?.brand}
              onChange={handleInputChange}
            >
              {isEditing ? (
                <option value={product?.brand}>{product?.brand}</option>
              ) : (
                <option>select brand</option>
              )}
              {filteredBrands.length > 0 &&
                filteredBrands.map((brand) => (
                  <option
                    key={brand._id}
                    value={brand.name}
                    className="flex w-full gap-4 py-2 capitalize bg-cl-sec hover:bg-cl-white"
                  >
                    <p className="py-2 capitalize bg-red-500">{brand.name}</p>
                  </option>
                ))}
            </select>
          </div>

          <div className="form-control">
            <label className=" label">
              <span className="font-medium label-text">Product Color :</span>
            </label>
            <input
              className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black"
              type="text"
              // required
              placeholder="Product Color"
              name="color"
              value={product?.color}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <label className=" label">
              <span className="font-medium label-text">Regular Price :</span>
            </label>
            <input
              className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black"
              type="text"
              required
              placeholder="Regular Price"
              name="regularPrice"
              value={product?.regularPrice}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <label className=" label">
              <span className="font-medium label-text">Product Price :</span>
            </label>
            <input
              className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black"
              type="text"
              required
              placeholder="Product Price"
              name="price"
              value={product?.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <label className=" label">
              <span className="font-medium label-text">Product Quantity :</span>
            </label>
            <input
              className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black"
              type="text"
              required
              placeholder="Product Quantity"
              name="quantity"
              value={product?.quantity}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <label className=" label">
              <span className="font-medium label-text">
                Product Description :
              </span>
            </label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={ProductForm.modules}
              formats={ProductForm.formats}
              className="bg-transparent border rounded-lg outline-none border-cl-black"
            />
          </div>
        </div>

        <button type="submit" className="w-full my-3 btnPrimary">
          Save Product
        </button>
      </form>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
