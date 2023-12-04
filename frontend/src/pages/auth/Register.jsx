import React, { useEffect, useState } from "react";
import { BsPersonPlus, BsFillLockFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import registerPic from "../../assets/register.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../utils";
import { RESET_AUTH, register } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cpassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All field are required");
    }

    if (password !== cpassword) {
      return toast.error("Password do not match");
    }

    if (password.length < 6) {
      return toast.error("Password must be up to 6 character");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    const userData = {
      name,
      email,
      password,
    };

    await dispatch(register(userData));
  };
  
  useEffect(() => {
    if(isSuccess && isLoggedIn) {
      navigate("/")
    }
    dispatch(RESET_AUTH())
  }, [isSuccess, isLoggedIn, dispatch, navigate])

  return (
    <div>
      {isLoading && <Loader />}
      <section className={`container min-h-[88vh] authB bg-cl-white hero`}>
        <div className="flex flex-col items-center ">
          <div className="mb-20 text-center">
            <h1 className="text-2xl font-bold md:text-5xl">
              Register an Account with us
            </h1>
          </div>

          <div className="flex flex-row-reverse items-center justify-between">
            <img
              src={registerPic}
              alt="register"
              className="hidden max-w-sm md:flex"
            />
            <div className="flex flex-col items-center">
              <div className="md:p-5 shadow-2xl glass rounded-[50px] text-cl-white flex flex-col pb-20 z-10">
                <form
                  onSubmit={registerUser}
                  className="flex flex-col items-center text-center "
                >
                  <div className="p-6 m-2 mb-5 -mt-16 text-5xl border-2 rounded-full bg-cl-sec w-fit text-cl-acn">
                    <BsPersonPlus />
                  </div>
                  <div>
                    <div className="flex m-4 text-center">
                      <div className="p-4 px-6 text-center bg-cl-acn">
                        <FaRegUser className="text-xl" />
                      </div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                        className="w-full p-2 text-xl outline-none bg-cl-acn2 text-cl-black"
                      />
                    </div>

                    <div className="flex m-4 text-center">
                      <div className="p-4 px-6 text-center bg-cl-acn">
                        <IoMail className="text-xl" />
                      </div>
                      <input
                        type="email"
                        placeholder="Email ID"
                        required
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className="w-full p-2 text-xl outline-none bg-cl-acn2 text-cl-black"
                      />
                    </div>

                    <div className="flex m-4 text-center">
                      <div className="p-4 px-6 text-center bg-cl-acn">
                        <BsFillLockFill className="text-xl" />
                      </div>
                      <input
                        type="text"
                        placeholder="Password"
                        required
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        className="w-full p-2 text-xl outline-none bg-cl-acn2 text-cl-black"
                      />
                    </div>

                    <div className="flex m-4 text-center">
                      <div className="p-4 px-6 text-center bg-cl-acn">
                        <BsFillLockFill className="text-xl" />
                      </div>
                      <input
                        type="text"
                        placeholder="Confirm Password"
                        required
                        name="cpassword"
                        value={cpassword}
                        onChange={handleInputChange}
                        className="w-full p-2 text-xl outline-none bg-cl-acn2 text-cl-black"
                      />
                    </div>

                    <button type="submit" className="w-[90%] btnPrimary">
                      Register
                    </button>
                  </div>
                  <div className="">
                    <div className="p-2 m-4 text-2xl text-center border rounded-xl w-fit text-cl-black">
                      OR
                    </div>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="hover:border-0 btnLink hover:link"
                  ></Link>
                </form>
              </div>
              <Link
                to="/login"
                className="p-4 bg-cl-acn text-white rounded-b-[20px] w-60  -mt-2 hover:text-cl-acn hover:bg-cl-white border border-cl-acn text-center text-lg flex flex-col"
              >
                <span className="text-xs label-text-alt">
                  Already have an Account ?
                </span>
                <button className="font-semibold">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
