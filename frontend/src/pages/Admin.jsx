import React from "react";
import Sidebar from "../components/admin/Sidebar";
import AdminHome from "../components/admin/AdminHome";
import { Route, Routes } from "react-router-dom";
import Category from "../components/admin/category/Category";
import Brand from "../components/admin/brands/Brand";
import AddProduct from "../components/admin/products/AddProduct";
import ViewProduct from "../components/admin/products/ViewProduct";
import EditProduct from "../components/admin/products/EditProduct";

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

              <Route path="all-product" element={<ViewProduct />} />

              <Route path="add-product" element={<AddProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
            </Routes>
          </div>
        </section>
      </Sidebar>
    </div>
  );
};

export default Admin;
