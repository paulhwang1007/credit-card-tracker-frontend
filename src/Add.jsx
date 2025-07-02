import React, { useState } from "react";
import { Link } from "react-router-dom";

const Add = () => {
  // Logic for Form
  const initialCardFields = {
    name: "",
    bank: "",
    annual_fee: 0,
    opening_date: "",
    multipliers: "",
    welcome_bonus: "",
  };

  const [cardFields, setCardFields] = useState(initialCardFields);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardFields((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert Multipliers String into Array
    const multipliersArray = cardFields.multipliers
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    const cardInfo = {
      ...cardFields,
      multipliers: multipliersArray,
    };

    console.log(cardInfo);

    fetch("http://localhost:8080/api/v1/credit_card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardInfo),
    }).then(() => {
      console.log("New Card Added");
    });

    setCardFields(initialCardFields);
  };

  return (
    <div>
      <Link to={"/"}>
        <h2>Home</h2>
      </Link>

      <h2>Add Card</h2>

      <form onSubmit={handleSubmit}>
        <h3>Name: </h3>
        <input
          type="text"
          name="name"
          value={cardFields.name}
          onChange={handleChange}
          placeholder="Card Name"
          required
        />
        <h3>Bank: </h3>
        <input
          type="text"
          name="bank"
          value={cardFields.bank}
          onChange={handleChange}
          placeholder="Bank"
          required
        />
        <h3>Annual Fee: </h3>
        <input
          type="number"
          name="annual_fee"
          value={cardFields.annual_fee}
          onChange={handleChange}
          required
        />
        <h3>Opening Date: </h3>
        <input
          type="date"
          name="opening_date"
          value={cardFields.opening_date}
          onChange={handleChange}
          required
        />
        <h3>Welcome Bonus: </h3>
        <input
          type="text"
          name="welcome_bonus"
          value={cardFields.welcome_bonus}
          onChange={handleChange}
          placeholder="Welcome Bonus"
          required
        />
        <h3>Multipliers: </h3>
        <input
          type="text"
          name="multipliers"
          value={cardFields.multipliers}
          onChange={handleChange}
          placeholder="Separate with ,"
          required
        />
        <br />
        <br />
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default Add;
