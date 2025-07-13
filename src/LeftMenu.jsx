import { Link } from "react-router-dom";
import CreditCardList from "./CreditCardList";

const LeftMenu = () => {
  return (
    <div class="box-border h-screen w-1/4 flex flex-col">
      <div class="flex flex-col h-full m-5 py-2 px-1 rounded-xl border-2 border-primary">
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
    </div>
  );
};

export default LeftMenu;
