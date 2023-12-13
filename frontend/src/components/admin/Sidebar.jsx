import React, { useState } from "react";
import { BsArrowLeftCircle, BsHouse } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineAddChart,
  MdOutlineCategory,
} from "react-icons/md";
import { TbBrandSketch, TbBrand4Chan, TbBrandAbstract } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/features/auth/authSlice";

const menu = [
  { name: "home", link: "/home", icon: BsHouse },
  { name: "all products", link: "/all-products", icon: MdDashboard },
  { name: "add Product", link: "/add-product", icon: MdOutlineAddChart },
  { name: "orders", link: "/orders", icon: TbBrandAbstract },
  { name: "coupon", link: "/coupon", icon: TbBrandSketch },
  { name: "categories", link: "/categories", icon: MdOutlineCategory },
  { name: "brands", link: "/brands", icon: TbBrand4Chan },
];

const activeLink = ({ isActive }) =>
  isActive ? ` bg-transparent ` : "bg-cl-acn text-white";

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const user = useSelector(selectUser);
  const username = user?.name;

  return (
    <div className="flex w-full bg-cl-white">
      <div
        className={`h-screen bg-cl-sec ${
          open ? "w-44 " : "w-16"
        } relative duration-500 `}
      >
        <BsArrowLeftCircle
          size={26}
          className={`cursor-pointer absolute -right-3 top-9 rounded-full bg-cl-acn text-white ${
            !open && "rotate-180"
          }
              `}
          onClick={() => setOpen(!open)}
        />
        <div className="flex flex-col items-center justify-center h-20 m-0 text-white bg-cl-acn">
          <FaUserCircle size={30} />
          <h4 className={`text-base duration-400 ${!open && "hidden"}`}>
            {username}
          </h4>
        </div>
        <div className={`mt-3 flex flex-col pr-2 relative`}>
          <ul className="">
            {menu.map((menu, index) => (
              <Link to={`/admin${menu.link} `} key={index}>
                <li
                  key={index}
                  className={`
                  flex items-center p-2 m-3 text-sm capitalize border-b-2 rounded-none cursor-pointer border-cl-acn group gap-x-4 hover:bg-cl-acn hover:text-white `}
                >
                  <span className="block float-left text-2xl">
                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  </span>
                  <span
                    className={`text-base duration-400 ${
                      !open && "opacity-0 translate-x-24 overflow-hidden"
                    }`}
                  >
                    <div className={activeLink}>{menu.name}</div>
                  </span>

                  {/*title hover design below */}
                  <span
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-cl-sec font-semibold 
                      whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                      group-hover:px-2 group-hover:py-1 group-hover:left-12 group-hover:duration-300 group-hover:w-fit `}
                    style={{ zIndex: "10" }}
                  >
                    {menu.name}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 h-screen ml-2 overflow-scroll">{children}</div>
    </div>
  );
};

export default Sidebar;
