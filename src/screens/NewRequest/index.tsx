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
import { requestTypes } from "@/utils/request-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const createNewRequestSchema = z.object({
   type: z.string({ required_error: "* Campo obrigatório" }).min(1),
   description: z.string().min(1, "* Campo obrigatório"),
});

type createNewRequestData = z.infer<typeof createNewRequestSchema>;

export const NewRequest = () => {
   const createRequestForm = useForm<createNewRequestData>({
      resolver: zodResolver(createNewRequestSchema),
   });

   const { handleSubmit, register, control } = createRequestForm;

   const handleCreateRequest = (data: any) => {
      console.log(data);
   };

   return (
      <div className="w-full max-w-[1600px] px-32 mx-auto mt-10 flex flex-col gap-6">
         <NavBar />
         <div className="px-24 flex flex-col gap-4">
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
                              <TextInput.ErrorMessage field="type" />
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
                        Anexe arquivos necessários para a realização da
                        solicitação
                     </p>
                     <input type="file" name="" id="" />
                     use-file-picker
                  </section>

                  <button className="w-[200px] h-12 px-5 py-4 rounded bg-brandColor-700 text-white transition hover:bg-[#2672f9] flex items-center justify-center self-end">
                     Enviar Solicitação
                  </button>
               </form>
            </FormProvider>
         </div>
      </div>
   );
};
