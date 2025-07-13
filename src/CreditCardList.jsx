import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const CreditCardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
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

  if (loading) return <h2>Loading...</h2>;

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

  const toggleDelete = () => {
    setShowDelete((prev) => !prev);
  };

  return (
    <>
      <ul class="w-full">
        <div class="px-2 py-1 mx-3 my-1">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div class="flex items-center cursor-pointer">
                  <CreditCardIcon />
                  <p class="px-1 mx-2">My Cards</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div class="flex flex-col">
                  {cards.map((card) => (
                    <li
                      class="flex justify-between items-center card-menu"
                      key={card.id}
                    >
                      <Link to={`/${card.id}`}>
                        <p>{card.name}</p>
                      </Link>

                      <button
                        onClick={() => requestDelete(card.id)}
                        className={`${
                          showDelete
                            ? "visible opacity-100 trash-can-icon cursor-pointer"
                            : "invisible opacity-0"
                        } transition-opacity duration-200 ml-4`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 7.5V19.5A1.5 1.5 0 007.5 21h9a1.5 1.5 0 001.5-1.5V7.5m-13.5 0h15m-10.5 0V4.5A1.5 1.5 0 0110.5 3h3a1.5 1.5 0 011.5 1.5V7.5"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}

                  <button
                    class="text-xl menu-item self-end cursor-pointer"
                    onClick={toggleDelete}
                  >
                    {showDelete ? "Hide" : "Delete"}
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ul>

      {/* Custom confirmation dialog */}
      <ConfirmDelete
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default CreditCardList;
