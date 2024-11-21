import React, { useState, MouseEvent, useEffect } from "react";
import Star from "./Star";
import { profileStyle } from "./profile.style";
import { css } from "styled-system/css";

interface StarRatingProps {
  unit?: "full" | "half" | "float";
  size?: number;
  count?: number;
  innerRadius?: number;
  outerRadius?: number;
  activeColor?: string;
  hoverColor?: string;
  emptyColor?: string;
  roundedCorner?: boolean;
  handleOnClick?: (rating: number) => void;
  isReadOnly?: boolean;
  initialRating?: number;
  containerClassName?: string;
  starClassName?: string;
}

const DEFAULT_ACTIVE_COLOR = "#ffd055";
const starUnitMap = {
  full: 100,
  half: 50,
  float: 10,
};
const StarRating: React.FC<StarRatingProps> = ({
  size = 30,
  count = 5,
  innerRadius = 25,
  outerRadius = 50,
  activeColor = DEFAULT_ACTIVE_COLOR,
  roundedCorner = true,
  handleOnClick,
  isReadOnly = false,
  initialRating = 0,
  starClassName,
  containerClassName,
  emptyColor = "#ddd",
  unit = "full",
}) => {
  const [selectedValue, setSelectedValue] = useState(2.5);
  const unitValue = starUnitMap[unit];
  useEffect(() => {
    if (initialRating !== 0) {
      setSelectedValue(initialRating);
    }
  }, [initialRating]);


  const getSelectedOffsetPercent = (starIndex: number) => {
    const roundedSelectedValue = Math.floor(selectedValue);
    if (starIndex < roundedSelectedValue) {
      return 100;
    } else if (starIndex > roundedSelectedValue) {
      return 0;
    } else {
      const currentStarOffsetPercentage = (selectedValue % 1) * 100;
      return Math.ceil(currentStarOffsetPercentage / unitValue) * unitValue;
    }
  };
  const slotsStyles = profileStyle.raw()

  return (
    <span className={css(slotsStyles.starsContainer)}>
      {Array.from({ length: count }, (v, i) => {
        return (
          <Star
            key={i}
            index={i}
            size={size}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            filledColor={activeColor}
            emptyColor={emptyColor}
            strokeLinejoin={roundedCorner ? "round" : "miter"}
            strokeLinecap={roundedCorner ? "round" : "butt"}
            className={starClassName}
            isReadOnly={isReadOnly}
            offset={getSelectedOffsetPercent(i)}
          />
        );
      })}
    </span>
  );
};

export default StarRating;