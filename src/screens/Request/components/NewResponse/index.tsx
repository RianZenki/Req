import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { IResponse } from "@/utils/response-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "phosphor-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const createNewResponseSchema = z.object({
   description: z.string().min(1, "* Campo obrigatório"),
});

type createNewResponseData = z.infer<typeof createNewResponseSchema>;

export const NewResponse = ({
   onHideForm,
   onUpdateResponses,
}: {
   onHideForm: () => void;
   onUpdateResponses: (response: IResponse) => void;
}) => {
   const [loading, setLoading] = useState(false);
   const createResponseForm = useForm<createNewResponseData>({
      resolver: zodResolver(createNewResponseSchema),
   });
   const { id } = useParams();
   const { studant } = useAuth();

   const { handleSubmit, register } = createResponseForm;
   const handleCreateResponse = async ({
      description,
   }: {
      description: string;
   }) => {
      try {
         setLoading(true);
         const response = await api.post("/resposta", {
            descricao: description,
            cargo: "ALUNO",
            criadoPor: studant?.nome,
            solicitacaoId: id,
            usuarioId: studant?.id,
         });

         setLoading(false);
         onHideForm();
         onUpdateResponses(response.data.resposta);
         toast.success(response.data.msg);
      } catch (error: any) {
         if (error) {
            setLoading(false);
            toast.error(error.response.data.msg);
         }
      }
   };

   return (
      <section className="my-10">
         <h3 className="font-bold text-3xl mb-6">Adicionar nova resposta</h3>
         <FormProvider {...createResponseForm}>
            <form
               className="flex flex-col gap-5"
               onSubmit={handleSubmit(handleCreateResponse)}
            >
               <section className="relative">
                  <label
                     htmlFor="description"
                     className="inline-block font-semibold text-2xl"
                  >
                     Descrição
                  </label>
                  <p className="text-muted-foreground text-sm mb-3">
                     Infome a descrição e dados adicionais sobre a solicitação
                  </p>
                  <Textarea
                     id="description"
                     placeholder="Informe a descrição da solicitação"
                     rows={6}
                     className="resize-none text-base bg-[#f5f5f5] focus-visible:ring-brandColor-700"
                     {...register("description")}
                  />
                  <TextInput.ErrorMessage field="description" />
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
                     Anexe arquivos necessários para a realização da solicitação
                  </p>
                  <input type="file" name="" id="" />
                  use-file-picker
               </section>

               <div className="flex w-full gap-4 justify-end">
                  <button
                     type="button"
                     className="p-4 border border-brandColor-700 text-brandColor-700 rounded h-[48px] flex items-center"
                     onClick={onHideForm}
                  >
                     Cancelar
                  </button>
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
               </div>
            </form>
         </FormProvider>
      </section>
   );
};
