import { Header } from "@/components/Header";
import { Home } from "@/screens/Home";
import { Login } from "@/screens/Login";
import { Register } from "@/screens/Register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Login />,
   },
   {
      path: "/cadastro",
      element: <Register />,
   },
   {
      element: <Header />,
      children: [
         {
            path: "/home",
            element: <Home />
         }
      ]
   }
]);