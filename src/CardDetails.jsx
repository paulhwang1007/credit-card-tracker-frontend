import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CardDetails = ({ cardOne, cardTwo }) => {
  return (
    <div class="flex flex-col mt-8">
      <Table>
        <TableBody class="text-sm">
          <TableRow>
            <TableCell class="table-header">Card</TableCell>
            <TableCell>{cardOne.name}</TableCell>
            <TableCell>{cardTwo.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="table-header">Bank</TableCell>
            <TableCell>{cardOne.bank}</TableCell>
            <TableCell>{cardTwo.bank}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="table-header">Annual Fee</TableCell>
            <TableCell>{cardOne.annual_fee}</TableCell>
            <TableCell>{cardTwo.annual_fee}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="table-header">Opening Date</TableCell>
            <TableCell>{cardOne.opening_date}</TableCell>
            <TableCell>{cardTwo.opening_date}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="table-header">Account Age</TableCell>
            <TableCell>
              {cardOne.age_years} years, {cardOne.age_months} months
            </TableCell>
            <TableCell>
              {cardTwo.age_years} years, {cardTwo.age_months} months
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="table-header">Welcome Bonus</TableCell>
            <TableCell>{cardOne.welcome_bonus}</TableCell>
            <TableCell>{cardTwo.welcome_bonus}</TableCell>
          </TableRow>

          {(() => {
            const maxLength = Math.max(
              cardOne.multipliers.length,
              cardTwo.multipliers.length
            );
            return Array.from({ length: maxLength }).map((_, index) => (
              <TableRow key={index}>
                {index === 0 && (
                  <TableCell rowSpan={maxLength} class="table-header">
                    Multipliers
                  </TableCell>
                )}
                <TableCell>{cardOne.multipliers[index] ?? ""}</TableCell>
                <TableCell>{cardTwo.multipliers[index] ?? ""}</TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </div>
  );
};

export default CardDetails;
