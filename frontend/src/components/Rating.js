import React from "react"

function Rating({ value, text, color }) {
  const number = [1, 2, 3, 4, 5];
  return (
    <div className="rating">
      {number.map(num => (
        <span key={num}>
          <i
            style={{ color }}
            className={
              value >= num
                ? "fas fa-star"
                : value >= (num - 0.5)
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
      ))}
   </div>
  );
}

export default Rating;
