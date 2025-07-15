import HomePage from "./HomePage";
import "./index.css";
import LeftMenu from "./LeftMenu";

const App = () => {
  return (
    <div class="flex bg-custom-black text-custom-white font-sans-serif">
      <LeftMenu />
      <HomePage />
    </div>
  );
};

export default App;
