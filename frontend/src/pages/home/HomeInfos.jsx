import React from "react";
import {
  BsCartCheck,
  BsClockHistory,
  BsFillCreditCardFill,
} from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";

const data = [
  {
    icon: <FaShippingFast size={30} className="text-blue-800 " />,
    heading: "Free Shipping",
    text: "We offer free shipping on special products",
  },
  {
    icon: <BsFillCreditCardFill size={30} className="text-yellow-500" />,
    heading: "Secure Payment",
    text: "Make secure payment for your product.",
  },
  {
    icon: <BsCartCheck size={30} className="text-green-600" />,
    heading: "Quality Products",
    text: "We sell products from only tested and proven brands.",
  },
  {
    icon: <BsClockHistory size={30} className="text-red-400" />,
    heading: "24/7 Support",
    text: "Get access to support from our expert support team.",
  },
];

const HomeInfos = () => {
  return (
    <div className="--grid-4 place-items-center">
      {data.map((item, index) => {
        return (
          <div
            className="p-2 border rounded-lg w-60 h border-cl-acn bg-cl-sec"
            key={index}
          >
            <div className="">{item.icon}</div>
            <h2 className="my-1 text-xl font-bold text-center">
              {item.heading}
            </h2>
            <p className="">{item.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HomeInfos;
