import { Header } from "@/components/Header";
import { Home } from "@/screens/Home";
import { Login } from "@/screens/Login";
import { NewRequest } from "@/screens/NewRequest";
import { Register } from "@/screens/Register";
import { Request } from "@/screens/Request";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Root } from "@/components/Root";
import { Profile } from "@/screens/Profile";
import { Dashboard } from "@/screens/Secretary/Dashboard";
import { SecretaryRoute } from "./components/SecretaryRoute";
import { SecretaryLogin } from "@/screens/Secretary/SecretaryLogin";
import { SecretaryProvider } from "@/contexts/SecretaryContext";
import { SideHeader } from "@/components/SideHeader";
import { Home as SecretaryHome } from "@/screens/Secretary/Home";
import { Secretaries } from "@/screens/Secretary/Secretaries";
import { Request as SecretaryRequest } from "@/screens/Secretary/Request";

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
                     {
                        path: "/perfil",
                        element: <Profile />,
                     },
                  ],
               },
            ],
         },
         {
            path: "/secretario/login",
            element: (
               <SecretaryProvider>
                  <SecretaryLogin />
               </SecretaryProvider>
            ),
         },
         {
            path: "/secretario",
            element: <SecretaryRoute />,
            children: [
               {
                  path: "/secretario",
                  element: <SideHeader />,
                  children: [
                     {
                        path: "/secretario/home",
                        element: <SecretaryHome />,
                     },
                     {
                        path: "/secretario/dashboard",
                        element: <Dashboard />,
                     },
                     {
                        path: "/secretario/secretarios",
                        element: <Secretaries />,
                     },
                     {
                        path: "/secretario/solicitacao/:id",
                        element: <SecretaryRequest />,
                     },
                  ],
               },
            ],
         },
      ],
   },
]);
