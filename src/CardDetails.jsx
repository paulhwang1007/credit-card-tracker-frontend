import React from "react";

const CardDetails = ({ title, card }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "50%" }}>
      <h3>
        {title}: {card.name}
      </h3>
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
        <strong>Age:</strong> {card.age_years} years, {card.age_months} months
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
    </div>
  );
};

export default CardDetails;
