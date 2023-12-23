import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="h-[96vh] hero">
      <div className="flex flex-col hero-content">
        <h2 className="h2">Page Not Found</h2>
        <p>Looks like the page you are looking for could not be.</p>

        <Link to={"/"}>
          <button type="submit" className="w-full btnPrimary">
            Please go back to the Home page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
