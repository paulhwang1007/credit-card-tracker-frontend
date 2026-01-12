import React, { useEffect, useState } from "react";
import CardDetails from "./CardDetails";
import Sidebar from "./Sidebar";
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
    <div className="page-container">
      <Sidebar />

      <div className="content-area">
        <h2 className="text-3xl font-bold mb-8">Compare Cards</h2>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Card One Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-muted">Card One</h3>
            <Select
              onValueChange={(id) => {
                const card = cards.find((c) => c.id === parseInt(id));
                setCardOne(card);
              }}
            >
              <SelectTrigger className="w-full bg-surface border-slate-700">
                <SelectValue placeholder="Select a card" />
              </SelectTrigger>
              <SelectContent className="bg-surface border-slate-700 text-text-main">
                {cards.map((card) => (
                  <SelectItem key={card.id} value={card.id.toString()} className="focus:bg-primary/20 focus:text-primary cursor-pointer">
                    {card.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Card Two Selection */}
          <div className="space-y-4 text-right">
            <h3 className="text-xl font-medium text-text-muted">Card Two</h3>
             <div className="flex justify-end">
                <Select
                onValueChange={(id) => {
                    const card = cards.find((c) => c.id === parseInt(id));
                    setCardTwo(card);
                }}
                >
                <SelectTrigger className="w-full bg-surface border-slate-700">
                    <SelectValue placeholder="Select a card" />
                </SelectTrigger>
                <SelectContent className="bg-surface border-slate-700 text-text-main">
                    {cards.map((card) => (
                    <SelectItem key={card.id} value={card.id.toString()} className="focus:bg-primary/20 focus:text-primary cursor-pointer">
                        {card.name}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
          </div>
        </div>

        {cardOne && cardTwo ? (
            <div className="mt-8">
               <CardDetails cardOne={cardOne} cardTwo={cardTwo} />
            </div>
        ) : (
             <div className="flex flex-col items-center justify-center p-20 text-text-muted opacity-50 border-2 border-dashed border-slate-700 rounded-2xl">
                 <p className="text-lg">Select two cards to verify benefits</p>
             </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
