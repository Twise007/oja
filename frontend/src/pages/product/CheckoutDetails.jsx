import React, { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
  selectBillingAddress,
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/product/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSummary from "../../components/shop/checkout/CheckoutSummary";
import { BsArrowDownCircle } from "react-icons/bs";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [openShip, setOpenShip] = useState(true);
  const [openBill, setOpenBill] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const paymentMethod = useSelector(selectPaymentMethod);
  const shipAddress = useSelector(selectShippingAddress);
  const billAddress = useSelector(selectBillingAddress);

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  useEffect(() => {
    if (Object.keys(shipAddress).length > 0) {
      setShippingAddress({ ...shipAddress });
    }
    if (Object.keys(billAddress).length > 0) {
      setBillingAddress({ ...billAddress });
    }
  }, [shipAddress, billAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));

    if (paymentMethod === "") {
      toast.error("Please select a payment method!!!");
      navigate("/cart");
    }
    if (paymentMethod === "stripe") {
      navigate("/checkout-stripe");
    }
    if (paymentMethod === "flutterwave") {
      navigate("/checkout-flutterwave");
    }
    if (paymentMethod === "paypal") {
      navigate("/checkout-paypal");
    }
    if (paymentMethod === "wallet") {
      navigate("/checkout-wallet");
    }
  };

  return (
    <section>
      <div className="container">
        <h2 className="h2">Check Out</h2>

        <div className="flex flex-col md:flex-row">
          <form onSubmit={handleSubmit} className="max-w-sm md:m-6">
            <div>
              <div
                className="flex items-center justify-between p-3 font-medium border cursor-pointer bg-cl-sec rounded-xl"
                onClick={() => setOpenShip(!openShip)}
              >
                <h3 className="h3">Shipping Address</h3>
                <BsArrowDownCircle
                  className={`  duration-700 ${
                    openShip && "rotate-180 text-cl-acn"
                  }`}
                />
              </div>
              <div
                className={` shadow-xl md:mx-4 my-2 md:p-2 duration-500 rounded-xl ${
                  openShip ? "hidden" : "h-fit"
                }`}
              >
                <div className="form-control">
                  <label className=" label">
                    <span className="font-medium label-text">
                      Recipient Name :
                    </span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    required
                    placeholder="Recipient Name"
                    name="name"
                    value={shippingAddress?.name}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium label-text">
                      Address Line 1 :
                    </span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    required
                    placeholder="Address Line 1"
                    name="line1"
                    value={shippingAddress?.line1}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium label-text">
                      Address Line 2 :
                    </span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    //   required
                    placeholder="Address Line 2"
                    name="line2"
                    value={shippingAddress?.line2}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>

                <div className="form-control">
                  <label className=" label">
                    <span className="font-medium label-text">City :</span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    required
                    placeholder="City"
                    name="city"
                    value={shippingAddress?.city}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>

                <div className="form-control">
                  <label className=" label">
                    <span className="font-medium label-text">State :</span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    required
                    placeholder="State"
                    name="state"
                    value={shippingAddress?.state}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>

                <div className="form-control">
                  <label className=" label">
                    <span className="font-medium label-text">
                      Postal Code :
                    </span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    required
                    placeholder="Postal Code"
                    name="postal_code"
                    value={shippingAddress?.postal_code}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>

                <div className="form-control">
                  <label className=" label">
                    <span className="font-medium label-text">Country :</span>
                  </label>
                  <CountryDropdown
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    valueType="short"
                    value={shippingAddress?.country}
                    onChange={(val) =>
                      handleShipping({
                        target: {
                          name: "country",
                          value: val,
                        },
                      })
                    }
                  />
                </div>

                <div className="form-control">
                  <label className=" label">
                    <span className="font-medium label-text">Phone No :</span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    required
                    placeholder="Phone No"
                    name="phone"
                    value={shippingAddress?.phone}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
              </div>
            </div>

            {/* billing address */}
            <div className="my-2 md:my-6">
              <div
                className="flex items-center justify-between p-3 font-medium duration-300 border cursor-pointer bg-cl-sec rounded-xl w-[24rem]"
                onClick={() => setOpenBill(!openBill)}
              >
                <h3 className="h3">Billing Address</h3>
                <BsArrowDownCircle
                  className={`  duration-700 ${
                    openBill && "rotate-180 text-cl-acn"
                  }`}
                />
              </div>
              <div
                className={` shadow-xl md:mx-4 my-2 md:p-2 duration-300 rounded-xl ${
                  openBill ? "hidden" : "h-fit"
                }`}
              >
                <div className="form-control">
                  <label className=" label">
                    <span className="font-medium label-text">
                      Recipient Name :
                    </span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    required
                    placeholder="Recipient Name"
                    name="name"
                    value={billingAddress?.name}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium label-text">
                      Address Line 1 :
                    </span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    required
                    placeholder="Address Line 1"
                    name="line1"
                    value={billingAddress?.line1}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium label-text">
                      Address Line 2 :
                    </span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    //   required
                    placeholder="Address Line 2"
                    name="line2"
                    value={billingAddress?.line2}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>

                <div className="form-control">
                  <label className=" label">
                    <span className="font-medium label-text">City :</span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    required
                    placeholder="City"
                    name="city"
                    value={billingAddress?.city}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>

                <div className="form-control">
                  <label className=" label">
                    <span className="font-medium label-text">State :</span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    required
                    placeholder="State"
                    name="state"
                    value={billingAddress?.state}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>

                <div className="form-control">
                  <label className=" label">
                    <span className="font-medium label-text">
                      Postal Code :
                    </span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    required
                    placeholder="Postal Code"
                    name="postal_code"
                    value={billingAddress?.postal_code}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>

                <div className="form-control">
                  <label className=" label">
                    <span className="font-medium label-text">Country :</span>
                  </label>
                  <CountryDropdown
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    valueType="short"
                    value={billingAddress?.country}
                    onChange={(val) =>
                      handleBilling({
                        target: {
                          name: "country",
                          value: val,
                        },
                      })
                    }
                  />
                </div>

                <div className="form-control">
                  <label className=" label">
                    <span className="font-medium label-text">Phone No :</span>
                  </label>
                  <input
                    className="p-2 capitalize bg-transparent border rounded-lg outline-none border-cl-black placeholder:italic"
                    type="text"
                    required
                    placeholder="Phone No"
                    name="phone"
                    value={billingAddress?.phone}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full my-6 btnPrimary">
              proceed to checkout
            </button>
          </form>
          <CheckoutSummary />
        </div>
      </div>
    </section>
  );
};

export default CheckoutDetails;
