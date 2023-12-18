import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Search, shortenText } from "../../../utils";
import { SpinnerImg } from "../../Loader";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

const ViewProduct = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProducts());
    }
  }, [isLoggedIn, dispatch]);

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure to do this product ?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          //   onClick: () => alert("Click No"),
        },
      ],
    });
  };

  //begin pagination

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  //end pagination

  return (
    <div className="">
      <h2 className="h2">All Product</h2>

      <div className="flex flex-col items-start gap-2 my-2 md:gap-0 md:justify-between md:flex-row md:item-center">
        <div className="text-lg font-bold">~ {products.length}</div>
        <Search value={search} onChange={(e) => setSearch(e.value.target)} />
      </div>

      {isLoading && <SpinnerImg />}
      <div className="mt-8 overflow-x-auto bg-cl-sec md:p-2">
        <table className="md:table md:p-2">
          <thead>
            <tr className="text-sm font-normal md:text-lg border-cl-acn border-y-2 text-cl-black">
              <th>s/n</th>
              <th>Names</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && products.length === 0 ? (
              <tr className="mt-2 font-normal text-center uppercase md:text-xl text-rose-500 ">
                No product found
              </tr>
            ) : (
              <>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={index} className="text-sm hover:bg-cl-white">
                      <td>{index + 1}</td>
                      <td className="px-2 capitalize">
                        {shortenText(name, 12)}
                      </td>
                      <td className="px-2 capitalize">{category}</td>
                      <td className="px-2 capitalize">
                        {"$"}
                        {price}
                      </td>
                      <td className="px-2 capitalize">{quantity}</td>
                      <td className="px-2 capitalize">
                        {"$"}
                        {price * quantity}
                      </td>
                      <td className="flex items-center justify-between">
                        <Link to={`/product-detail/${_id}`}>
                          <AiOutlineEye
                            color={"purple"}
                            className="duration-500 cursor-pointer hover:text-lg"
                          />
                        </Link>
                        <Link to={`/edit-product/${_id}`}>
                          <FaEdit
                            color={"green"}
                            className="duration-500 cursor-pointer hover:text-lg"
                          />
                        </Link>

                        <FaTrashAlt
                          color={"red"}
                          className="duration-500 cursor-pointer hover:text-lg"
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
      <div className="relative pt-6 mt-6 hero">
        <ReactPaginate
          previousLabel="Prev"
          nextLabel="Next"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          disabledClassName={"paginationDisable"}
          activeLinkClassName={"activePage"}
        />
      </div>
    </div>
  );
};

export default ViewProduct;
