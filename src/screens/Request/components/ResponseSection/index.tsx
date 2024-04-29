import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getFormattedDate, getTimeFromDate } from "@/utils/formattedDate";
import { IRequest } from "@/utils/request-types";
import { ResponseCard } from "../ResponseCard";
import { IResponse } from "@/utils/response-types";

import userIcon from "@/assets/user-circle-solid.svg";

export const ResponseSection = ({
   request,
   responses,
}: {
   request: IRequest;
   responses: IResponse[];
}) => {
   return (
      <section className="flex flex-col w-full gap-5 my-10 justify-center items-center">
         <div className="flex gap-4 w-full">
            <Avatar className="size-9">
               <AvatarImage className="bg-white border-none" src={userIcon} />
               <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-full rounded shadow">
               <header className="flex gap-8 bg-brandColor-500 p-2 rounded-t">
                  {request && (
                     <p className="text-white text-sm font-light">
                        <strong className="font-semibold">
                           {request?.Aluno.nome}
                        </strong>{" "}
                        enviou {getFormattedDate(request?.criado_em)}{" "}
                        {getTimeFromDate(request?.criado_em)}
                     </p>
                  )}
               </header>
               <div className="flex flex-col gap-4 px-2 py-4">
                  <main>
                     <p>{request?.descricao}</p>
                  </main>
                  <footer>
                     <p>Imagem</p>
                  </footer>
               </div>
            </div>
         </div>

         {responses.length > 0 && (
            <Separator orientation="vertical" className="h-6" />
         )}

         <div className="flex flex-col w-full gap-5 items-center">
            {request &&
               responses.map(
                  ({ descricao, criado_em, criado_por, cargo, id }, index) => {
                     return (
                        <>
                           <ResponseCard
                              key={id}
                              description={descricao}
                              createdAt={criado_em}
                              createdBy={criado_por}
                              role={cargo}
                           />
                           {responses.length !== index + 1 ? (
                              <Separator
                                 orientation="vertical"
                                 className="h-6"
                              />
                           ) : null}
                        </>
                     );
                  }
               )}

            {request?.status === "finalizado" && (
               <>
                  <Separator orientation="vertical" className="h-6" />

                  <div className="px-4 py-2 shadow rounded bg-slate-400 text-white">
                     <p className="text-sm font-light">
                        <strong className="font-semibold">
                           {request?.encerrado_por}
                        </strong>{" "}
                        encerrou a solicitação em{" "}
                        {getFormattedDate(request?.criado_em)}{" "}
                        {getTimeFromDate(request?.criado_em)}
                     </p>
                  </div>
               </>
            )}
         </div>
      </section>
   );
};
