import React from "react";
import { BsTrash } from "react-icons/bs";
import { FaCloudUploadAlt } from "react-icons/fa";

const Uploadwidget = () => {
  const addImages = () => {};
  const imagePreview = () => {};
  const isUploading  = () => {};
  return (
    <>
      <div
        onClick={() => document.querySelector(".image-field").click()}
        className="flex flex-col items-center justify-center w-64 h-64 border-2 border-white border-dashed rounded-full cursor-pointer hero hover:text-active hover:border-active"
      >
        <input
          id="image"
          type="file"
          accept=".jpeg, .png, .jpg .web"
          //   onChange={(e) => handleImageChange(e)}
          required
          className="hidden image-field"
          multiple
          onChange={addImages}
        />
        {imagePreview != null ? (
          <img
            src={imagePreview}
            className="object-cover w-full h-full p-1 rounded-full"
          />
        ) : (
          <div className="flex flex-col items-center w-40 text-center">
            <FaCloudUploadAlt className="w-20 h-20" />
            <div className="">
              {isUploading ? (
                <div>
                  Uploading
                  <span className="loading loading-dots loading-md"></span>
                </div>
              ) : (
                <p>Upload image ( jpeg, svg, png)</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="">
        <div className="border border-black border-dashed">
          <div className="w-full h-48 p-2">
            <label className=" label">
              <FaCloudUploadAlt size={35} />
              <br />
              <span className="font-medium label-text">
                Click to upload up to 5 image
              </span>
              <input
                className="p-2 bg-transparent border rounded-lg outline-none border-cl-black"
                type="file"
                multiple
                accept="image/png, image/jpeg, image/webp"
                onChange={addImages}
              />
            </label>
            <br />
          </div>
        </div>

        {/* {imagePreview !== null && (
          <button
            className="flex items-center justify-between gap-2 btnPrimary"
            onClick={savePhoto}
          >
            <FaCloudUploadAlt size={18} /> <p>Upload Photo</p>
          </button>
        )} */}
      </div>
      <img
        //   src={imagePreview === null ? user?.photo : imagePreview}
        alt="profile"
        className="object-cover w-full h-full "
      />
      <div className="form-control">
        <label className=" label">
          <span className="font-medium label-text">Image :</span>

          <div></div>
        </label>
        <input
          className="p-2 bg-transparent border rounded-lg outline-none border-cl-black"
          type="file"
          accept="image/*"
          //   onChange={handleImageChange}
        />
      </div>
    </>
  );
};

export default Uploadwidget;
