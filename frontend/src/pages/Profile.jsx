import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUser,
  updatePhoto,
  updateUser,
} from "../redux/features/auth/authSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { shortenText } from "../utils";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = "https://api.cloudinary.com/v1_1/df5i1j4uc/image/upload";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { isLoading, user } = useSelector((state) => state.auth);
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: {
      address: user?.address?.address || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
    },
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  const toggleWallet = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        photo: user?.photo || "",
        address: {
          address: user?.address?.address || "",
          state: user?.address?.state || "",
          country: user?.address?.country || "",
        },
      });
    }
  }, [dispatch, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = async (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    const userData = {
      name: profile.name,
      phone: profile.phone,
      address: {
        address: profile.address,
        state: profile.state,
        country: profile.country,
      },
    };

    await dispatch(updateUser(userData));
  };

  const savePhoto = async (e) => {
    e.preventDefault();
    let imageUrl;

    try {
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        // saving image to cloudinary
        const response = await fetch(url, { method: "post", body: image });
        const imgData = await response.json();
        imageUrl = imgData.url.toString();
      }
      // save image to mongodb
      const userData = {
        photo: profileImage ? imageUrl : profile.photo,
      };
      await dispatch(updatePhoto(userData));
      setImagePreview(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-2 ">
      {isLoading && <Loader />}
      <div className="h-52 max-h-52 bg-cl-acn rounded-xl hero">
        <h1 className="text-3xl font-semibold uppercase text-cl-white">
          Profile
        </h1>
      </div>
      <div className="md:mx-[6rem] mx-[2rem] ">
        {!isLoading && user && (
          <>
            <div className="flex flex-col items-center md:justify-between md:flex-row">
              <div className="flex flex-col items-center -mt-20 md:-mt-36 ">
                <div className="rounded-full bg-cl-sec shadow-2xl hero w-[10.5rem] h-[10.5rem] cursor-pointer">
                  <div className="w-40 h-40 rounded-full">
                    <img
                      src={imagePreview === null ? user?.photo : imagePreview}
                      alt="profile"
                      className="object-cover w-full h-full rounded-full "
                    />
                  </div>
                </div>
                <h3 className="m-2">
                  Role :{" "}
                  <span className="text-xl capitalize bold text-cl-acn">
                    {profile.role}
                  </span>
                </h3>
                {imagePreview !== null && (
                  <button
                    className="flex items-center justify-between gap-2 btnPrimary"
                    onClick={savePhoto}
                  >
                    <FaCloudUploadAlt size={18} /> <p>Upload Photo</p>
                  </button>
                )}
              </div>

              <div className="p-4 mt-1 text-center rounded-lg shadow-2xl bg-cl-sec">
                <div className="flex items-center justify-center m-3 border-b border-cl-black">
                  <h1 className="flex flex-col p-1 text-start">
                    <p>Wallet Balance</p>
                    <div className="flex items-center justify-between">
                      <p>
                        $ :
                        <span className="pl-1 text-2xl font-semibold text-cl-acn">
                          {open ? "1000" : "****"}
                        </span>
                      </p>
                      <span className="p-1 text-cl-acn" onClick={toggleWallet}>
                        {open ? (
                          <AiOutlineEyeInvisible size={20} />
                        ) : (
                          <AiOutlineEye size={20} />
                        )}
                      </span>
                    </div>
                  </h1>
                </div>
                <Link to="/wallet" className="btnPrimary">
                  Wallet
                </Link>
                <div className="flex items-center justify-center gap-0 py-2 m-0">
                  <div>Coupon Code : </div>
                  <h2 className=" text-xl font-semibold uppercase bg-transparent outline-none cursor-not-allowed text-end text-cl-acn w-[6rem]">
                    a45fdv
                  </h2>
                </div>
              </div>
            </div>
            <div>
              <form onSubmit={saveProfile} className="md:mx-6">
                <div className="mt-4">
                  <div className="form-control">
                    <input
                      class="block w-full  text-slate-500 border rounded-lg outline-none border-cl-black
                      file:mr-4 file:py-2 file:px-4 p-1 file:border-0 file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div className="form-control">
                    <label className=" label">
                      <span className="font-medium label-text">Name :</span>
                    </label>
                    <input
                      className="p-2 bg-transparent border rounded-lg outline-none border-cl-black"
                      type="text"
                      required
                      placeholder="John Doe"
                      name="name"
                      value={profile?.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className=" form-control">
                    <label className=" label">
                      <span className="font-medium label-text">
                        Email Cannot Be Change
                      </span>
                    </label>
                    <input
                      className="p-2 bg-transparent border rounded-lg outline-none cursor-not-allowed border-cl-black "
                      type="email"
                      disabled
                      name="email"
                      value={profile?.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-control">
                    <label className=" label">
                      <span className="font-medium label-text">Phone :</span>
                    </label>
                    <input
                      className="p-2 bg-transparent border rounded-lg outline-none border-cl-black"
                      type="text"
                      required
                      placeholder="Phone no"
                      name="phone"
                      value={profile?.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-control">
                    <label className=" label">
                      <span className="font-medium label-text">Address :</span>
                    </label>
                    <input
                      className="p-2 bg-transparent border rounded-lg outline-none border-cl-black"
                      type="text"
                      required
                      placeholder="Address"
                      name="address"
                      value={profile?.address?.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-control">
                    <label className=" label">
                      <span className="font-medium label-text">State :</span>
                    </label>
                    <input
                      className="p-2 bg-transparent border rounded-lg outline-none border-cl-black"
                      type="text"
                      required
                      placeholder="State"
                      name="state"
                      value={profile?.address?.state}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-control">
                    <label className=" label">
                      <span className="font-medium label-text">Country :</span>
                    </label>
                    <input
                      className="p-2 bg-transparent border rounded-lg outline-none border-cl-black"
                      type="text"
                      required
                      placeholder="Country"
                      name="country"
                      value={profile?.address?.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <button type="submit" className="w-full my-3 btnPrimary">
                  Submit
                </button>
              </form>
            </div>
          </>
        )}

        {/* shooping history */}
        {/* <div className="mt-4">
          <div
            className="p-3 font-medium cursor-pointer bg-[#cdcdcd] rounded-xl flex items-center justify-between"
            onClick={() => setOpen(!open)}
          >
            <p>Your shopping history with us</p>
            <BsArrowDownCircle
              className={`  duration-700 ${open && "rotate-180 text-cl-acn"}`}
            />
          </div>
          <div
            className={` shadow-xl mx-4 my-2 p-2 duration-500 rounded-xl ${
              open ? "h-fit" : "hidden"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="table text-l">
                {/* head *
                <thead>
                  <tr className="text-xl text-black">
                    <th>Item Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                {productsCount > 0 ? (
                  <>
                    {cart.items.map((productHistory, index) => (
                      <ProfileChart
                        key={index}
                        id={productHistory.id}
                        quantity={productHistory.quantity}
                      />
                    ))}
                    <tfoot>
                      <tr className="text-xl text-black ">
                        <th></th>
                        <th>Total Price :</th>
                        <th></th>
                        <th className="text-2xl text-cl-acn">
                          <span className="text-lg text-black">$</span>{" "}
                          {cart.getTotalCost().toFixed(2)}
                        </th>
                      </tr>
                    </tfoot>
                  </>
                ) : (
                  <tbody className="mt-2 text-3xl font-normal text-center capitalize text-rose-500">
                    There are no items
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export const Username = () => {
  const { user } = useSelector((state) => state.auth);
  const username = user?.name || "...";

  return (
    <span className="pr-2 font-semibold capitalize border-r-2 border-r-cl-black text-cl-acn">
      {shortenText(username, 9)}
    </span>
  );
};

export const Userphoto = () => {
  const { user } = useSelector((state) => state.auth);
  // const userphoto = user?.photo || <FaUserCircle />;

  return (
    <img
      src={user?.photo}
      alt="profile"
      className="object-cover w-full h-full rounded-full"
    />
  );
};

export default Profile;
