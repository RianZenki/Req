import { Plus } from "phosphor-react";

export const Home = () => {
   return (
      <div className="w-full px-20 mt-10">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-2xl font-bold">Minhas solicitações</h2>
               <p className="text-muted-foreground">
                  Aqui estão suas solicitações
               </p>
            </div>
            <button className="w-[200] h-12 px-5 py-4 rounded bg-brandColor-700 text-white transition hover:bg-[#2672f9] flex flex-col justify-center items-center">
               <Plus size={22} />
               Nova solicitação
            </button>
         </div>

         <div className="mt-8">
            <div className="space-x-3">
               <input className="border rounded" type="text" placeholder="Filtrar..." />
               <select name="" id="">
                  <option value="">Tipo de solicitação</option>
               </select>
               <select name="" id="">
                  <option value="">Status</option>
               </select>
            </div>
            <div>Table</div>
            <div>Footer</div>
         </div>
      </div>
   );
};
