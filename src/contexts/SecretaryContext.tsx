import api from "@/services/api";
import {
   ReactElement,
   createContext,
   useContext,
   useEffect,
   useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ISecretaryContext {
   isAuthenticated: boolean;
   secretaries: any[];
   secretary: any;
   isLoading: boolean;
   updateSecretaries: (secretarie: any) => void;
   handleLogin: (
      { email, password }: { email: string; password: string },
      setLoading: (state: boolean) => void
   ) => void;
   handleLogout: () => void;
}

const SecretaryContext = createContext<ISecretaryContext>(
   {} as ISecretaryContext
);

interface ISecretary {
   id: string;
   numeroMatricula: string;
   nome: string;
   email: string;
   cargo: string;
}

const SecretaryProvider = ({ children }: { children: ReactElement }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [secretaries, setSecretaries] = useState<ISecretary[]>([]);
   const [secretary, setSecretary] = useState<ISecretary>();
   const [isLoading, setIsLoading] = useState(true);

   const navigate = useNavigate();

   useEffect(() => {
      const getStoragedData = () => {
         const storagedSecretary = localStorage.getItem("secretary");
         const storagedToken = localStorage.getItem("token");

         if (storagedSecretary && storagedToken) {
            api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;

            setSecretary(JSON.parse(storagedSecretary));
            setIsAuthenticated(true);
            setIsLoading(false);
         }
      };

      getStoragedData();
   }, [isLoading]);

   useEffect(() => {
      if (!secretary) return;

      const getSecretaries = async () => {
         try {
            const response = await api.get(
               `/secretario/listarSecretarios/${secretary.id}`
            );
            setSecretaries(response.data);
         } catch (error: any) {
            console.log(error.response);
         }
      };

      getSecretaries();
   }, [secretary]);

   const updateSecretaries = (secretaries: ISecretary[]) => {
      setSecretaries(secretaries);
   };

   const handleLogin = async (
      { email, password }: { email: string; password: string },
      setLoading: (state: boolean) => void
   ) => {
      try {
         const response = await api.post("/secretario/login", {
            email,
            senha: password,
         });
         const data = response.data;

         setSecretary(data.secretario);
         setIsAuthenticated(true);

         api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

         localStorage.setItem("secretary", JSON.stringify(data.secretario));

         localStorage.setItem("token", data.token);
         setLoading(false);
         setIsLoading(false);
         navigate("/secretario/home");
      } catch (error: any) {
         toast.error(error.response.data.msg);
      }
   };

   const handleLogout = () => {
      localStorage.clear();
      setSecretary(undefined);
      setIsAuthenticated(false);
      navigate("/secretario/login");
   };

   return (
      <SecretaryContext.Provider
         value={{
            isAuthenticated,
            secretaries,
            secretary,
            updateSecretaries,
            handleLogin,
            isLoading,
            handleLogout,
         }}
      >
         {children}
      </SecretaryContext.Provider>
   );
};

export const useSecretaryContext = () => {
   return useContext(SecretaryContext);
};

export { SecretaryContext, SecretaryProvider };
