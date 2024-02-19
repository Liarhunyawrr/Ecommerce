import React from "react";
import { FaRegStar, FaStar, FaRegStarHalfStroke } from "react-icons/fa6";

const Rating = ({ ratingg }) => {
  const generateRatingStars = (rating) => {
    const maxRating = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i}>
          {" "}
          <FaStar />
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half-star">
          <FaRegStarHalfStroke />
        </span>
      );
    }

    const remainingStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-star-${i}`}>
          {" "}
          <FaRegStar />
        </span>
      );
    }

    return stars;
  };

 
  const rating = ratingg;
  const ratingStars = generateRatingStars(rating);
  return (
    <>
      <div className=" text-sm flex   ">
        {ratingStars} 
        
      </div>
    </>
  );
};

export default Rating;
