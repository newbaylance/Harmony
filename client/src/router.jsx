import {
    createBrowserRouter,
  } from "react-router-dom";
import Generate from "./generate";
import Home from "./home";
import Gender from "./gender";
import AddForm from "./addForm";
import Login from "./login";
import Harmony from "./harmony";
import MyHarmony from "./myHarmony";
import EditForm from "./editForm";
import Register from "./register";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
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
      },
      {
        path: "harmony",
        element: <Harmony />,
      },
      {
        path: "my-harmony",
        element: <MyHarmony />,
      },
      {
        path: "edit",
        element: <EditForm />,
      },
  ]}

  ]);

  export default router
