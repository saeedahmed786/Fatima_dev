import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, numberOfStars }) => (
  <>
    <StarRating
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="gold"
      starEmptyColor="gray"
    />
    <br />
  </>
);

export default Star;