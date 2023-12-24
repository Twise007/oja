import React from "react";
import StarRatings from "react-star-ratings";

const Ratings = ({ averageRating, noOfRating }) => {
  return (
    <>
      {averageRating > 0 && (
        <>
          <StarRatings
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="#f6b01e"
            rating={averageRating}
            editing={false}
          />
          ({noOfRating})
        </>
      )}
    </>
  );
};

export default Ratings;
