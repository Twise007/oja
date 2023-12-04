import React, { useState } from "react";
import { BsPersonPlus, BsFillLockFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";
import registerPic from "../../assets/register.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const registerUser = () => {};

  return (
    <section className={`container min-h-[88vh] authB bg-cl-white hero`}>
      <div className="flex flex-col items-center ">
        <div className="mb-20 text-center">
          <h1 className="text-3xl font-bold md:text-5xl">
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      className="w-full p-2 text-xl outline-none bg-cl-acn2 text-cl-black"
                    />
                  </div>

                  <button className="w-[90%] btnPrimary">Register</button>
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

                </Link>
              </form>
            </div>
            <Link
              to="/login"
              className="p-4 bg-cl-acn text-white rounded-b-[20px] w-60  -mt-2 hover:text-cl-acn hover:bg-cl-white border border-cl-acn text-center text-lg flex flex-col"
            >
              <span className="text-xs label-text-alt">Have an account ?</span>
              <button className="font-semibold">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
