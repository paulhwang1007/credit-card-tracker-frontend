import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreditCardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/credit_card")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cards: " + err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>My Credit Cards</h2>

      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <Link to={`/${card.id}`}>
              <h2>{card.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreditCardList;
