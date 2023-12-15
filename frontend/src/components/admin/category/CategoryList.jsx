import React, { useEffect, useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Category",
      message: "Are you sure to do this category ?",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteCat(slug),
        },
        {
          label: "Cancel",
          //   onClick: () => alert("Click No"),
        },
      ],
    });
  };
  const deleteCat = async (slug) => {
    await dispatch(deleteCategory(slug));
    await dispatch(getCategories());
  };

  return (
    <div className="mt-4">
      <div
        className="flex items-center justify-between p-3 font-medium duration-100 border cursor-pointer bg-cl-sec rounded-xl"
        onClick={() => setOpen(!open)}
      >
        <p>Category List</p>

        <BsArrowDownCircle
          className={`  duration-700 ${open && "rotate-180 text-cl-acn"}`}
        />
      </div>
      <div
        className={` shadow-xl md:mx-4 my-2 md:p-2 rounded-b-xl duration-1000 ${
          open ? "hidden" : "h-fit"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="md:table md:p-2 table-sm ">
            <thead>
              <tr className="text-xl border-cl-acn border-y-[1px] text-cl-black font-normal">
                <th>s/n</th>
                <th>Names</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr className="mt-2 font-normal text-center uppercase md:text-lg text-rose-500 ">
                  <p>No Category found</p>
                </tr>
              ) : (
                <>
                  {categories.map((cat, index) => {
                    const { _id, name, slug } = cat;
                    return (
                      <tr key={index} className="hover:bg-cl-sec">
                        <td>{index + 1}</td>
                        <td className="capitalize">{name}</td>
                        <td className="cursor-pointer ">
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(slug)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
