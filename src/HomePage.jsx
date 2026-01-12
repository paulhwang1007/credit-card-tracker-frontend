import React from "react";
import CreditCardList from "./CreditCardList";

const HomePage = () => {
  return (
    <div className="content-area">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-text-muted mt-1">Manage your cards and benefits</p>
        </div>
        {/* Optional: Add button here if desired, but it's in the sidebar/grid too */}
      </div>

      <CreditCardList />
    </div>
  );
};

export default HomePage;
