import "./App.css";

const Card = ({ name }) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h2>Arrow Component</h2>

      <Card name="Discover it" />
      <Card name="Freedom Unlimited" />
      <Card name="Bilt Mastercard" />
    </div>
  );
};

export default App;
