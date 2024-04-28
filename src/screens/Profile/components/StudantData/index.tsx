import { TextInput } from "@/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch, User } from "phosphor-react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { IStudant } from "@/utils/studant-types";
import { toast } from "react-toastify";

const createProfileFormSchema = z.object({
   name: z.string().min(1, "* Campo obrigatório"),
   email: z
      .string()
      .min(1, "* Campo obrigatório")
      .email("* Digite um e-mail válido"),
   course: z.string({ required_error: "* Campo obrigatório" }).min(1),
   period: z.string({ required_error: "* Campo obrigatório" }).min(1),
   ra: z.string().min(13, "* Requer 13 números").max(13, "* Requer 13 números"),
});

type createProfileData = z.infer<typeof createProfileFormSchema>;

export const StudantData = () => {
   const [loading, setLoading] = useState(false);
   const [studantData, setStudantData] = useState<IStudant | undefined>();
   const { studant } = useAuth();

   const createProfileForm = useForm<createProfileData>({
      resolver: zodResolver(createProfileFormSchema),
      defaultValues: {
         name: "",
         email: "",
         course: "",
         period: "",
         ra: "",
      },
   });

   const { handleSubmit, control, setValue } = createProfileForm;

   const getStudant = async () => {
      try {
         const response = await api.get(`aluno/${studant?.id}`);
         setStudantData(response.data);
      } catch (error: any) {
         console.log(error);
      }
   };

   const handleUpdateStudant = async ({
      name,
      course,
      period,
      ra,
   }: {
      name: string;
      course: string;
      period: string;
      ra: string;
   }) => {
      try {
         setLoading(true);
         const response = await api.put(`aluno/${studant?.id}`, {
            nome: name,
            curso: course,
            turno: period,
            ra,
         });
         setLoading(false);
         toast.success(response.data.msg);
      } catch (error: any) {
         setLoading(false);
         toast.error(error.response.error);
      }
   };

   useEffect(() => {
      getStudant();
   }, []);

   useEffect(() => {
      if (studantData) {
         setValue("name", studantData.nome);
         setValue("email", studantData.email);
         setValue("course", studantData.curso);
         setValue("period", studantData.turno);
         setValue("ra", studantData.ra);
      }
   }, [studantData]);

   return (
      <>
         <div className="flex gap-4 items-center text-xl">
            <User size={24} />
            <p>Dados do aluno</p>
         </div>
         <FormProvider {...createProfileForm}>
            <form
               className="bg-[#F4F4F5] p-8 rounded-md flex flex-col gap-2"
               onSubmit={handleSubmit(handleUpdateStudant)}
            >
               <TextInput.Root>
                  <TextInput.Label htmlFor="name">
                     Nome
                     <TextInput.Field>
                        <TextInput.Input
                           name="name"
                           placeholder="João Silva"
                           className="bg-white"
                        />
                     </TextInput.Field>
                     <TextInput.ErrorMessage field="name" />
                  </TextInput.Label>
               </TextInput.Root>

               <TextInput.Root className="pointer-events-none">
                  <TextInput.Label htmlFor="email">
                     E-mail
                     <TextInput.Field>
                        <TextInput.Input
                           name="email"
                           type="email"
                           placeholder="aluno@email.com"
                           className="bg-white text-gray-500"
                        />
                     </TextInput.Field>
                     <TextInput.ErrorMessage field="email" />
                  </TextInput.Label>
               </TextInput.Root>

               <div className="w-full flex gap-11">
                  <div className="flex flex-col flex-1 relative">
                     <label htmlFor="course" className="text-base mb-1">
                        Curso
                        <Controller
                           control={control}
                           name="course"
                           render={({ field: { onChange, value } }) => (
                              <Select onValueChange={onChange} value={value}>
                                 <SelectTrigger className="w-full border-none bg-white text-base min-w-[380px] py-7 mt-2 focus:ring-0 focus:outline-1 focus:outline-brandColor-700 rounded">
                                    <SelectValue placeholder="Selecione um curso" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="Análise e Desenvolvimento de Sistemas">
                                       Análise e Desenvolvimento de Sistemas
                                    </SelectItem>
                                    <SelectItem value="Big Data para Negócios">
                                       Big Data para Negócios
                                    </SelectItem>
                                    <SelectItem value="Eventos">
                                       Eventos
                                    </SelectItem>
                                    <SelectItem value="Gestão Comercial">
                                       Gestão Comercial
                                    </SelectItem>
                                    <SelectItem value="Recursos Humanos">
                                       Recursos Humanos
                                    </SelectItem>
                                    <SelectItem value="Gestão Empresarial">
                                       Gestão Empresarial
                                    </SelectItem>
                                 </SelectContent>
                                 <TextInput.ErrorMessage field="course" />
                              </Select>
                           )}
                        />
                     </label>
                  </div>

                  <div className="flex flex-col flex-1 relative">
                     <Controller
                        control={control}
                        name="period"
                        render={({ field: { onChange, value } }) => (
                           <label htmlFor="period">
                              Turno
                              <Select onValueChange={onChange} value={value}>
                                 <SelectTrigger className="w-full border-none bg-white text-base min-w-[200px] py-7 mt-2 focus:ring-0 focus:outline-1 focus:outline-brandColor-700 rounded">
                                    <SelectValue placeholder="Selecione o turno" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="Matutino">
                                       Matutino
                                    </SelectItem>
                                    <SelectItem value="Vespertino">
                                       Vespertino
                                    </SelectItem>
                                    <SelectItem value="Noturno">
                                       Noturno
                                    </SelectItem>
                                    <SelectItem value="EAD">EAD</SelectItem>
                                 </SelectContent>
                                 <TextInput.ErrorMessage field="period" />
                              </Select>
                           </label>
                        )}
                     />
                  </div>
                  <TextInput.Root>
                     <TextInput.Label htmlFor="ra">
                        RA
                        <TextInput.Field>
                           <TextInput.Input
                              name="ra"
                              placeholder="0000000000000"
                              maxLength={13}
                              className="bg-white"
                           />
                        </TextInput.Field>
                        <TextInput.ErrorMessage field="ra" />
                     </TextInput.Label>
                  </TextInput.Root>
               </div>

               <Button className="mt-4 self-end">
                  {loading ? (
                     <>
                        <CircleNotch size={20} className="animate-spin" />
                        Enviando...
                     </>
                  ) : (
                     <>Alterar dados</>
                  )}
               </Button>
            </form>
         </FormProvider>
      </>
   );
};
