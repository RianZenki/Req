import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { toast } from "react-toastify";

interface IStudant {
   email: string;
   nome: string;
   id: number;
}

interface IAuthContext {
   isAuthenticated: boolean;
   loading: boolean;
   studant: IStudant | undefined;
   handleLogin: (
      { email, password }: { email: string; password: string },
      setLoading: (state: boolean) => void
   ) => void;
   handleLogout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
   const navigate = useNavigate();

   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [studant, setStudant] = useState<IStudant | undefined>();
   const [loading, setIsLoading] = useState(true);

   useEffect(() => {
      function recuperarDadosArmazenados() {
         const storagedStudant = localStorage.getItem("studant");
         const storagedToken = localStorage.getItem("token");

         if (storagedStudant && storagedToken) {
            api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;

            setStudant(JSON.parse(storagedStudant));
            setIsAuthenticated(true);
            setIsLoading(false);
         }
      }

      recuperarDadosArmazenados();
   }, [loading]);

   const handleLogin = (
      { email, password }: { email: string; password: string },
      setLoading: (state: boolean) => void
   ) => {
      setLoading(true);
      api.post("/auth/login", { email, senha: password })
         .then((response: any) => {
            const data = response.data;

            if (data.token && response.status === 200) {
               setStudant(data.dadosAlunoLogin);
               setIsAuthenticated(true);

               api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

               localStorage.setItem(
                  "studant",
                  JSON.stringify(data.dadosAlunoLogin)
               );
               localStorage.setItem("token", data.token);
               setLoading(false);
               setIsLoading(false);
               navigate("/home");
            }
         })
         .catch((error) => {
            const { status, data } = error.response;

            if (status === 401) toast.warning(data.msg || data.error);

            if (status === 400) toast.error(data.msg || data.error);

            setLoading(false);
            return;
         });
   };

   const handleLogout = () => {
      localStorage.clear();
      setStudant(undefined);
      setIsAuthenticated(false);
      navigate("/");
   };

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated,
            studant,
            loading,
            handleLogin,
            handleLogout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
