import { CircleNotch, EnvelopeSimple, LockKey } from "phosphor-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { InputText } from "@/components/InputText/index.js";
import { zodResolver } from "@hookform/resolvers/zod";

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

   const createLoginForm = useForm<createLoginData>({
      resolver: zodResolver(createLoginFormSchema),
   });

   const { handleSubmit } = createLoginForm;

   const handleLogin = (data: createLoginData) => {
      console.log(data);
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
               <h1 className="text-3xl font-bold mt-8">REQ</h1>
               <h2 className="text-lg font-normal text-[#646464] mt-4">
                  Realize suas solicitações aqui!
               </h2>
            </header>

            <FormProvider {...createLoginForm}>
               <form
                  onSubmit={handleSubmit(handleLogin)}
                  className="mt-8 w-[400px]"
               >
                  <InputText.Root>
                     <InputText.Label htmlFor="email">
                        Endereço de e-mail
                        <InputText.Field>
                           <InputText.Icon
                              icon={EnvelopeSimple}
                              size={24}
                              color="#4D4D4D"
                           />
                           <InputText.Input
                              name="email"
                              type="email"
                              placeholder="aluno@email.com"
                           />
                        </InputText.Field>
                        <InputText.ErrorMessage field="email" />
                     </InputText.Label>
                  </InputText.Root>

                  <InputText.Root>
                     <InputText.Label htmlFor="password">
                        Endereço de e-mail
                        <InputText.Field>
                           <InputText.Icon
                              icon={LockKey}
                              size={24}
                              color="#4D4D4D"
                           />
                           <InputText.Input
                              name="password"
                              type="password"
                              placeholder="********"
                           />
                        </InputText.Field>
                        <InputText.ErrorMessage field="password" />
                     </InputText.Label>
                  </InputText.Root>

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
               <p className="cursor-pointer text-xs text-[#646464]">
                  Esqueceu a senha?
               </p>
               <p>
                  <Link className="text-[#646464] text-xs" to="/cadastro">
                     Não possui cadastro no sitema? Cadastre-se
                  </Link>
               </p>
            </footer>
         </div>
      </div>
   );
};
