import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import forgotPic from "../../assets/forgot.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const forgotUser = () => {};

  return (
    <section className={`container min-h-[88vh] bg-cl-white hero`}>
      <div className="flex flex-col items-center ">
        <div className="mb-20 text-center">
          <h1 className="text-2xl font-bold md:text-5xl">
            Forgot Password to Your Account
          </h1>
        </div>

        <div className="flex flex-row-reverse items-center justify-between">
          <img
            src={forgotPic}
            alt="forgot"
            className="hidden max-w-sm md:flex"
          />
          <div className="flex flex-col items-center">
            <div className="md:p-5 shadow-2xl glass rounded-[50px] text-cl-white flex flex-col pb-10 z-10">
              <form
                onSubmit={forgotUser}
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

                  <button className="w-[90%] btnPrimary">Submit</button>
                </div>
              </form>
            </div>

            <Link
              to="/login"
              className="p-4 bg-cl-acn text-white rounded-b-[20px] w-60  -mt-2 hover:text-cl-acn hover:bg-cl-white border border-cl-acn text-center text-lg flex flex-col"
            >
              <span className="text-xs label-text-alt">Remember your details</span>
              <button className="font-semibold">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
