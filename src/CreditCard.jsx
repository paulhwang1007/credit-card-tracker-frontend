import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CreditCard = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/credit_card/${id}`)
      .then((response) => response.json())
      .then((data) => setCard(data))
      .catch((error) => console.error("Error fetching card info: " + error));
  }, [id]);

  if (!card) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Card Name: {card.name}</h2>
      <h2>Bank: {card.bank}</h2>
      <h2>Annual Fee: ${card.annual_fee}</h2>
      <h2>Opening Date: {card.opening_date}</h2>
      <h2>
        Account Age: {card.age_years} years, {card.age_months} months
      </h2>
      <h2>Welcome Bonus: </h2>
      <h3>{card.welcome_bonus}</h3>

      <h2>Multipliers: </h2>
      <ul>
        {card.multipliers.map((multiplier, idx) => (
          <li key={idx}>{multiplier}</li>
        ))}
      </ul>

      <Link to={`/${id}/edit`}>
        <h2>Edit Card</h2>
      </Link>
    </div>
  );
};

export default CreditCard;
