import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardDetails from "./CardDetails";
import LeftMenu from "./LeftMenu";

const Compare = () => {
  const [cards, setCards] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/credit_card")
      .then((res) => res.json())
      .then(setCards)
      .catch((err) => {
        console.error("Error fetching cards: " + err);
      });
  }, []);

  return (
    <div class="flex bg-custom-black text-custom-white font-sans-serif">
      <LeftMenu />

      {/* Link to Home Page */}
      <Link to={"/"}>
        <h2>Home</h2>
      </Link>

      {/* Title */}
      <h2>Compare Credit Cards</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        {/* First Card */}
        <div>
          <h3>Card One</h3>
          <select
            onChange={(e) => {
              const id = e.target.value;
              const card = cards.find((c) => c.id === parseInt(id));
              setCardOne(card);
            }}
          >
            <option value="">Select Card One</option>
            {cards.map((card) => (
              <option key={card.id} value={card.id}>
                {card.name}
              </option>
            ))}
          </select>
        </div>

        {/* Second Card */}
        <div>
          <h3>Card Two</h3>
          <select
            onChange={(e) => {
              const id = e.target.value;
              const card = cards.find((c) => c.id === parseInt(id));
              setCardTwo(card);
            }}
          >
            <option value="">Select Card Two</option>
            {cards.map((card) => (
              <option key={card.id} value={card.id}>
                {card.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {cardOne && cardTwo && (
        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
          <CardDetails title="Card One" card={cardOne} />
          <CardDetails title="Card Two" card={cardTwo} />
        </div>
      )}
    </div>
  );
};

export default Compare;
