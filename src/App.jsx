import { Link } from "react-router-dom";
import "./App.css";
import CreditCardList from "./CreditCardList";

const App = () => {
  const sampleCards = [
    { id: 1, title: "Discover it" },
    { id: 2, title: "Freedom Unlimited" },
    { id: 3, title: "Bilt Mastercard" },
  ];

  return (
    <div>
      {/* Add Page */}
      <Link to={"/add"}>
        <h2>Add Card</h2>
      </Link>

      {/* Compare Page */}
      <Link to={"/compare"}>
        <h2>Compare Page</h2>
      </Link>

      {/* Credit Cards List */}
      <ul>
        {sampleCards.map((item) => (
          <li key={item.id}>
            <Link to={`/${item.id}`}>
              <h2>{item.title}</h2>
            </Link>
          </li>
        ))}
      </ul>

      {/* Connecting to Backend */}
      <CreditCardList />
    </div>
  );
};

export default App;
