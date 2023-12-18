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
        className="w-full p-2 border-b outline-none bg-cl-sec"
      />
      <button type="submit" className="p-2 rounded-l-none btnPrimary border-1">
        <BsSearch />
      </button>
    </div>
  );
};
