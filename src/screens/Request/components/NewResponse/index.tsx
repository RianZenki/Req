import { Button } from "@/components/Button";
import { FileList } from "@/components/FileList";
import { TextInput } from "@/components/TextInput";
import { UploadInput } from "@/components/UploadInput";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useSecretaryContext } from "@/contexts/SecretaryContext";
import api from "@/services/api";
import { IResponse } from "@/utils/response-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { filesize } from "filesize";
import { uniqueId } from "lodash";
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
   const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
   const createResponseForm = useForm<createNewResponseData>({
      resolver: zodResolver(createNewResponseSchema),
   });
   const { id } = useParams();
   const { studant } = useAuth();
   const { secretary } = useSecretaryContext();
   const user = studant ?? secretary;

   const { handleSubmit, register } = createResponseForm;

   const handleCreateResponse = async ({
      description,
   }: {
      description: string;
   }) => {
      try {
         const formData = new FormData();
         setLoading(true);

         formData.append("descricao", description);
         formData.append("cargo", user.cargo || "ALUNO");
         formData.append("criadoPor", user.nome);
         formData.append("solicitacaoId", id!);
         formData.append("usuarioId", user.id);

         uploadedFiles.forEach((file: any) => {
            formData.append("file", file.file);
         });

         const response = await api.post("/resposta", formData);

         setLoading(false);
         onHideForm();
         onUpdateResponses(response.data.updatedResponse);
         toast.success(response.data.msg);
      } catch (error: any) {
         if (error) {
            setLoading(false);
            toast.error(error.response.data.msg);
         }
      }
   };

   const handleUpload = (files: any) => {
      const uploadedFiles = files.map((file: any) => ({
         file,
         id: uniqueId(),
         name: file.name,
         size: filesize(file.size),
         extension: file.name.split(".").pop(),
      }));

      setUploadedFiles((prev: any[]) => {
         return [...prev, ...uploadedFiles];
      });
   };

   const handleRemoveFile = (fileId: string, files: any[]) => {
      const filteredFiles = files.filter((file) => file.id !== fileId);
      setUploadedFiles(filteredFiles);
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
                     Infome a descrição e dados adicionais sobre a resposta
                  </p>
                  <Textarea
                     id="description"
                     placeholder="Informe a descrição da resposta"
                     rows={6}
                     className="resize-none text-base bg-[#f5f5f5] focus-visible:ring-brandColor-700"
                     {...register("description")}
                  />
                  <TextInput.ErrorMessage
                     field="description"
                     className="top-8"
                  />
               </section>

               <Separator />

               <section>
                  <label className="inline-block font-semibold text-2xl">
                     Anexar arquivo
                  </label>
                  <p className="text-muted-foreground text-sm mb-3">
                     Anexe arquivos necessários para a realização da resposta
                  </p>
                  <UploadInput onUpload={handleUpload} />
                  {!!uploadedFiles.length && (
                     <FileList
                        files={uploadedFiles}
                        onRemoveFile={handleRemoveFile}
                     />
                  )}
               </section>

               <div className="flex w-full gap-4 justify-end">
                  <Button
                     variant="link"
                     className=" w-[100px]"
                     onClick={onHideForm}
                  >
                     Cancelar
                  </Button>
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
