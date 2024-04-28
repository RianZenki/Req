import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export function ProtectedRoute() {
   const { loading } = useAuth();
   const navigate = useNavigate();

   const storagedToken = localStorage.getItem("token");
   const storagedStudant = localStorage.getItem("studant");

   useEffect(() => {
      if (!storagedToken || !storagedStudant) navigate("/");
   }, [storagedToken, storagedStudant]);

   return loading ? <p>loading...</p> : <Outlet />;
}
