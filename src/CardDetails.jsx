import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

const CardDetails = ({ cardOne, cardTwo }) => {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-surface overflow-hidden shadow-lg">
      <Table>
        <TableBody className="text-sm text-text-main">
          {/* Card Name Header Row (Custom) */}
          <TableRow className="bg-slate-900/50 border-slate-700/50">
            <TableCell className="font-semibold text-text-muted w-1/4">Metric</TableCell>
            <TableCell className="font-bold text-primary text-lg w-[37.5%]">{cardOne.name}</TableCell>
            <TableCell className="font-bold text-secondary text-lg w-[37.5%]">{cardTwo.name}</TableCell>
          </TableRow>

          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
            <TableCell className="font-medium text-text-muted">Bank</TableCell>
            <TableCell>{cardOne.bank}</TableCell>
            <TableCell>{cardTwo.bank}</TableCell>
          </TableRow>
          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
            <TableCell className="font-medium text-text-muted">Annual Fee</TableCell>
            <TableCell className={cardOne.annual_fee === 0 ? "text-green-400" : ""}>${cardOne.annual_fee}</TableCell>
            <TableCell className={cardTwo.annual_fee === 0 ? "text-green-400" : ""}>${cardTwo.annual_fee}</TableCell>
          </TableRow>
          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
            <TableCell className="font-medium text-text-muted">Opening Date</TableCell>
            <TableCell>{cardOne.opening_date}</TableCell>
            <TableCell>{cardTwo.opening_date}</TableCell>
          </TableRow>
          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
            <TableCell className="font-medium text-text-muted">Account Age</TableCell>
            <TableCell>
              {cardOne.age_years} years, {cardOne.age_months} months
            </TableCell>
            <TableCell>
              {cardTwo.age_years} years, {cardTwo.age_months} months
            </TableCell>
          </TableRow>
          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
            <TableCell className="font-medium text-text-muted align-top py-4">Welcome Bonus</TableCell>
            <TableCell className="align-top py-4 leading-relaxed opacity-90">{cardOne.welcome_bonus}</TableCell>
            <TableCell className="align-top py-4 leading-relaxed opacity-90">{cardTwo.welcome_bonus}</TableCell>
          </TableRow>

          {/* Multipliers - Merged List Strategy for comparison or Side by Side? 
              The original code rendered row-by-row matching index. This is brittle but I'll keep it for now.
          */}
          {(() => {
            const maxLength = Math.max(
              cardOne.multipliers.length,
              cardTwo.multipliers.length
            );
            return Array.from({ length: maxLength }).map((_, index) => (
              <TableRow key={index} className="border-slate-700/50 hover:bg-slate-800/50">
                {index === 0 && (
                  <TableCell rowSpan={maxLength} className="font-medium text-text-muted align-top py-4 border-r border-slate-700/50">
                    Multipliers & Benefits
                  </TableCell>
                )}
                <TableCell className="py-2 border-r border-slate-700/50 relative">
                     {cardOne.multipliers[index] && (
                         <div className="flex items-start gap-2">
                             <span className="text-primary">•</span>
                             <span>{cardOne.multipliers[index]}</span>
                         </div>
                     )}
                </TableCell>
                <TableCell className="py-2">
                     {cardTwo.multipliers[index] && (
                         <div className="flex items-start gap-2">
                             <span className="text-secondary">•</span>
                             <span>{cardTwo.multipliers[index]}</span>
                         </div>
                     )}
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </div>
  );
};

export default CardDetails;
