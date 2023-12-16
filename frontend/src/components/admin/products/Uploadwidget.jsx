import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";

const UploadWidget = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const addImages = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setImages((prevImages) => prevImages.concat(selectedFilesArray));
    setSelectedImages((prevImages) => prevImages.concat(imagesArray));

    e.target.value = "";
  };

  const removeImage = (image) => {
    const imageIndex = selectedImages.indexOf(image);
    setSelectedImages(selectedImages.filter((img) => img !== image));
    setImages(images.filter((img, index) => index !== imageIndex));
    URL.revokeObjectURL(image);
  };
  // const isUploading = () => {};

  return (
    <div className="border border-black rounded-xl ">
      <label className="m-2 border border-black border-dashed rounded-lg cursor-pointer label">
        <AiOutlineCloudUpload size={35} className=" cursor-none label-text" />
        <br />
        <span className="px-2 text-lg font-medium label-text">
          Click to upload up to 5 images
        </span>
        <input
          className="hidden"
          type="file"
          multiple
          name="images"
          accept="image/png, image/jpeg, image/webp"
          onChange={addImages}
        />
      </label>
      <br />
      {selectedImages.length > 0 &&
        (selectedImages.length > 5 ? (
          <p className="p-2 text-lg font-light text-center">
            You can't upload more than 5 images! <br />
            <span className="font-bold text-red-500">
              Please remove <b>{selectedImages.length - 5}</b> of them
            </span>
          </p>
        ) : (
          <div className="flex items-center w-full px-2 pb-2">
            <button className="w-full btnPrimary">Upload Image</button>
          </div>
        ))}
      {/* view selected images */}
      <div className={selectedImages.length > 0 ? "images" : ""}>
        {selectedImages !== 0 &&
          selectedImages.map((image, index) => {
            return (
              <div
                key={image}
                className="flex flex-col items-center gap-2 pt-2 my-2 hover:border-y bg-cl-sec hover:bg-cl-white hover:border-cl-black"
              >
                <div className="">
                  <img
                    src={image}
                    alt="product-image"
                    width={200}
                    className=""
                  />
                  <div className="flex items-center justify-around py-2">
                    <button
                      className="p-1 btnPrimary "
                      onClick={() => removeImage(image)}
                    >
                      <BsTrash size={25} />
                    </button>
                    <div className="text-xl font-semibold ">{index + 1}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UploadWidget;
