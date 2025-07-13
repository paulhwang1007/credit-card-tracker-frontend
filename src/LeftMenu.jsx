import { Link } from "react-router-dom";
import CreditCardList from "./CreditCardList";

const LeftMenu = () => {
  return (
    <div class="box-border h-screen w-1/4 px-2 py-3 flex flex-col border-r-1">
      {/* Add Page */}
      <Link to={"/add"}>
        <h2 class="menu-item">Add Card</h2>
      </Link>

      {/* Compare Page */}
      <Link to={"/compare"}>
        <h2 class="menu-item">Compare Page</h2>
      </Link>

      <hr class="my-2 h-0.25 w-4/5 border-t-0 bg-primary self-center" />

      {/* Credit Card List */}
      <CreditCardList />
    </div>
  );
};

export default LeftMenu;
