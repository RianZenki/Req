import { File, Checks, Users } from "phosphor-react";
import { IData } from "..";

interface InformationCardsProps extends Partial<IData> {}

export const InformationCards = ({
   alunos,
   solicitacoesFinalizadas,
   solicitacoesMes,
}: InformationCardsProps) => {
   return (
      <section className="grid grid-cols-4 gap-8">
         <div className="flex items-center gap-4 p-6 bg-zinc-100 rounded-lg border-b-4 border-b-blue-400">
            <div className="bg-blue-200 p-4 rounded-full">
               <File size={24} className="text-blue-600" weight="bold" />
            </div>
            <div>
               <p className="text-xl font-bold">{solicitacoesMes}</p>
               <h2 className="font-semibold text-zinc-500 text-sm">
                  Solicitações no mês
               </h2>
            </div>
         </div>

         <div className="flex items-center gap-4 p-6 bg-zinc-100 rounded-lg border-b-4 border-b-green-400">
            <div className="bg-green-200 p-4 rounded-full">
               <Checks size={24} weight="bold" className="text-green-800" />
            </div>
            <div>
               <p className="text-xl font-bold">{solicitacoesFinalizadas}</p>
               <h2 className="font-semibold text-zinc-500 text-sm">
                  Solicitações finalizadas no mês
               </h2>
            </div>
         </div>

         <div className="flex items-center gap-4 p-6 bg-zinc-100 rounded-lg border-b-4 border-b-purple-400">
            <div className="bg-purple-200 p-4 rounded-full">
               <Users size={24} className="text-purple-600" weight="bold" />
            </div>
            <div>
               <p className="text-xl font-bold">{alunos}</p>
               <h2 className="font-semibold text-zinc-500 text-sm">
                  Alunos cadastrados
               </h2>
            </div>
         </div>
      </section>
   );
};
