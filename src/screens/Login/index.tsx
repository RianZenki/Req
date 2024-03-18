import { CircleNotch, EnvelopeSimple, LockKey } from "phosphor-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { TextInput } from "@/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountRecoveryModal } from "@/components/AccountRecoveryModal";
import { toast } from "react-toastify";
import api from "@/services/api";

const createLoginFormSchema = z.object({
   email: z
      .string()
      .min(1, "* Campo obrigatório")
      .email("* Digite um e-mail válido"),
   password: z.string().min(8, "* Necessário pelo menos 8 caracteres"),
});

type createLoginData = z.infer<typeof createLoginFormSchema>;

export const Login = () => {
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate()

   const createLoginForm = useForm<createLoginData>({
      resolver: zodResolver(createLoginFormSchema),
   });

   const { handleSubmit } = createLoginForm;

   const handleLogin = async ({ email, password }: createLoginData) => {
      try{
         setLoading(true)
         const response = await api.post("/auth/login", {
            email,
            senha: password
         })
         navigate("/home")
      } catch (err: any) {
         const { status, data } = err.response

         if (status === 401)
            toast.warning(data.msg || data.error)

         if (status === 400)
            toast.error(data.msg || data.error)

         setLoading(false)
      }
   };

   return (
      <div
         className={
            "w-screen h-screen flex flex-col items-center justify-center bg-[linear-gradient(to_bottom,_#0582ca_50%,_#f8f8f8_50%)]"
         }
      >
         <div className="py-12 px-16 border border-[#e9e9e9] rounded-lg bg-white flex flex-col items-center">
            <header className="flex flex-col items-center">
               <p>Logo</p>
               <h1 className="text-3xl font-bold mt-8">Req</h1>
               <h2 className="text-lg font-normal text-[#646464] mt-4">
                  Realize suas solicitações aqui!
               </h2>
            </header>

            <FormProvider {...createLoginForm}>
               <form
                  onSubmit={handleSubmit(handleLogin)}
                  className="mt-8 w-[400px]"
               >
                  <TextInput.Root>
                     <TextInput.Label htmlFor="email">
                        Endereço de e-mail
                        <TextInput.Field>
                           <TextInput.Icon
                              icon={EnvelopeSimple}
                              size={24}
                              color="#4D4D4D"
                           />
                           <TextInput.Input
                              name="email"
                              type="email"
                              placeholder="aluno@email.com"
                           />
                        </TextInput.Field>
                        <TextInput.ErrorMessage field="email" />
                     </TextInput.Label>
                  </TextInput.Root>

                  <TextInput.Root>
                     <TextInput.Label htmlFor="password">
                        Sua senha
                        <TextInput.Field>
                           <TextInput.Icon
                              icon={LockKey}
                              size={24}
                              color="#4D4D4D"
                           />
                           <TextInput.Input
                              name="password"
                              type="password"
                              placeholder="********"
                           />
                        </TextInput.Field>
                        <TextInput.ErrorMessage field="password" />
                     </TextInput.Label>
                  </TextInput.Root>

                  <button className="w-full h-10 text-base text-white font-semibold border-none bg-brandColor-700 rounded cursor-pointer mt-6 flex justify-center items-center gap-1 transition hover:bg-[#2672f9]">
                     {loading ? (
                        <>
                           <CircleNotch size={20} className="animate-spin" />
                           Conectando...
                        </>
                     ) : (
                        <>Entrar no sistema</>
                     )}
                  </button>
               </form>
            </FormProvider>

            <footer className="flex flex-col items-center mt-8 gap-3">
               <AccountRecoveryModal />
               <p>
                  <Link
                     className="text-[#646464] text-xs hover:underline"
                     to="/cadastro"
                  >
                     Não possui cadastro no sitema? Cadastre-se
                  </Link>
               </p>
            </footer>
         </div>
      </div>
   );
};
