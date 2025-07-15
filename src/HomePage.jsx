import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div class="flex flex-1 flex-col justify-center items-center gap-4">
      <h1 class="text-5xl text-primary">Keep Track of Your Credit Cards</h1>
      <h2 class="text-xl text-custom-white">
        Create, Read, Update, and Delete Credit Cards in your Wallet
      </h2>
      <div class="flex gap-4 mt-2">
        <Link to={"/add"}>
          <button class="primary-button">Add Card</button>
        </Link>
        <Link to={"/compare"}>
          <button class="primary-button">Compare Cards</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
