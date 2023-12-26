import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../redux/features/product/productSlice";
import { SpinnerImg } from "../Loader";
import DOMPurify from "dompurify";
import Ratings from "../Ratings";
import { calculateAverageRating } from "../../utils";

const ProductDetails = () => {
  const { id } = useParams();
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();
  const { product, isLoading, brand } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);
  const slideLength = product?.image?.length;

  const nextSlide = () => {
    setImageIndex(imageIndex === slideLength - 1 ? 0 : imageIndex + 1);
  };

  let slideInterval;
  useEffect(() => {
    if (product?.image?.length > 1) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, 3000);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [imageIndex, slideInterval, product]);
  const averageRating = calculateAverageRating(product?.ratings);

  return (
    <section>
      <div className="container">
        <div>
          <h2 className="h2">product details</h2>
          <Link
            to="/shop"
            className="flex items-center gap-2 px-2 duration-300 cursor-pointer hover:bg-cl-sec w-fit hover:font-bold"
          >
            <BsArrowLeft />
            <p>Back to Products</p>
          </Link>
        </div>
        {isLoading ? (
          <SpinnerImg />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
            <div className="flex flex-col my-2 border-2 rounded-t-lg border-cl-sec">
              <div className="p-2 bg-cl-sec mb:p-4">
                <img
                  src={product?.image[imageIndex]}
                  alt={product?.name}
                  className="rounded-t-md "
                />
              </div>
              <div className="flex w-16 h-16 gap-2 m-2 mb:m-4 bg-cl-white">
                {product?.image.map((img, index) => {
                  return (
                    <img
                      key={index}
                      src={img}
                      alt="product"
                      onClick={() => setImageIndex(index)}
                      className={
                        imageIndex === index
                          ? "border-cl-acn border rounded-t-md"
                          : ""
                      }
                    />
                  );
                })}
              </div>
            </div>
            <div className="py-2">
              <h3 className="font-bold h3">{product?.name}</h3>
              <Ratings
                averageRating={averageRating}
                noOfRating={product?.ratings?.length}
              />
              <div className="flex items-center gap-2 my-2 capitalize">
                <h4 className="px-2 font-semibold capitalize border-r border-cl-black w-fit">
                  {product?.brand}
                </h4>
                <p>
                  {product?.quantity > 0 ? (
                    <p className="text-green-700">
                      In stock<span className="text-xl font-extrabold">({product?.quantity})</span>
                    </p>
                  ) : (
                    <p className="text-red-700">Out of Stock</p>
                  )}
                </p>
              </div>
              <h5 className="pb-4 text-xl font-semibold">
                {"$"}
                {product?.price}
              </h5>
              <h3 className="font-semibold h3">Description</h3>
              <div
                className="flex flex-col p-1"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description),
                }}
              ></div>
              <button className="w-full my-2 btnPrimary">Add to cart</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
