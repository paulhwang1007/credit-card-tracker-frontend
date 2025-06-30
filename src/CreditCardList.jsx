import React, { useEffect, useState } from "react";

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
          <li key={card.id} style={{ marginBottom: "1rem" }}>
            <h3>{card.name}</h3>
            <p>
              <strong>Bank:</strong> {card.bank}
            </p>
            <p>
              <strong>Annual Fee:</strong> ${card.annual_fee}
            </p>
            <p>
              <strong>Opening Date:</strong> {card.opening_date}
            </p>
            <p>
              <strong>Age:</strong> {card.age_years} years, {card.age_months}{" "}
              months
            </p>
            <p>
              <strong>Welcome Bonus:</strong> {card.welcome_bonus}
            </p>
            <p>
              <strong>Multipliers:</strong>
            </p>
            <ul>
              {card.multipliers.map((m, idx) => (
                <li key={idx}>{m}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreditCardList;
