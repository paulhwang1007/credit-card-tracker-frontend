import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardDetails from "./CardDetails";
import LeftMenu from "./LeftMenu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Compare = () => {
  const [cards, setCards] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/credit_card")
      .then((res) => res.json())
      .then(setCards)
      .catch((err) => {
        console.error("Error fetching cards: " + err);
      });
  }, []);

  return (
    <div class="flex bg-custom-black text-custom-white font-sans-serif">
      <LeftMenu />

      {/* Title */}
      <div class="body-spacing">
        <h2 class="page-header">Compare Credit Cards</h2>

        <div class="flex justify-between">
          {/* First Card */}
          <div class="flex flex-col gap-4">
            <h3 class="text-xl font-semibold">Card One</h3>
            <Select
              onValueChange={(id) => {
                const card = cards.find((c) => c.id === parseInt(id));
                setCardOne(card);
              }}
            >
              <SelectTrigger
                onChange={(e) => {
                  const id = e.target.value;
                  const card = cards.find((c) => c.id === parseInt(id));
                  setCardOne(card);
                }}
              >
                <SelectValue placeholder="Choose Card One" />
              </SelectTrigger>
              <SelectContent>
                {cards.map((card) => (
                  <SelectItem key={card.id} value={card.id}>
                    {card.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Second Card */}
          <div class="flex flex-col gap-4 text-end">
            <h3 class="text-xl font-semibold">Card Two</h3>
            <Select
              onValueChange={(id) => {
                const card = cards.find((c) => c.id === parseInt(id));
                setCardTwo(card);
              }}
            >
              <SelectTrigger
                onChange={(e) => {
                  const id = e.target.value;
                  const card = cards.find((c) => c.id === parseInt(id));
                  setCardTwo(card);
                }}
              >
                <SelectValue placeholder="Choose Card Two" />
              </SelectTrigger>
              <SelectContent>
                {cards.map((card) => (
                  <SelectItem key={card.id} value={card.id}>
                    {card.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {cardOne && cardTwo && (
          <div class="flex flex-1 flex-col">
            <CardDetails cardOne={cardOne} cardTwo={cardTwo} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
