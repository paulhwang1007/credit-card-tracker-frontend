import React from "react";
import { useParams } from "react-router-dom";

const Card = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Card {id}</h2>
    </div>
  );
};

export default Card;
