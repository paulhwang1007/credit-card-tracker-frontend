import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-text-main">
      <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
      <p className="text-2xl text-text-muted mb-8">Page Not Found</p>

      <Link to={"/"}>
        <button className="btn btn-primary">Go Back Home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
