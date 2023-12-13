import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCategory,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import Loader from "../../Loader";

const CreateCategory = ({ reloadCategory }) => {
  const [name, setName] = useState("");
  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const saveCategory = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      return toast.error("Category name must be up to 3 characters");
    }
    const formData = {
      name,
    };
    dispatch(createCategory(formData));
    dispatch(getCategories());
    setName("");
    reloadCategory();
  };

  return (
    <div className="mb-2">
      {isLoading && <Loader />}
      <h2 className="h2">Create Category</h2>
      <p>
        Use this form to <b>Create a Category</b>
      </p>
      <form
        onSubmit={saveCategory}
        className="p-2 my-2 border shadow-xl rounded-xl bg-cl-sec"
      >
        <div className="form-control">
          <label className=" label">
            <span className="font-medium label-text">Category Name :</span>
          </label>
          <input
            className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black"
            type="text"
            required
            placeholder="Category Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="my-3 btnPrimary " type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
