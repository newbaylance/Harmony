import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "./addForm";
import Generate from "./generate";
import Home from "./home";
import Gender from "./gender";
import AddForm from "./addForm";
import Login from "./login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "user/:id",
        element: <Gender />,
      },
      {
        path: "addMale/:id",
        element: <AddForm gender={"male"}/>,
      },
      {
        path: "addFemale/:id",
        element: <AddForm gender={"female"}/>,
      },
      {
        path: "my-profile/:id",
        element: <Generate />,
      }
  ]}

  ]);

  export default router
