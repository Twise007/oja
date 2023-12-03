import React from "react";

const Card = ({ children, cardClass }) => {
  return <div className={`${cardClass} shadow-2xl`}>{children}</div>;
};

export default Card;
