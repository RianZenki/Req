import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
   SecretaryProvider,
   useSecretaryContext,
} from "@/contexts/SecretaryContext";

export function SecretaryRoute() {
   const { isLoading } = useSecretaryContext();
   const navigate = useNavigate();

   const storagedToken = localStorage.getItem("token");
   const storagedSecretary = localStorage.getItem("secretary");

   useEffect(() => {
      if (!storagedToken || !storagedSecretary) navigate("/");
   }, [storagedToken, storagedSecretary]);

   return isLoading ? (
      <p>loading...</p>
   ) : (
      <SecretaryProvider>
         <Outlet />
      </SecretaryProvider>
   );
}
