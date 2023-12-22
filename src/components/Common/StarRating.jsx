import React from "react";
import { HStack, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const StarRating = ({ rating, onRatingChange }) => {
  const maxStars = 5;

  const handleStarClick = (selectedRating) => {
    onRatingChange(selectedRating);
  };

  return (
    <HStack spacing={1}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;

        return (
          <Icon
            key={index}
            as={StarIcon}
            w={5}
            h={5}
            color={isFilled ? " #FFD700" : "gray.300"}
            cursor="pointer"
            onClick={() => handleStarClick(starValue)}
          />
        );
      })}
    </HStack>
  );
};

export default StarRating;
