import { BsSearch } from "react-icons/bs";

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const Search = ({ value, onChange }) => {
  return (
    <div className="flex items-center justify-center w-[80%] ">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search here..."
        className="w-full p-2 shadow-md outline-none bg-cl-sec"
      />
      <button
        type="submit"
        className="p-2 border-2 rounded-r-lg border-cl-acn bg-cl-acn text-cl-white"
      >
        <BsSearch />
      </button>
    </div>
  );
};

//Cal average product rating
export function calculateAverageRating(ratings) {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return 0;
  }
  var totalStars = 0;
  for (var i = 0; i < ratings.length; i++) {
    var rating = ratings[i];
    if (rating.hasOwnProperty("star")) {
      totalStars += rating.star;
    }
  }
  return totalStars / ratings.length;
}

export const getCartQuantityById = (products, id) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id === id) {
      return products[i].cartQuantity;
    }
  }
  return 0; //if the _id is not found, return 0 or any default value
};
