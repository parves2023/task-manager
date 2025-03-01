import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/MainLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../components/NotFound";
import ForgotPass from "../components/ForgotPass";
import MyProfile from "../components/Profile/MyProfile";
import UpdateProfile from "../components/Profile/UpdateProfile";
import Mynote from "../components/Note/Mynote";
import Aboutus from "../pages/Aboutus";
import Contact from "../pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Mynote></Mynote></PrivateRoute>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/forgotpass",
        element: <ForgotPass></ForgotPass>,
      },
      {
        path: "/about-us",
        element: <Aboutus></Aboutus>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        ),
      },
      
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default router;
