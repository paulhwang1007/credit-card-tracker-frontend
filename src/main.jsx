import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Add from "./Add.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import OwnedCards from "./OwnedCards.jsx";
import Compare from "./Compare.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/add", element: <Add /> },
  { path: "/compare", element: <Compare /> },
  { path: "*", element: <NotFoundPage /> },
  { path: "/:id", element: <OwnedCards /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
