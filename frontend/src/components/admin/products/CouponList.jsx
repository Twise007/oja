import React, { useEffect, useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteCoupon,
  getCoupon,
  getCoupons,
} from "../../../redux/features/coupon/couponSlice";

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const { coupons } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
    // dispatch(getCoupon("COUPON"));
  }, [dispatch]);

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete coupon",
      message: "Are you sure to do this coupon ?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delCoupon(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };
  const delCoupon = async (id) => {
    await dispatch(deleteCoupon(id));
    await dispatch(getCoupons());
  };

  return (
    <div className="mt-4">
      <div
        className="flex items-center justify-between p-3 font-medium border cursor-pointer bg-cl-sec rounded-xl"
        onClick={() => setOpen(!open)}
      >
        <p>Coupons List</p>
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
                <th>Discount %</th>
                <th>Date Created</th>
                <th>Expires Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                <div className="mt-2 font-normal text-center uppercase md:text-xl text-rose-500 place-items-center">
                  No coupon found
                </div>
              ) : (
                <>
                  {coupons.map((coupon, index) => {
                    const { _id, name, discount, expiresAt, createdAt, slug } =
                      coupon;
                    return (
                      <tr key={_id} className="hover:bg-cl-sec">
                        <td>{index + 1}</td>
                        <td className="capitalize">{name}</td>
                        <td className="capitalize">{discount}{"%"}</td>
                        <td className="capitalize">
                          {createdAt.substring(0, 10)}
                        </td>
                        <td className="capitalize">
                          {expiresAt.substring(0, 10)}
                        </td>
                        <td className="cursor-pointer ">
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
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

export default CouponList;
