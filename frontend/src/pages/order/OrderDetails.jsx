import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrder } from "../../redux/features/order/orderSlice";
import { BsArrowLeft } from "react-icons/bs";
import { SpinnerImg } from "../../components/Loader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Logo from "../../assets/logo.png";
import { Username } from "../Profile";


const OrderDetails = () => {
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  const downloadPDF = () => {
    const input = pdfRef.current;
    setLoader(true);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imageWidth * ratio,
        imageHeight * ratio
      );
      setLoader(false);
      pdf.save(`OjaAppInvoice.pdf`);
    });
  };

  return (
    <section>
      <div className="container min-h-screen">
        <h2 className="h2">order details</h2>
        <Link
          to="/order-history"
          className="flex items-center gap-2 px-2 duration-300 cursor-pointer hover:bg-cl-sec w-fit hover:font-bold"
        >
          <BsArrowLeft />
          <p>Go back to Order</p>
        </Link>
        <div className="mt-2" ref={pdfRef}>
          <div className="m-6">
            <div className="flex flex-row-reverse items-center justify-between">
              <div className="flex items-center justify-center text-2xl font-semibold text-cl-black">
                <img src={Logo} alt="home" className="w-12 h-12 rounded-full" />
                <h5 className="px-2 -ml-[8px] pb-1">Oja</h5>
              </div>
              <div className="flex gap-2 place-items-baseline">
                <h3 className="h3">
                  Dear <Username />,
                </h3>
                <p>Thank you for your patronage</p>
              </div>
            </div>

            {isLoading && order === null ? (
              <SpinnerImg />
            ) : (
              <div className="">
                <div className="flex items-start w-full mt-4 justify-evenly">
                  <div>
                    <h3 className="font-bold h3">Order details</h3>
                    <b className="flex gap-2">
                      Order No.
                      <span className="gap-3 text-cl-acn2">{order?._id}</span>
                    </b>

                    <b className="flex gap-2">
                      Payment Method
                      <span className="gap-3 uppercase text-cl-acn2">
                        {order?.paymentMethod}
                      </span>
                    </b>
                    <b className="flex gap-2">
                      Order Status
                      <span className="gap-3 text-cl-acn2">
                        {order?.orderStatus}
                      </span>
                    </b>
                  </div>
                  <div>
                    <h3 className="font-bold h3">Customer details</h3>

                    <b className="flex gap-2">
                      Full Name :
                      <span className="gap-3 text-cl-acn2">
                        {order?.shippingAddress?.name}
                      </span>
                    </b>
                    <p className="flex gap-2">
                      <div className="gap-3 text-cl-acn2">
                        <b className="text-cl-black">Address:</b>{" "}
                        {order?.shippingAddress.line1}
                        {order?.shippingAddress.line2}
                        {order?.shippingAddress.city}
                        <br />
                        <b className="text-cl-black">State:</b>{" "}
                        {order?.shippingAddress.state}
                        <br />
                        <b className="text-cl-black">Country:</b>{" "}
                        {order?.shippingAddress.country}
                      </div>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center w-full my-2 text-center">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.cartItems.map((cart, index) => {
                        const { _id, name, price, image, cartQuantity } = cart;
                        return (
                          <tr key={_id}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{price}</td>
                            <td>{cartQuantity}</td>
                            <td>{(price * cartQuantity).toFixed(2)}</td>
                            <td className={"icons"}>
                              <Link
                                to={`/review-product/${_id}`}
                                className="p-1 duration-500 rounded-sm cursor-pointer text-cl-white hover:text-cl-acn bg-cl-acn hover:bg-cl-white"
                              >
                                Review Product
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col">
                  {/* <div className="flex justify-between mx-3 place-items-baseline">
                    <h3 className="mt-2 font-normal "> Total Amount</h3>

                  </div> */}
                  <div className="flex justify-between mx-3 place-items-baseline">
                    <h3 className="font-normal ">
                      Discount |
                      <span className="text-cl-acn">{order?.coupon.name}</span>{" "}
                    </h3>
                    <h3>{order?.coupon?.discount}%</h3>
                  </div>
                  <div className="flex justify-between mx-3 mt-2 border-y-2 place-items-baseline">
                    <h3 className="font-bold ">Total Amount to be Paid</h3>
                    <h3 className="text-xl font-bold text-cl-acn">
                      ${(order?.orderAmount).toFixed(2)}
                    </h3>
                  </div>
                </div>
                {/* <h3 className="">Thank you for your patronage</h3> */}
              </div>
            )}
          </div>
        </div>

        <button
          disabled={!(loader === false)}
          onClick={downloadPDF}
          className="w-full border-2 rounded-lg border-cl-acn text-cl-acn"
        >
          {loader ? (
            <span className="m-1 loading loading-spinner loading-md"></span>
          ) : (
            <p className="border-0 btnPrimary">Download as PDF</p>
          )}
        </button>
      </div>
    </section>
  );
};

export default OrderDetails;
