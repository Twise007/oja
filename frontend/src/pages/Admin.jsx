import React from "react";
import Sidebar from "../components/admin/Sidebar";
import AdminHome from "../components/admin/AdminHome";
import { Route, Routes } from "react-router-dom";
import Category from "../components/admin/category/Category";

const Admin = () => {
  return (
    <div>
      <Sidebar>
        <section>
          <div className="container">
            <Routes>
              <Route path="home" element={<AdminHome />} />
              <Route path="categories" element={<Category />} />
            </Routes>
          </div>
        </section>
      </Sidebar>
    </div>
  );
};

export default Admin;
