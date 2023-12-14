import React, { useEffect, useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteBrand,
  getBrands,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const { isLoading, brands } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Brand",
      message: "Are you sure to do this brand ?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delBrand(slug),
        },
        {
          label: "Cancel",
          //   onClick: () => alert("Click No"),
        },
      ],
    });
  };
  const delBrand = async (slug) => {
    await dispatch(deleteBrand(slug));
    await dispatch(getBrands());
  };

  return (
    <div className="mt-4">
      <div
        className="flex items-center justify-between p-3 font-medium border cursor-pointer bg-cl-sec rounded-xl"
        onClick={() => setOpen(!open)}
      >
        <p>Brand List</p>
        <BsArrowDownCircle
          className={`  duration-700 ${open && "rotate-180 text-cl-acn"}`}
        />
      </div>
      <div
        className={` shadow-xl md:mx-4 my-2 md:p-2 duration-500 rounded-xl ${
          open ? "hidden" : "h-fit"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="md:table md:p-2 table-sm">
            <thead>
              <tr className="text-xl border-cl-acn border-y-[1px] text-cl-black font-normal">
                <th>s/n</th>
                <th>Names</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.length === 0 ? (
                <tr className="mt-2 font-normal text-center uppercase md:text-xl text-rose-500 ">
                  No brand found
                </tr>
              ) : (
                <>
                  {brands.map((brand, index) => {
                    const { _id, name, slug, category } = brand;
                    return (
                      <tr key={index} className="hover:bg-cl-sec">
                        <td>{index + 1}</td>
                        <td className="capitalize">{name}</td>
                        <td className="capitalize">{category}</td>
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

export default BrandList;
