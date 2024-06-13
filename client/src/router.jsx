import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "./App";
import Generate from "./generate";
import TypeformPage from "./typeform";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/generate",
      element: <Generate />,
    },

  ]);

  export default router
