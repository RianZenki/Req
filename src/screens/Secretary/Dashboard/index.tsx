import { NewSecreatyModal } from "@/components/NewSecretaryModal";
import { columns } from "@/components/SecretaryTable/columns";
import { DataTable } from "@/components/SecretaryTable/data-table";
import api from "@/services/api";
import { useEffect, useState } from "react";

export const Dashboard = () => {
   const [secretaries, setSecretaries] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const getSecretaries = async () => {
      try {
         const response = await api.get("/secretario");
         setSecretaries(response.data);
      } catch (error: any) {
         console.log(error);
      }
   };

   useEffect(() => {
      getSecretaries();
   }, []);

   return (
      <div className="w-full py-8">
         <h1>Dashboard</h1>
         <NewSecreatyModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setSecretaries={setSecretaries}
         />
         <DataTable columns={columns} data={secretaries} />
      </div>
   );
};
