import React, { useEffect, useState } from "react";
import { BsPerson, BsFillShieldLockFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import loginPic from "../../assets/login.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../utils";
import { RESET_AUTH, login } from "../../redux/features/auth/authSlice";
import { getCartDB, saveCartDB } from "../../redux/features/cartSlice";

const Login = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const [urlParams] = useSearchParams();
  const redirect = urlParams.get("redirect");
  // console.log(urlParams.get("redirect"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const togglePassword = () => {
    setOpen(!open);
  };
  const loginUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All field are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    const userData = {
      email,
      password,
    };
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      if (redirect === "cart") {
        dispatch(
          saveCartDB({
            cartItems: JSON.parse(localStorage.getItem("cartItems")),
          })
        );
        return navigate("/cart");
      }
      dispatch(getCartDB());
    }
    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate, redirect]);

  return (
    <div>
      {/* {isLoading && <Loader />} */}
      <section className={`container min-h-[88vh] bg-cl-white hero`}>
        <div className="flex flex-col items-center ">
          <div className="mb-20 text-center">
            <h1 className="text-2xl font-bold md:text-5xl">
              Login to Your Account
            </h1>
          </div>

          <div className="flex flex-row-reverse items-center justify-between">
            <img
              src={loginPic}
              alt="login"
              className="hidden max-w-sm md:flex"
            />
            <div className="flex flex-col items-center">
              <div className="md:p-5 shadow-2xl glass rounded-[50px] text-cl-white flex flex-col  z-10">
                <form
                  onSubmit={loginUser}
                  className="flex flex-col items-center text-center "
                >
                  <div className="p-6 m-2 mb-5 -mt-16 text-5xl border-2 rounded-full bg-cl-sec w-fit text-cl-acn">
                    <BsPerson />
                  </div>
                  <div>
                    <div className="flex m-4 text-center">
                      <div className="p-4 px-6 text-center bg-cl-acn">
                        <FaRegUser className="text-xl" />
                      </div>
                      <input
                        type="email"
                        placeholder="Email ID"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 outline-none bg-cl-acn2 text-cl-black"
                      />
                    </div>
                    <div className="flex m-4 text-center">
                      <div className="p-4 px-6 text-center bg-cl-acn">
                        <BsFillShieldLockFill className="text-xl" />
                      </div>
                      <input
                        type={open ? "text" : "password"}
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 outline-none bg-cl-acn2 text-cl-black"
                      />
                      <div
                        className="p-4 text-center cursor-pointer bg-cl-acn2"
                        onClick={togglePassword}
                      >
                        {open ? (
                          <AiOutlineEyeInvisible className="text-xl" />
                        ) : (
                          <AiOutlineEye className="text-xl" />
                        )}
                      </div>
                    </div>

                    {!isLoading && (
                      <button className="w-[90%] btnPrimary">Login</button>
                    )}
                    {isLoading && (
                      <button
                        disabled
                        className="w-[90%] border-2 border-cl-acn rounded-lg text-cl-acn"
                      >
                        <span className="loading loading-spinner loading-md"></span>
                      </button>
                    )}
                  </div>
                  <div className="">
                    <div className="p-2 m-4 text-2xl text-center border rounded-xl w-fit text-cl-black">
                      OR
                    </div>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="hover:border-0 btnLink hover:link"
                  >
                    Forgot password ?
                  </Link>
                </form>
              </div>
              <Link
                to="/register"
                className="p-4 bg-cl-acn text-white rounded-b-[20px] w-60  -mt-2 hover:text-cl-acn hover:bg-cl-white border border-cl-acn text-center text-lg flex flex-col mb-4"
              >
                <span className="text-xs label-text-alt">
                  Don`t have an account ?
                </span>
                <button className="font-semibold">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
