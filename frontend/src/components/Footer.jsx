import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="p-4 footer footer-center bg-base-300 text-base-content">
      <aside>
        <p>Copyright © {year} - All right reserved by Oja Nigeria Ltd</p>
      </aside>
    </footer>
  );
};

export default Footer;
