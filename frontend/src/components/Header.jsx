import React, { useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import { useDispatch } from "react-redux";
import Logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout, RESET_AUTH } from "../redux/features/auth/authSlice";
import ShowOnLogin, { AdminOnlyLink, ShowOnLogout } from "./hiddenLink";
import { Username, Userphoto } from "../pages/Profile";
import CartIcon from "./shop/CartIcon";

//   to be able to use the logo at any part of the app
export const logo = (
  <div className="flex-1 navbar-start ">
    <Link
      to="/"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      className="flex items-center justify-center text-2xl font-semibold transition-colors ease-out text-cl-black hover:text-cl-acn group "
    >
      <img
        src={Logo}
        alt="home"
        className="w-12 h-12 rounded-full cursor-pointer group-hover:rotate-[360deg] duration-700"
      />
      <h5 className="px-2 -ml-[8px] group-hover:bg-cl-acn rounded-e-full group-hover:text-cl-white duration-200 pb-1">
        Oja
      </h5>
    </Link>
  </div>
);

const activeLink = ({ isActive }) =>
  isActive ? `border-cl-acn border-b-2 pb-1 px-2 text-cl-acn ` : "btnLink";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };

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
    <div className="sticky top-0 z-20 capitalize shadow-md bg-cl-white navbar">
      {logo}
      <div className="navbar-center">
        <NavLink to="/shop" className={activeLink}>
          Shop
        </NavLink>
        <AdminOnlyLink>
          <ShowOnLogin>
            <NavLink to="/admin" className={activeLink}>
              <p className="pl-2 ml-0 text-orange-700 border-l">Admin</p>
            </NavLink>
          </ShowOnLogin>
        </AdminOnlyLink>
      </div>

      <div className="hidden gap-2 navbar-end md:flex">
        <ShowOnLogout>
          <NavLink to="/login" className={activeLink}>
            Login
          </NavLink>
          <NavLink to="/register" className={activeLink}>
            Register
          </NavLink>
        </ShowOnLogout>

        <ShowOnLogin>
          <div className="flex items-center gap-2 text-cl-black">
            hi,
            <Username />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="rounded-full duration-50 hover:border-2 hover:border-cl-acn avatar"
            >
              <div className="w-10 rounded-full">
                <Userphoto />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-cl-white rounded-box w-52 text-cl-black"
            >
              <li>
                <Link to="/profile" className="text-cl-black">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/order-history" className="text-cl-black">My Order</Link>
              </li>
              <li>
                <Link className="text-cl-black">My wishlist</Link>
              </li>
              <li>
                <ShowOnLogin>
                  <Link to="/" className="text-cl-black" onClick={logoutUser}>
                    Logout
                  </Link>
                </ShowOnLogin>
              </li>
            </ul>
          </div>
        </ShowOnLogin>

        <CartIcon />
      </div>

      {/* mobile menu */}

      <div className="flex items-center justify-end flex-1 md:hidden">
        <div className="flex gap-2">
          <CartIcon />
          <ShowOnLogin>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="rounded-full duration-50 hover:border-2 hover:border-cl-acn avatar"
              >
                <div className="w-10 rounded-full">
                  <Userphoto />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-cl-white rounded-box w-52 text-cl-black"
              >
                <li>
                  <Link to="/profile" className="text-cl-black">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="text-cl-black">My Order</Link>
                </li>
                <li>
                  <Link className="text-cl-black">My wishlist</Link>
                </li>
                <li>
                  <ShowOnLogin>
                    <Link to="/" className="text-cl-black" onClick={logoutUser}>
                      Logout
                    </Link>
                  </ShowOnLogin>
                </li>
              </ul>
            </div>
          </ShowOnLogin>
          <ShowOnLogout>
            <div className="rounded-lg text-cl-white bg-cl-acn">
              <Hamburger toggled={toggle} toggle={setToggle} />
            </div>
          </ShowOnLogout>
        </div>
        <ShowOnLogout>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } absolute top-[52px] right-0 my-3  min-h-[100vh] hero-overlay bg-opacity-60 w-full`}
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <div className="w-32 py-2 text-lg bg-cl-sec">
              <div
                className="flex flex-col p-2"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                <NavLink to="/register" className={activeLink}>
                  <p className="w-full px-2 border-b rounded-t bg-cl-white">
                    Register
                  </p>
                </NavLink>
                <NavLink to="/login" className={activeLink}>
                  <p className="w-full px-2 border-b rounded-t bg-cl-white">
                    login
                  </p>
                </NavLink>
              </div>
            </div>
          </div>
        </ShowOnLogout>
      </div>
    </div>
  );
};

export default Header;
