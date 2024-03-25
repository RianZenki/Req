import { Header } from "@/components/Header";
import { Home } from "@/screens/Home";
import { Login } from "@/screens/Login";
import { NewRequest } from "@/screens/NewRequest";
import { Register } from "@/screens/Register";
import { Request } from "@/screens/Request";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Root } from "@/components/Root";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Root />,
      children: [
         {
            path: "/",
            element: <Login />,
         },
         {
            path: "/cadastro",
            element: <Register />,
         },
         {
            element: <ProtectedRoute />,
            children: [
               {
                  element: <Header />,
                  children: [
                     {
                        path: "/home",
                        element: <Home />,
                     },
                     {
                        path: "/nova-solicitacao",
                        element: <NewRequest />,
                     },
                     {
                        path: "/solicitacao/:id",
                        element: <Request />,
                     },
                  ],
               },
            ],
         },
      ],
   },
]);
