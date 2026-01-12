import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Add = () => {
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

    const multipliersArray = cardFields.multipliers
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    const cardInfo = {
      ...cardFields,
      multipliers: multipliersArray,
    };

    fetch("http://localhost:8080/api/v1/credit_card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardInfo),
    }).then(() => {
    //   console.log("New Card Added");
       window.location.href = "/"; // Simple redirect
    });

    setCardFields(initialCardFields);
  };

  return (
    <div className="page-container">
      <Sidebar />

      <div className="content-area flex justify-center">
        <div className="w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-8">Add New Card</h2>
            
            <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-2xl border border-slate-700/50 shadow-xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Card Name</label>
                        <Input
                            type="text"
                            name="name"
                            value={cardFields.name}
                            onChange={handleChange}
                            placeholder="e.g. Sapphire Preferred"
                            required
                            className="input-field"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Bank</label>
                        <Input
                            type="text"
                            name="bank"
                            value={cardFields.bank}
                            onChange={handleChange}
                            placeholder="e.g. Chase"
                            required
                            className="input-field"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Annual Fee ($)</label>
                        <Input
                            type="number"
                            name="annual_fee"
                            value={cardFields.annual_fee}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Opening Date</label>
                        <Input
                            type="date"
                            name="opening_date"
                            value={cardFields.opening_date}
                            onChange={handleChange}
                            required
                            className="input-field block w-full"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Welcome Bonus</label>
                    <p className="text-xs text-slate-500">What is your offered sign-up bonus?</p>
                    <Textarea
                        name="welcome_bonus"
                        value={cardFields.welcome_bonus}
                        onChange={handleChange}
                        placeholder="e.g. 60,000 points after $4k spend"
                        required
                        className="bg-background border-slate-700 min-h-[80px]"
                    />
                </div>

                 <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Multipliers / Benefits</label>
                    <p className="text-xs text-slate-500">Comma separated</p>
                    <Textarea
                        name="multipliers"
                        value={cardFields.multipliers}
                        onChange={handleChange}
                        placeholder="3x Dining, 2x Travel, $50 Hotel Credit"
                        required
                         className="bg-background border-slate-700 min-h-[80px]"
                    />
                </div>

                <div className="pt-4 flex justify-end">
                    <button type="submit" className="btn btn-primary px-8">
                        Add to Wallet
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
