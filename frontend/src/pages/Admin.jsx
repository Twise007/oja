import React from "react";
import Sidebar from "../components/admin/Sidebar";
import AdminHome from "../components/admin/AdminHome";
import { Route, Routes } from "react-router-dom";
import Category from "../components/admin/category/Category";
import Brand from "../components/admin/brands/Brand";
import AddProduct from "../components/admin/products/AddProduct";
import ViewProduct from "../components/admin/products/ViewProduct";
import EditProduct from "../components/admin/products/EditProduct";
import Coupon from "../components/admin/products/Coupon";
import Orders from "../components/adminOrders/Orders";
import OrdersDetails from "../components/adminOrders/OrdersDetails";

const Admin = () => {
  return (
    <div>
      <Sidebar>
        <section>
          <div className="container">
            <Routes>
              <Route path="/" element={<AdminHome />} />
              <Route path="/home" element={<AdminHome />} />
              <Route path="categories" element={<Category />} />
              <Route path="brands" element={<Brand />} />

              <Route path="all-products" element={<ViewProduct />} />

              <Route path="add-product" element={<AddProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="orders" element={<Orders />} />
              <Route path="order-details/:id" element={<OrdersDetails />} />

              <Route path="coupon" element={<Coupon />} />
            </Routes>
          </div>
        </section>
      </Sidebar>
    </div>
  );
};

export default Admin;
