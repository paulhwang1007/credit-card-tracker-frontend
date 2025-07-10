import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreditCardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

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
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;

    fetch(`http://localhost:8080/api/v1/credit_card/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setCards((prev) => prev.filter((card) => card.id !== id));
        } else {
          console.error("Failed to delete");
        }
      })
      .catch((err) => console.error("Error deleting card: ", err));
  };

  const toggleDelete = () => {
    setShowDelete((prev) => !prev);
  };

  return (
    <div>
      <h2>My Credit Cards</h2>

      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <Link to={`/${card.id}`}>
              <h2>{card.name}</h2>
            </Link>
            {showDelete && (
              <button onClick={() => handleDelete(card.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>

      <button onClick={toggleDelete}>{showDelete ? "Hide" : "Delete"}</button>
    </div>
  );
};

export default CreditCardList;
