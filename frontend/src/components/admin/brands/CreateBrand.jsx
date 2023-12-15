import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import {
  createBrand,
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
// import { BsArrowDownCircle } from "react-icons/bs";

const CreateBrand = () => {
  const [name, setName] = useState("");
  // const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState("Select category");
  const [category, setCategory] = useState("");
  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);


  const saveBrand = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      return toast.error("Brand name must be up to 3 characters");
    }

    if (!category) {
      return toast.error("Please add parent category");
    }
    const formData = {
      name,
      category,
    };
    await dispatch(createBrand(formData));
    await dispatch(getBrands());
    setName("");
  };
  return (
    <div className="mb-2">
      {isLoading && <Loader />}
      <h2 className="h2">Create Brand</h2>
      <p>
        Use this form to <b>Create a Brand</b>
      </p>
      <form
        onSubmit={saveBrand}
        className="p-2 my-2 border shadow-xl rounded-xl bg-cl-sec"
      >
        <div className="form-control">
          <label className=" label">
            <span className="font-medium label-text">Brand Name :</span>
          </label>
          <input
            className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black"
            type="text"
            required
            placeholder="Brand Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* <div className="form-control">
          <label className=" label">
            <span className="font-medium label-text">Parent Category</span>
          </label>
          <div>
            <div
              className="flex items-center justify-between p-3 font-medium border cursor-pointer bg-cl-sec rounded-xl"
              onClick={() => setOpen(!open)}
              // onChange={(e) => setCategory(selected)}
            >
              <p onChange={(e) => setCategory(selected)}>{selected}</p>
              <BsArrowDownCircle
                className={`  duration-700 ${open && "rotate-180 text-cl-acn"}`}
              />
            </div>
            <div
              className={` shadow-xl md:mx-4 my-2 md:p-2 duration-500 rounded-xl ${
                open ? "hidden" : "h-fit"
              }`}
            >
              {categories.length > 0 &&
                categories.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={(e) => {
                      setSelected(cat.name);
                      setOpen(!open);
                    }}
                    className="w-full bg-cl-sec hover:bg-cl-white"
                  >
                    {cat.name}
                  </div>
                ))}
            </div>
          </div>
        </div> */}

        <div className="form-control">
          <label className=" label">
            <span className="font-medium label-text">Parent Category</span>
          </label>
          <select
            name="category"
            className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
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

        <button className="my-3 btnPrimary " type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default CreateBrand;
