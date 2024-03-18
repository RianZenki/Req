import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { CaretLeft, CircleNotch } from "phosphor-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../components/TextInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { toast } from "react-toastify";

const createRegisterFormSchema = z
   .object({
      name: z.string().min(1, "* Campo obrigatório"),
      email: z
         .string()
         .min(1, "* Campo obrigatório")
         .email("* Digite um e-mail válido"),
      course: z.string({ required_error: "* Campo obrigatório" }).min(1),
      period: z.string().min(1, "* Campo obrigatório"),
      ra: z
         .string()
         .min(13, "* Requer 13 números")
         .max(13, "* Requer 13 números"),
      password: z.string().min(8, "* Necessário pelo menos 8 caracteres"),
      confirmPassword: z
         .string()
         .min(8, "* Necessário pelo menos 8 caracteres"),
   })
   .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "* Senhão incompativeis",
   });

type createRegisterData = z.infer<typeof createRegisterFormSchema>;

export const Register = () => {
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const createRegisterForm = useForm<createRegisterData>({
      resolver: zodResolver(createRegisterFormSchema),
   });

   const { handleSubmit, control } = createRegisterForm;

   const handleRegister = async ({ name, email, course, period, ra, password }: createRegisterData) => {
      setLoading(true)

      try {
         const response = await api.post('/auth/cadastro', { 
            nome: name,
            email,
				curso: course,
				turno: period,
				ra,
				senha: password,
          })
         toast.success(response.data.msg)
         navigate("/");
      } catch (error: any) {
         const data = error.response.data
         toast.error(data.msg)
      }
      setLoading(false)
   };

   return (
      <div
         className={
            "w-full h-screen flex flex-col items-center justify-center bg-[linear-gradient(to_bottom,_#0582ca_50%,_#f8f8f8_50%)]"
         }
      >
         <div className="w-[1010px] pt-8 pr-16 pb-12 pl-10 border border-[#e9e9e9] rounded-lg shadow-md bg-white">
            <Link to="/" className="no-underline">
               <span className="inline-flex items-center text-center cursor-pointer gap-2">
                  <CaretLeft size={24} />
                  Voltar
               </span>
            </Link>

            <div className="my-10 pl-10">
               <h1 className="text-3xl bold mb-2">Cadastro</h1>
               <h2 className="text-lg  font-normal text-[#646464]">
                  Crie seu cadastro para realizar suas solicitações
               </h2>
            </div>

            <FormProvider {...createRegisterForm}>
               <form
                  onSubmit={handleSubmit(handleRegister)}
                  className="flex flex-col w-full pl-10"
               >
                  <div className="w-full flex gap-11">
                     <TextInput.Root>
                        <TextInput.Label htmlFor="name">
                           Nome
                           <TextInput.Field>
                              <TextInput.Input
                                 name="name"
                                 placeholder="João Silva"
                              />
                           </TextInput.Field>
                           <TextInput.ErrorMessage field="name" />
                        </TextInput.Label>
                     </TextInput.Root>

                     <TextInput.Root>
                        <TextInput.Label htmlFor="email">
                           E-mail
                           <TextInput.Field>
                              <TextInput.Input
                                 name="email"
                                 type="email"
                                 placeholder="aluno@email.com"
                              />
                           </TextInput.Field>
                           <TextInput.ErrorMessage field="email" />
                        </TextInput.Label>
                     </TextInput.Root>
                  </div>

                  <div className="w-full flex gap-11">
                     <div className="flex flex-col flex-1 relative">
                        <label htmlFor="course" className="text-base mb-1">
                           Curso
                           <Controller
                              control={control}
                              name="course"
                              render={({ field: { onChange } }) => (
                                 <Select name="course" onValueChange={onChange}>
                                    <SelectTrigger className="w-full border-none bg-[#f5f5f5] text-base min-w-[410px] py-7 mt-2 focus:ring-0 focus:outline-1 focus:outline-brandColor-700 rounded">
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
                                 </Select>
                              )}
                           />
                        </label>
                     </div>

                     <div className="flex flex-col flex-1 relative">
                        <Controller
                           control={control}
                           name="period"
                           render={({ field: { onChange } }) => (
                              <label htmlFor="period">
                                 Turno
                                 <Select onValueChange={onChange}>
                                    <SelectTrigger className="w-full border-none bg-[#f5f5f5] text-base min-w-[160px] py-7 mt-2 focus:ring-0 focus:outline-1 focus:outline-brandColor-700 rounded">
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
                              />
                           </TextInput.Field>
                           <TextInput.ErrorMessage field="ra" />
                        </TextInput.Label>
                     </TextInput.Root>
                  </div>

                  <div className="w-full flex gap-11">
                     <TextInput.Root>
                        <TextInput.Label htmlFor="password">
                           Senha
                           <TextInput.Field>
                              <TextInput.Input
                                 name="password"
                                 type="password"
                                 placeholder="********"
                              />
                           </TextInput.Field>
                           <TextInput.ErrorMessage field="password" />
                        </TextInput.Label>
                     </TextInput.Root>

                     <TextInput.Root>
                        <TextInput.Label htmlFor="confirmPassword">
                           Confirmar senha
                           <TextInput.Field>
                              <TextInput.Input
                                 name="confirmPassword"
                                 type="password"
                                 placeholder="********"
                              />
                           </TextInput.Field>
                           <TextInput.ErrorMessage field="confirmPassword" />
                        </TextInput.Label>
                     </TextInput.Root>
                  </div>

                  <button className="w-[200px] h-12 text-base text-white font-semibold border-none bg-brandColor-700 rounded self-end cursor-pointer mt-6 flex justify-center items-center gap-1 transition hover:bg-[#2672f9]">
                     {loading ? (
                        <>
                           <CircleNotch size={20} className="animate-spin" />
                           Enviando...
                        </>
                     ) : (
                        <>Cadastre-se</>
                     )}
                  </button>
               </form>
            </FormProvider>
         </div>
      </div>
   );
};
