import { NavBar } from "@/components/NavBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";
import { IRequest } from "@/utils/request-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InfoSection } from "./components/InfoSection";
import { getFormattedDate, getTimeFromDate } from "@/utils/formattedDate";
import { Button } from "@/components/Button";
import { CircleNotch } from "phosphor-react";

export const Request = () => {
   const { id } = useParams();
   const [request, setRequest] = useState<IRequest>();
   const [loading, setLoading] = useState(false);

   const getRequest = async () => {
      try {
         const response = await api.get(`/solicitacao/${id}`);
         setRequest(response.data);
      } catch (error: any) {
         console.log(error.response);
      }
   };

   useEffect(() => {
      getRequest();
   }, []);

   console.log(request);

   return (
      <div className="w-full max-w-[1600px] px-32 mx-auto mt-10 flex flex-col gap-6">
         <NavBar />
         <div className="px-24 flex flex-col gap-4">
            {request && <InfoSection request={request} />}

            <Separator />

            <section className="flex flex-col gap-5 my-10 justify-center items-center">
               <div className="flex gap-4 w-full">
                  <Avatar className="size-9">
                     <AvatarImage src="https://github.com/shadcn.png" />
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

               <Separator orientation="vertical" className="h-6" />

               <div className="flex flex-row-reverse gap-4 w-full">
                  <Avatar className="size-9">
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="w-full rounded shadow">
                     <header className="flex gap-8 bg-slate-500 p-2 rounded-t">
                        <p className="text-white text-sm font-light">
                           <strong className="font-semibold">
                              Edinaldo Pereira
                           </strong>{" "}
                           enviou 05/10/2024 15:30
                        </p>
                     </header>
                     <div className="flex flex-col gap-4 px-2 py-4">
                        <main>
                           <p>
                              Comprovante será enviado por e-mail em até 2 dias
                           </p>
                        </main>
                     </div>
                  </div>
               </div>

               <Separator orientation="vertical" className="h-6" />

               <div className="px-4 py-2 shadow rounded bg-slate-400 text-white">
                  <p>
                     Solicitação encerrada por Edinaldo Pereira em 08/10/2023
                     10:34
                  </p>
               </div>
            </section>

            <Separator />

            <section className="my-10">
               <h3 className="font-bold text-3xl mb-6">
                  Adicionar nova resposta
               </h3>
               <form className="flex flex-col gap-5">
                  <section>
                     <label
                        htmlFor="description"
                        className="inline-block font-semibold text-2xl"
                     >
                        Descrição
                     </label>
                     <p className="text-muted-foreground text-sm mb-3">
                        Infome a descrição e dados adicionais sobre a
                        solicitação
                     </p>
                     <Textarea
                        id="description"
                        placeholder="Informe a descrição da solicitação"
                        rows={6}
                        className="resize-none text-base bg-[#f5f5f5] focus-visible:ring-brandColor-700"
                     />
                  </section>

                  <Separator />

                  <section>
                     <label
                        htmlFor=""
                        className="inline-block font-semibold text-2xl"
                     >
                        Anexar arquivo
                     </label>
                     <p className="text-muted-foreground text-sm mb-3">
                        Anexe arquivos necessários para a realização da
                        solicitação
                     </p>
                     <input type="file" name="" id="" />
                     use-file-picker
                  </section>

                  <Button>
                     {loading ? (
                        <>
                           <CircleNotch size={20} className="animate-spin" />
                           Enviando...
                        </>
                     ) : (
                        <>Enviar resposta</>
                     )}
                  </Button>
               </form>
            </section>
         </div>
      </div>
   );
};
