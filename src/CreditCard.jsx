import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CreditCard = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/credit_card/${id}`)
      .then((response) => response.json())
      .then((data) => setCard(data))
      .catch((error) => console.error("Error fetching card info: " + error));
  }, [id]);

  if (!card) return <h2>Loading...</h2>;

  return (
    <div class="flex bg-custom-black text-custom-white font-sans-serif">
      <LeftMenu />

      <div class="body-spacing">
        <h2 class="page-header">Card: {card.name}</h2>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell class="table-header">Bank</TableCell>
              <TableCell>{card.bank}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="table-header">Annual Fee</TableCell>
              <TableCell>{card.annual_fee}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="table-header">Opening Date</TableCell>
              <TableCell>{card.opening_date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="table-header">Account Age</TableCell>
              <TableCell>
                {card.age_years} years, {card.age_months} months
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="table-header">Welcome Bonus</TableCell>
              <TableCell>{card.welcome_bonus}</TableCell>
            </TableRow>
            {card.multipliers.map((multiplier, index) => (
              <TableRow key={index}>
                {index === 0 && (
                  <TableCell
                    rowSpan={card.multipliers.length}
                    class="table-header"
                  >
                    Multipliers
                  </TableCell>
                )}
                <TableCell>{multiplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CreditCard;
