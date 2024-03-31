import { RequestStatus } from "@/components/RequestStatus";
import { getFormattedDate } from "@/utils/formattedDate";
import { IRequest } from "@/utils/request-types";

export const InfoSection = ({ request }: { request: IRequest }) => {
   return (
      <section className="space-y-10">
         <h2 className="text-4xl font-bold">Detalhes da solicitação</h2>
         <div className="flex w-full justify-between gap-10">
            <section className="flex flex-col gap-5 w-full max-w-[500px]">
               <h3 className="text-xl font-semibold">Informações do aluno</h3>
               <div className="flex">
                  <div className="w-[50%]">
                     <strong className="text-lg font-semibold">
                        Nome do aluno
                     </strong>
                     <p>{request?.Aluno.nome}</p>
                  </div>
                  <div className="w-[50%]">
                     <strong className="text-lg font-semibold">RA</strong>
                     <p>{request?.Aluno.ra}</p>
                  </div>
               </div>
               <div className="flex">
                  <div className="w-[100%]">
                     <strong className="text-lg font-semibold">Curso</strong>
                     <p>{request?.Aluno.curso}</p>
                  </div>
               </div>
            </section>

            <section className="flex flex-col gap-5 pr-20 w-full max-w-[500px]">
               <h3 className="text-xl font-semibold">
                  Informações da solicitação
               </h3>
               <div className="flex">
                  <div className="w-[50%]">
                     <strong className="text-lg font-semibold">Status</strong>
                     {request && <RequestStatus status={request?.status} />}
                  </div>
                  <div className="w-[50%]">
                     <strong className="text-lg font-semibold">
                        Tipo de solicitação
                     </strong>
                     <p>{request?.tipo_pedido.tipo}</p>
                  </div>
               </div>
               <div className="flex">
                  <div className="w-[50%]">
                     <strong className="text-lg font-semibold">
                        Data de criação
                     </strong>
                     {request && <p>{getFormattedDate(request?.criado_em)}</p>}
                  </div>
                  <div className="w-[50%]">
                     <strong className="text-lg font-semibold">
                        Data de encerramento
                     </strong>
                     <p>
                        {request?.encerrado_em
                           ? getFormattedDate(request?.encerrado_em)
                           : "--/--"}
                     </p>
                  </div>
               </div>
            </section>
         </div>
      </section>
   );
};
