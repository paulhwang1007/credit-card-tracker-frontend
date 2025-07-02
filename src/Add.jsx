import React, { useState } from "react";

const Add = () => {
  const initialCardFields = {
    name: "",
    bank: "",
    annual_fee: 0,
    opening_date: "",
    multipliers: [],
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
    console.log(cardFields);
    setCardFields(initialCardFields);
  };

  return (
    <div>
      <h2>Add Card</h2>

      <form onSubmit={handleSubmit}>
        <h3>Name: </h3>
        <input
          type="text"
          name="name"
          value={cardFields.name}
          onChange={handleChange}
          placeholder="Card Name"
        />
        <h3>Bank: </h3>
        <input
          type="text"
          name="bank"
          value={cardFields.bank}
          onChange={handleChange}
        />
        <h3>Annual Fee: </h3>
        <input
          type="number"
          name="annual_fee"
          value={cardFields.annual_fee}
          onChange={handleChange}
        />
        <h3>Opening Date: </h3>
        <input
          type="date"
          name="opening_date"
          value={cardFields.opening_date}
          onChange={handleChange}
        />
        <h3>Welcome Bonus: </h3>
        <input
          type="text"
          name="welcome_bonus"
          value={cardFields.welcome_bonus}
          onChange={handleChange}
        />
        <h3>Multipliers: </h3>
        <input
          type="text"
          name="multipliers"
          value={cardFields.multipliers}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default Add;
