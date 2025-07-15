import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EditCard = () => {
  const [multiplierInput, setMultiplierInput] = useState("");
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
      .then((data) => {
        setCard(data);
        setMultiplierInput(data.multipliers.join(", "));
      })
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

  // Submit Updated Data
  const handleSubmit = (e) => {
    e.preventDefault();

    const cardToSubmit = {
      ...card,
      multipliers: multiplierInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    };

    fetch(`http://localhost:8080/api/v1/credit_card/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardToSubmit),
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
    <div class="flex bg-custom-black text-custom-white font-sans-serif">
      <LeftMenu />

      <div class="body-spacing">
        <h2 class="page-header">Edit Card</h2>

        <form onSubmit={handleSubmit} class="flex flex-col px-24 text-xl">
          <label class="add-card-field">
            <h2>Name</h2>
            <Input name="name" value={card.name} onChange={handleChange} />
          </label>
          <br />

          <label class="add-card-field">
            <h2>Bank</h2>
            <Input name="bank" value={card.bank} onChange={handleChange} />
          </label>
          <br />

          <label class="add-card-field">
            <h2>Annual Fee</h2>
            <Input
              type="number"
              name="annual_fee"
              value={card.annual_fee}
              onChange={handleChange}
            />
          </label>
          <br />

          <label class="add-card-field">
            <h2>Opening Date</h2>
            <Input
              type="date"
              name="opening_date"
              value={card.opening_date}
              onChange={handleChange}
            />
          </label>
          <br />

          <label class="add-card-field">
            <h2>Welcome Bonus</h2>
            <Textarea
              name="welcome_bonus"
              value={card.welcome_bonus}
              onChange={handleChange}
            />
          </label>
          <br />

          <label class="add-card-field">
            <h2>Multipliers</h2>
            <Textarea
              value={multiplierInput}
              onChange={(e) => setMultiplierInput(e.target.value)}
            />
          </label>
          <br />

          <button type="submit" class="primary-button self-end">
            Update Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCard;
