import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import { Trash2, Edit, CreditCard as CardIcon } from "lucide-react";

const CreditCardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/credit_card")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cards: " + err);
        setLoading(false);
      });
  }, []);

  // Delete Method
  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:8080/api/v1/credit_card/${pendingDeleteId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setCards((prev) =>
            prev.filter((card) => card.id !== pendingDeleteId)
          );
        } else {
          console.error("Failed to delete");
        }
      })
      .catch((err) => console.error("Error deleting card: ", err))
      .finally(() => {
        setConfirmOpen(false);
        setPendingDeleteId(null);
      });
  };

  const getGradient = (id) => {
    const gradients = [
      "from-slate-700 to-slate-900",
      "from-blue-900 to-slate-900",
      "from-indigo-900 to-slate-900",
      "from-teal-900 to-slate-900",
      "from-rose-900 to-slate-900",
      "from-violet-900 to-slate-900",
    ];
    return gradients[id % gradients.length];
  };

  if (loading) return (
    <div className="flex items-center justify-center p-12">
        <div className="animate-pulse text-primary font-medium">Loading Wallet...</div>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="relative group perspective-1000">
             {/* Card Visual */}
            <Link to={`/${card.id}`}>
                <div className={`h-56 w-full rounded-2xl bg-gradient-to-br ${getGradient(card.id)} border border-slate-600/50 p-6 flex flex-col justify-between shadow-xl transition-transform transform group-hover:-translate-y-2 group-hover:shadow-2xl relative overflow-hidden`}>
                    {/* Decorative Shine */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                    
                    {/* Top Row: Chip & Bank */}
                    <div className="flex justify-between items-start z-10">
                        <div className="w-12 h-9 bg-gradient-to-tr from-yellow-200 to-yellow-500 rounded-md border border-yellow-600/50 opacity-80"></div>
                        <span className="text-sm font-semibold tracking-wider uppercase text-slate-300">{card.bank}</span>
                    </div>

                    {/* Middle: Number (Masked) */}
                    <div className="my-4 z-10">
                        <div className="flex gap-4 text-xl tracking-widest text-slate-400 font-mono opacity-60">
                            <span>••••</span>
                            <span>••••</span>
                            <span>••••</span>
                            <span>{card.id.toString().padStart(4, '0')}</span> {/* Using ID as fake last 4 */}
                        </div>
                    </div>

                    {/* Bottom: Name & Logo */}
                    <div className="flex justify-between items-end z-10">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">Card Holder</span>
                            <span className="font-medium tracking-wide text-white truncate max-w-[180px]">{card.name}</span>
                        </div>
                        <div className="opacity-80">
                             <CardIcon size={32} className="text-white/80" />
                        </div>
                    </div>
                </div>
            </Link>

            {/* Quick Actions (Hover) */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button 
                    onClick={(e) => { e.preventDefault(); requestDelete(card.id); }}
                    className="p-2 rounded-full bg-slate-900/80 text-red-400 hover:bg-red-500 hover:text-white transition-colors backdrop-blur-sm"
                    title="Delete Card"
                >
                    <Trash2 size={16} />
                </button>
            </div>
          </div>
        ))}

        {/* Add New Card Placeholder */}
        <Link to="/add" className="h-56 w-full rounded-2xl border-2 border-dashed border-slate-700 hover:border-primary/50 flex flex-col items-center justify-center gap-4 group transition-colors cursor-pointer bg-slate-800/20 hover:bg-slate-800/40">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <CardIcon className="text-slate-500 group-hover:text-primary transition-colors" size={32} />
            </div>
            <span className="font-medium text-slate-500 group-hover:text-primary transition-colors">Add New Card</span>
        </Link>
      </div>

      <ConfirmDelete
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default CreditCardList;
