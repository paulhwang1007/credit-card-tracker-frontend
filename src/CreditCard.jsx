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
import EditCard from "./EditCard";

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

      <div class="flex flex-col body-spacing">
        <div class="flex flex-col justify-center items-center">
          <h2 class="text-3xl font-semibold mb-4">Card: {card.name}</h2>

          <Link to={`/${id}/edit`}>
            <button class="px-2 py-1 bg-primary text-custom-black rounded hover:bg-primary-hover cursor-pointer">
              Edit Card
            </button>
          </Link>
        </div>

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
