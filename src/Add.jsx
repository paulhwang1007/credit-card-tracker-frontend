import React, { useState } from "react";
import { Link } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Add = () => {
  // Logic for Form

  // Define initial values separately so that we can
  // clear the fields after submitting by setting equal to these
  const initialCardFields = {
    name: "",
    bank: "",
    annual_fee: 0,
    opening_date: "",
    multipliers: "",
    welcome_bonus: "",
  };

  const [cardFields, setCardFields] = useState(initialCardFields);

  // Runs in response to changes to a field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardFields((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Runs when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert Multipliers String into Array
    const multipliersArray = cardFields.multipliers
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    // Store other fields with new array to send as body
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
    <div class="flex bg-custom-black text-custom-white font-sans-serif">
      <LeftMenu />

      <div class="body-spacing">
        <h2 class="page-header">Add New Card</h2>

        <form onSubmit={handleSubmit} class="flex flex-col px-24 text-xl">
          <div class="add-card-field">
            <h3>Name: </h3>
            <Input
              type="text"
              name="name"
              value={cardFields.name}
              onChange={handleChange}
              placeholder="Card Name"
              required
            />
          </div>

          <div class="add-card-field">
            <h3>Bank: </h3>
            <Input
              type="text"
              name="bank"
              value={cardFields.bank}
              onChange={handleChange}
              placeholder="Bank"
              required
            />
          </div>

          <div class="add-card-field">
            <h3>Annual Fee: </h3>
            <Input
              type="number"
              name="annual_fee"
              value={cardFields.annual_fee}
              onChange={handleChange}
              required
            />
          </div>

          <div class="add-card-field">
            <h3>Opening Date: </h3>
            <Input
              type="date"
              name="opening_date"
              value={cardFields.opening_date}
              onChange={handleChange}
              required
            />
          </div>

          <div class="add-card-field">
            <div class="w-1/3">
              <h3>Welcome Bonus: </h3>
              <p class="text-sm text-primary my-1">
                What is your offered sign-up bonus, if any?
              </p>
            </div>
            <Textarea
              type="text"
              name="welcome_bonus"
              value={cardFields.welcome_bonus}
              onChange={handleChange}
              placeholder="Welcome Bonus"
              required
            />
          </div>

          <div class="add-card-field">
            <div class="w-1/3">
              <h3>Multipliers/Benefits: </h3>
              <p class="text-sm text-primary my-1">
                Separate each multiplier or benefit with a comma
              </p>
            </div>
            <Textarea
              type="text"
              name="multipliers"
              value={cardFields.multipliers}
              onChange={handleChange}
              placeholder="Multipliers"
              required
            />
          </div>

          <br />
          <button
            type="submit"
            class="self-end px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-custom-black cursor-pointer"
          >
            Add Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
