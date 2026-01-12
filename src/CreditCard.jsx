import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Edit } from "lucide-react";

const CreditCard = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/credit_card/${id}`)
      .then((response) => response.json())
      .then((data) => setCard(data))
      .catch((error) => console.error("Error fetching card info: " + error));
  }, [id]);

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

  if (!card) return (
    <div className="flex h-screen items-center justify-center bg-background text-primary">
       Loading...
    </div>
  );

  return (
    <div className="page-container">
      <Sidebar />

      <div className="content-area">
        {/* Header with Back button */}
        <div className="flex items-center gap-4 mb-8">
            <Link to="/" className="p-2 rounded-full hover:bg-surface-hover text-text-muted transition-colors">
                <ArrowLeft size={24} />
            </Link>
            <h2 className="text-3xl font-bold flex-1">{card.name}</h2>
            <Link to={`/${id}/edit`}>
                <button className="btn btn-primary gap-2">
                    <Edit size={16} />
                    Edit Card
                </button>
            </Link>
        </div>

        {/* Card Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Left Column: Visual Representation (Mock) */}
             <div className="col-span-1">
                <div className={`h-56 w-full rounded-2xl bg-gradient-to-br ${getGradient(parseInt(id))} border border-slate-600/50 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden`}>
                     {/* Decorative Shine */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                    <div className="flex justify-between items-start z-10">
                        <div className="w-12 h-9 bg-gradient-to-tr from-yellow-200 to-yellow-500 rounded-md border border-yellow-600/50 opacity-80"></div>
                        <span className="text-sm font-semibold tracking-wider uppercase text-slate-300">{card.bank}</span>
                    </div>
                     <div className="my-4 z-10">
                        <div className="flex gap-4 text-xl tracking-widest text-slate-400 font-mono opacity-60">
                            <span>••••</span><span>••••</span><span>••••</span>
                            <span>{card.id.toString().padStart(4, '0')}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-end z-10">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">Card Holder</span>
                            <span className="font-medium tracking-wide text-white truncate max-w-[180px]">{card.name}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-6 rounded-2xl bg-surface border border-slate-700/50">
                    <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Summary</h3>
                    <div className="flex justify-between py-2 border-b border-slate-700/50">
                        <span className="text-text-muted">Status</span>
                        <span className="text-green-400 font-medium">Active</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-700/50">
                         <span className="text-text-muted">Opened</span>
                         <span>{card.opening_date}</span>
                    </div>
                     <div className="flex justify-between py-2 pt-4">
                         <span className="text-text-muted">Annual Fee</span>
                         <span className="font-medium text-white">${card.annual_fee}</span>
                    </div>
                </div>
             </div>

             {/* Right Column: Detailed Table */}
             <div className="col-span-1 lg:col-span-2">
                 <div className="rounded-2xl border border-slate-700/50 overflow-hidden bg-surface">
                    <Table>
                    <TableBody>
                        <TableRow className="border-slate-700/50 hover:bg-transparent">
                            <TableCell className="font-medium text-text-muted w-1/3">Bank</TableCell>
                            <TableCell>{card.bank}</TableCell>
                        </TableRow>
                        <TableRow className="border-slate-700/50 hover:bg-transparent">
                            <TableCell className="font-medium text-text-muted">Account Age</TableCell>
                            <TableCell>
                                {card.age_years} years, {card.age_months} months
                            </TableCell>
                        </TableRow>
                        <TableRow className="border-slate-700/50 hover:bg-transparent">
                            <TableCell className="font-medium text-text-muted">Welcome Bonus</TableCell>
                            <TableCell className="leading-relaxed">{card.welcome_bonus}</TableCell>
                        </TableRow>
                        <TableRow className="border-slate-700/50 hover:bg-transparent">
                            <TableCell className="font-medium text-text-muted align-top pt-4">Multipliers & Benefits</TableCell>
                            <TableCell className="py-4">
                                <ul className="space-y-2">
                                    {card.multipliers.map((m, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                            <span>{m}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
