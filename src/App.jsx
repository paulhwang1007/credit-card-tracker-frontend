import { Link } from "react-router-dom";
import "./App.css";
import CreditCardList from "./CreditCardList";

const App = () => {
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

      {/* Credit Card List */}
      <CreditCardList />
    </div>
  );
};

export default App;
