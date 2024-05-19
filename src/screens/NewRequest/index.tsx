import { NavBar } from "@/components/NavBar";
import { TextInput } from "@/components/TextInput";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";
import { requestTypes } from "@/utils/request-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { translatedRequestType } from "@/utils/request-status";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { UploadInput } from "@/components/UploadInput";
import { FileList } from "@/components/FileList";
import { useState } from "react";
import { uniqueId } from "lodash";
import { filesize } from "filesize";
import { IUploadedFile } from "@/utils/file-types";

const createNewRequestSchema = z.object({
   type: z.string({ required_error: "* Campo obrigatório" }).min(1),
   description: z.string().min(1, "* Campo obrigatório"),
   files: z.any().optional(),
});

type createNewRequestData = z.infer<typeof createNewRequestSchema>;

export const NewRequest = () => {
   const createRequestForm = useForm<createNewRequestData>({
      resolver: zodResolver(createNewRequestSchema),
   });

   const { handleSubmit, register, control } = createRequestForm;
   const [uploadedFiles, setUploadedFiles] = useState<IUploadedFile[]>([]);
   const { studant } = useAuth();
   const navigate = useNavigate();

   const handleCreateRequest = async ({
      type,
      description,
   }: {
      type: string;
      description: string;
   }) => {
      try {
         const formData = new FormData();
         const typeId =
            translatedRequestType[type as keyof typeof translatedRequestType];

         if (!studant) throw "Erro";

         formData.append("tipo", typeId.toString());
         formData.append("alunoId", studant?.id.toString());
         formData.append("descricao", description);

         uploadedFiles.forEach((file) => {
            formData.append("file", file.file!);
         });

         const response = await api.post("/solicitacao", formData);

         toast.success(response.data.msg);
         navigate("/home");
      } catch (error: any) {
         if (error) {
            toast.error(error.response.data.msg);
         }
      }
   };

   const handleUpload = (files: IUploadedFile[]) => {
      const uploadedFiles = files.map((file) => ({
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

   const handleRemoveFile = (fileId: string, files: IUploadedFile[]) => {
      const filteredFiles = files.filter((file) => file.id !== fileId);
      setUploadedFiles(filteredFiles);
   };

   return (
      <div className="w-full max-w-[1600px] px-32 mx-auto mt-10 flex flex-col gap-6">
         <NavBar />
         <div className="px-24 py-4 flex flex-col gap-4">
            <div>
               <h2 className="text-4xl font-bold mb-1">Nova solicitação</h2>
               <p className="text-muted-foreground">
                  Crie uma nova solicitação
               </p>
            </div>

            <Separator />

            <FormProvider {...createRequestForm}>
               <form
                  className="flex flex-col gap-5"
                  onSubmit={handleSubmit(handleCreateRequest)}
               >
                  <section className="relative">
                     <label
                        htmlFor="request-type"
                        className="inline-block font-semibold text-2xl"
                     >
                        Tipo da solicitação
                     </label>
                     <p className="text-muted-foreground text-sm mb-3">
                        Selecione o tipo da solicitação
                     </p>
                     <Controller
                        control={control}
                        name="type"
                        render={({ field: { onChange } }) => (
                           <Select onValueChange={onChange}>
                              <SelectTrigger
                                 id="request-type"
                                 className="w-full h-14 text-base border-none shadow-none  bg-[#f5f5f5] focus:outline focus:outline-brandColor-700 focus-within:outline-1"
                              >
                                 <SelectValue placeholder="Tipo de solicitação" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectGroup>
                                    <SelectLabel>
                                       Tipo de solicitação
                                    </SelectLabel>
                                    {requestTypes.map((type) => (
                                       <SelectItem key={type} value={type}>
                                          {type}
                                       </SelectItem>
                                    ))}
                                 </SelectGroup>
                              </SelectContent>
                              <TextInput.ErrorMessage
                                 field="type"
                                 className="top-8"
                              />
                           </Select>
                        )}
                     />
                  </section>

                  <Separator />

                  <section className="relative">
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
                        Anexe arquivos necessários para a realização da
                        solicitação
                     </p>
                     <UploadInput onUpload={handleUpload} />
                     {!!uploadedFiles.length && (
                        <FileList
                           files={uploadedFiles}
                           onRemoveFile={handleRemoveFile}
                        />
                     )}
                  </section>

                  <Button className="self-end">Enviar Solicitação</Button>
               </form>
            </FormProvider>
         </div>
      </div>
   );
};
