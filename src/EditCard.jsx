import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    <div className="page-container">
      <Sidebar />

      <div className="content-area flex justify-center">
        <div className="w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-8">Edit Card</h2>

            <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-2xl border border-slate-700/50 shadow-xl space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Name</label>
                        <Input name="name" value={card.name} onChange={handleChange} className="input-field" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Bank</label>
                        <Input name="bank" value={card.bank} onChange={handleChange} className="input-field" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                         <label className="text-sm font-medium text-text-muted">Annual Fee</label>
                        <Input
                        type="number"
                        name="annual_fee"
                        value={card.annual_fee}
                        onChange={handleChange}
                        className="input-field"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Opening Date</label>
                        <Input
                        type="date"
                        name="opening_date"
                        value={card.opening_date}
                        onChange={handleChange}
                        className="input-field block w-full"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Welcome Bonus</label>
                    <Textarea
                    name="welcome_bonus"
                    value={card.welcome_bonus}
                    onChange={handleChange}
                    className="bg-background border-slate-700 min-h-[80px]"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Multipliers</label>
                    <p className="text-xs text-slate-500">Comma separated</p>
                    <Textarea
                    value={multiplierInput}
                    onChange={(e) => setMultiplierInput(e.target.value)}
                    className="bg-background border-slate-700 min-h-[80px]"
                    />
                </div>

                <div className="pt-4 flex justify-end gap-4">
                    <button 
                        type="button" 
                        onClick={() => navigate(`/${id}`)}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary px-8">
                        Update Card
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
