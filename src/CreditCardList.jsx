import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";

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
      <div class="flex-1 flex flex-col justify-between items-start border-2 border-red-400">
        <ul class="w-full">
          {cards.map((card) => (
            <li
              class="flex justify-between items-center item-spacing"
              key={card.id}
            >
              <Link to={`/${card.id}`}>
                <p class="text-xl">{card.name}</p>
              </Link>

              {/* {showDelete && (
              <button onClick={() => handleDelete(card.id)}>Delete</button>
            )} */}

              <button
                // onClick={() => handleDelete(card.id)}
                onClick={() => requestDelete(card.id)}
                className={`${
                  showDelete
                    ? "visible opacity-100 trash-can"
                    : "invisible opacity-0"
                } transition-opacity duration-200 ml-4`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4.5 h-4.5"
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
        </ul>

        <button class="item-spacing text-xl" onClick={toggleDelete}>
          {showDelete ? "Hide" : "Delete"}
        </button>
      </div>

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
