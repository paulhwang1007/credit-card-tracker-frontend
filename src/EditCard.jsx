import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState({
    name: "",
    bank: "",
    annual_fee: 0,
    opening_date: "",
    welcome_bonus: "",
    multipliers: [],
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/credit_card/${id}`)
      .then((res) => res.json())
      .then((data) => setCard(data))
      .catch((err) => console.error("Failed to load card: ", err));
  }, [id]);

  // Handle Field Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handleChange for Multipliers
  const handleMultipliersChange = (e) => {
    setCard((prev) => ({
      ...prev,
      multipliers: e.target.value.split(",").map((s) => s.trim()),
    }));
  };

  // Submit Updated Data
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/v1/credit_card/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    })
      .then((res) => {
        if (res.ok) {
          navigate(`/${id}`);
        } else {
          console.error("Update Failed");
        }
      })
      .catch((err) => console.error("Error Submitting Form: ", err));
  };

  return (
    <div>
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <h2>Name</h2>
          <input name="name" value={card.name} onChange={handleChange} />
        </label>
        <br />

        <label>
          <h2>Bank</h2>
          <input name="bank" value={card.bank} onChange={handleChange} />
        </label>
        <br />

        <label>
          <h2>Annual Fee</h2>
          <input
            type="number"
            name="annual_fee"
            value={card.annual_fee}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          <h2>Opening Date</h2>
          <input
            type="date"
            name="opening_date"
            value={card.opening_date}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          <h2>Welcome Bonus</h2>
          <input
            name="welcome_bonus"
            value={card.welcome_bonus}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          <h2>Multipliers</h2>
          <input
            value={card.multipliers.join(", ")}
            onChange={handleMultipliersChange}
          />
        </label>
        <br />

        <button type="submit">Update Card</button>
      </form>
    </div>
  );
};

export default EditCard;
