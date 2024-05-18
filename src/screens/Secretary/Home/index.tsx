import { columns } from "@/components/SecretaryRequestTable/columns";
import { DataTable } from "@/components/SecretaryRequestTable/data-table";
import { useSecretaryContext } from "@/contexts/SecretaryContext";
import api from "@/services/api";
import { useEffect, useState } from "react";

export const Home = () => {
   const [requests, setRequests] = useState<any[]>([]);
   const { secretary } = useSecretaryContext();

   const getSecretaryRequests = async () => {
      try {
         if (!secretary?.id) return;
         const response = await api.get(
            `/secretario/${secretary?.id}/solicitacoes`
         );
         setRequests(response.data);
      } catch (error: any) {
         console.log(error.response);
      }
   };

   useEffect(() => {
      getSecretaryRequests();
   }, [secretary?.id]);

   return (
      <div className="w-full max-w-[1600px] px-20 mx-auto mt-8">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-4xl font-bold mb-1">Solicitações</h2>
               <p className="text-muted-foreground">
                  Lista com as solicitações feitas pelos alunos
               </p>
            </div>
         </div>

         <div className="w-full py-10">
            {<DataTable columns={columns} data={requests} />}
         </div>
      </div>
   );
};
