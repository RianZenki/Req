import { columns } from "@/components/RequestTable/columns";
import { DataTable } from "@/components/RequestTable/data-table";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useEffect, useState } from "react";

export const Home = () => {
   const [requests, setRequests] = useState<any[]>([]);
   const { studant } = useAuth();

   const getRequests = async () => {
      try {
         const response = await api.get(`/aluno/${studant?.id}/solicitacao`);
         setRequests(response.data);
      } catch (error: any) {
         console.log(error.response);
      }
   };

   useEffect(() => {
      getRequests();
   }, []);

   return (
      <div className="w-full max-w-[1600px] px-20 mx-auto mt-10">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-4xl font-bold mb-1">Minhas solicitações</h2>
               <p className="text-muted-foreground">
                  Aqui estão suas solicitações
               </p>
            </div>
         </div>

         <div className="mt-12">
            <div className="w-full">
               <DataTable columns={columns} data={requests} />
            </div>
         </div>
      </div>
   );
};
