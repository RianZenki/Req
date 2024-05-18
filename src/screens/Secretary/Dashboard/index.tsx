import api from "@/services/api";
import { InformationCards } from "./sections/InformationCards";
import { MostPopularsRequestsChart } from "./sections/MostPopularsRequestsChart";
import { RequestQuantityChart } from "./sections/RequestQuantityChart";
import { useEffect, useState } from "react";

export interface IData {
   solicitacoesMes: number;
   solicitacoesFinalizadas: number;
   alunos: number;
   solicitacoesDosSeisMeses: {
      name: string;
      quantidade: number;
   }[];
   tiposMaisRepetidos: {
      name: string;
      quantidade: number;
   }[];
}

export const Dashboard = () => {
   const [data, setData] = useState<IData>();

   const getData = async () => {
      const response = await api.get("/analytics");
      setData(response.data);
   };

   useEffect(() => {
      getData();
   }, []);

   return (
      <div className="flex flex-col px-20 mx-auto my-8 gap-14">
         {data && (
            <>
               <InformationCards
                  alunos={data.alunos}
                  solicitacoesFinalizadas={data.solicitacoesFinalizadas}
                  solicitacoesMes={data.solicitacoesMes}
               />
               <div className="flex gap-10">
                  <RequestQuantityChart
                     solicitacoesDosSeisMeses={data.solicitacoesDosSeisMeses}
                  />
                  <MostPopularsRequestsChart
                     tiposMaisRepetidos={data.tiposMaisRepetidos}
                  />
               </div>
            </>
         )}
         {!data && <h2 className="text-center">Carregando os dados...</h2>}
      </div>
   );
};
