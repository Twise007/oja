import React, { useEffect, useState, useContext } from "react";
import { BsCart, BsSearch, BsPerson } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const navLinks = [
  { title: "shop", id: "shop" },
  { title: "blog", id: "blog" },
  { title: "our story", id: "our-story" },
  { title: <BsPerson />, id: "profile", name: "profile" },
];

//   to be able to use the logo at any part of the app
export const logo = (
  <Link
    to="/"
    onClick={() => {
      window.scrollTo(0, 0);
    }}
    className="flex-1 gap-2 ease-out hover:text-cl-acn navbar-start"
  >
    <img
      src={Logo}
      alt="home"
      className="w-12 h-12 rounded-full cursor-pointer6"
    />
    <h5 className="">Oja</h5>
  </Link>
);

const Header = () => {
  const [active, setActive] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // the use effect is use for refresh back to the top of the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-20 bg-white navbar">
      {logo}

      <h2 className="navbar-center btn-primary">Shop</h2>
      <div className="gap-2 navbar-end">
        <div>login</div>
        <div>register</div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="border-0 btn bg-bg-sec btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="w-full p-2 m-1 text-black rounded-lg btn bg-bg-sec hover:bg-cl-acn hover:text-bg-sec">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ul className="flex-row hidden gap-10 list-none md:flex ">
        {navLinks.map((nav) => (
          <li
            key={nav.id}
            className={`${
              active === nav.title ? "text-cl-acn" : "text-black"
            } hover:text-cl-acn cursor-pointer duration-300 capitalize`}
            onClick={() => setActive(nav.title)}
          >
            <Link to={nav.id}>{nav.title}</Link>
          </li>
        ))}
        <Link
          to="/cart"
          className="duration-300 cursor-pointer hover:text-cl-acn"
        >
          <div className=" indicator">
            <span className="p-1 text-white indicator-item indicator-top indicator-end badge badge-secondary">
              4
            </span>
            <div className="grid place-items-center">
              <BsCart />
            </div>
          </div>
        </Link>

        <div
          className="duration-300 cursor-pointer hover:text-cl-acn"
          onClick={() => {
            setActiveSearch(true);
          }}
        >
          <BsSearch className="text-[24px] text-black" />
        </div>

        {activeSearch && (
          <div className="absolute justify-center right-0 items-center w-[80%] h-full pt-4 mb-3 bg-white border-b-2 border-[#cdcdcd] rounded-r-md flex z-10">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full h-full px-4 bg-transparent outline-none"
            />
            <button
              onClick={() => {
                setActiveSearch(false);
              }}
              type="submit"
              className="h-full px-4 bg-[#cdcdcd] hover:bg-cl-acn hover:text-[#cdcdcd] rounded-r-md text-cl-acn duration-300"
            >
              <FaTimes className="text-[24px]" />
            </button>
          </div>
        )}
      </ul> */}

      {/* mobile menu */}

      <div className="flex items-center justify-end flex-1 md:hidden">
        <div className="flex items-center justify-between gap-6 text-center">
          <Link
            to="/cart"
            className="duration-300 cursor-pointer hover:text-cl-acn text-[24px] mt-2"
          >
            <div className="indicator">
              <span className="p-1 indicator-item indicator-top indicator-end badge badge-secondary">
                {/* {productsCount} */}
              </span>
              <div className="grid place-items-center">
                <BsCart />
              </div>
            </div>
          </Link>
          {/* <Hamburger toggled={toggle} toggle={setToggle} /> */}
        </div>
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } absolute top-12 right-0 my-3 min-w-[140px] min-h-screen glass`}
        >
          <ul className="justify-start list-none bg-white menu">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`w-[13pc] cursor-pointer text-[20px] hover:text-[24px] ${
                  active === nav.title ? "text-cl-acn" : ""
                }`}
                onClick={() => {
                  setToggle(!toggle);
                  setActive(nav.title);
                }}
              >
                <Link
                  className="py-4 capitalize duration-300 rounded-md hover:text-cl-acn"
                  to={nav.id}
                >
                  {nav.title} {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
