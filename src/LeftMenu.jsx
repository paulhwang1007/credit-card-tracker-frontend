import { Link } from "react-router-dom";
import CreditCardList from "./CreditCardList";
import HomeIcon from "@mui/icons-material/Home";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CompareIcon from "@mui/icons-material/Compare";

const LeftMenu = () => {
  return (
    <div class="box-border h-screen w-1/4 px-4 py-4 flex flex-col border-r-1 bg-[#121e28]">
      {/* Home Page */}
      <Link to={"/"}>
        <div class="flex items-center px-2 mx-3 hover:text-primary-hover">
          <HomeIcon />
          <h2 class="menu-item">Home</h2>
        </div>
      </Link>

      {/* Add Page */}
      <Link to={"/add"}>
        <div class="flex items-center px-2 mx-3 hover:text-primary-hover">
          <ControlPointIcon />
          <h2 class="menu-item">Add Card</h2>
        </div>
      </Link>

      {/* Compare Page */}
      <Link to={"/compare"}>
        <div class="flex items-center px-2 mx-3 mb-4 hover:text-primary-hover">
          <CompareIcon />
          <h2 class="menu-item">Compare Cards</h2>
        </div>
      </Link>

      <hr class="my-2 h-0.25 w-9/10 border-t-0 bg-primary self-center" />

      {/* Credit Card List */}
      <CreditCardList />
    </div>
  );
};

export default LeftMenu;
