import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/globals.css"; 
import App from "./App";
import HomePage from "./pages/Home Page/HomePage";
import ShopPage from "./pages/Shop Page/ShopPage";
import Cart from "./components/shop/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:
    [
      {
        index: true,
        element: <HomePage />,
      },
       {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "cart",
        element: <Cart />
      }
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
