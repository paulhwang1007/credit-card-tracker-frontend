import { Link } from "react-router-dom";
import CreditCardList from "./CreditCardList";

const LeftMenu = () => {
  return (
    <div class="box-border border-2 border-blue-400 h-screen w-1/5 flex flex-col">
      <div class="flex flex-col h-full m-4 border-2 border-green-300">
        {/* Add Page */}
        <Link to={"/add"}>
          <h2 class="item-spacing">Add Card</h2>
        </Link>

        {/* Compare Page */}
        <Link to={"/compare"}>
          <h2 class="item-spacing">Compare Page</h2>
        </Link>

        {/* Credit Card List */}
        <CreditCardList />
      </div>
    </div>
  );
};

export default LeftMenu;
