import React from "react";

export default function StarRating({
  rating,
  count,
  size = "md",
}: {
  rating: number;
  count?: number;
  size?: "sm" | "md";
}) {
  const rounded = Math.round(rating);
  return (
    <div className={`star-rating star-rating-${size}`}>
      <span aria-hidden="true">
        {"★".repeat(rounded)}
        {"☆".repeat(5 - rounded)}
      </span>
      <span className="star-rating-text">
        {rating.toFixed(1)}
        {typeof count === "number" ? ` (${count})` : ""}
      </span>
    </div>
  );
}
