import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";

const CreateCoupon = () => {
  const { isLoading } = useSelector((state) => state.product);

  return (
    <div>
      {isLoading && <Loader />}
      <h2 className="h2">Coupons</h2>
    </div>
  );
};

export default CreateCoupon;
