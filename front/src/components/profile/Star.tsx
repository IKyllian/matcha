import React, { useEffect, useState } from "react";
import { uniqueId } from "lodash";

interface StarProps {
  size: number;
  filledColor: string;
  emptyColor: string;
  innerRadius: number;
  outerRadius: number;
  strokeLinejoin: "miter" | "round";
  strokeLinecap: "butt" | "round";
  isReadOnly: boolean;
  offset: number;
}

const NUM_POINT = 5;
const Star: React.FC<StarProps> = ({
  size,
  filledColor,
  emptyColor,
  innerRadius,
  outerRadius,
  strokeLinejoin,
  strokeLinecap,
  isReadOnly,
  offset,
}) => {
  const [id, setId] = useState<string>("");
  useEffect(() => {
    setId(uniqueId());
  }, []);

  const center = Math.max(innerRadius, outerRadius);
  const angle = Math.PI / NUM_POINT;
  const points = [];

  for (let i = 0; i < NUM_POINT * 2; i++) {
    let radius = i % 2 === 0 ? outerRadius : innerRadius;
    points.push(center + radius * Math.sin(i * angle));
    points.push(center - radius * Math.cos(i * angle));
  }

  const getStarStyle = () => {
    if (isReadOnly) {
      return {
        cursor: "default",
      };
    }
  };
  return (
    <svg
      style={{
        transition: "transform 0.1s ease-out",
        cursor: "pointer",
        ...getStarStyle(),
      }}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 100 100`}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="100%" y1="0" y2="0">
          <stop offset={`0%`} stopColor={filledColor} />
          <stop offset={`${offset}%`} stopColor={filledColor} />
          <stop offset={`${offset}%`} stopColor={emptyColor} />
        </linearGradient>
      </defs>
      <path
        d={`M${points.toString()}Z`}
        fill={`url(#${id})`}
        strokeLinejoin={strokeLinejoin}
        strokeLinecap={strokeLinecap}
      />
    </svg>
  );
};

export default Star;