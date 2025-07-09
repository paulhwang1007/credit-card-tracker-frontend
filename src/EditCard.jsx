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

  return (
    <div>
      <h2>Edit Card</h2>
      <form>
        <label>
          Name:
          <input name="name" value={card.name} />
        </label>
        <br />

        <label>
          Bank:
          <input name="bank" value={card.bank} />
        </label>
        <br />
      </form>
    </div>
  );
};

export default EditCard;
