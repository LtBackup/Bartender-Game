import React from "react";

const DrinkCard = ({ children }) => (
  <div style={{ height: 300, clear: "both" }} className="DrinkCard">
    {children}
  </div>
);

export default DrinkCard;