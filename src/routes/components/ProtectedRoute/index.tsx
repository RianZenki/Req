import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export function ProtectedRoute() {
   const { loading } = useAuth();
   const navigate = useNavigate();

   const storagedToken = localStorage.getItem("token");

   useEffect(() => {
      if (!storagedToken) navigate("/")
   }, [storagedToken]);

   return loading ? <p>loading...</p> : <Outlet />;
}
