import React from "react";
import { useParams } from "react-router-dom";

const OwnedCards = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Card {id}</h2>
    </div>
  );
};

export default OwnedCards;
