import { TextInput } from "@/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import icon from "/icon.svg";
import { toast } from "react-toastify";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

const createLoginFormSchema = z
   .object({
      newPassword: z.string().min(8, "* Necessário pelo menos 8 caracteres"),
      confirmPassword: z
         .string()
         .min(8, "* Necessário pelo menos 8 caracteres"),
   })
   .refine((data) => data.newPassword === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "* Senhão incompativeis",
   });

type createLoginData = z.infer<typeof createLoginFormSchema>;

export const NewPassword = () => {
   const token = new URLSearchParams(document.location.search).get("t");
   const navigate = useNavigate();
   const createLoginForm = useForm<createLoginData>({
      resolver: zodResolver(createLoginFormSchema),
   });

   const { handleSubmit } = createLoginForm;

   const handleChangePassword = async (data: createLoginData) => {
      try {
         const response = await api.post("/auth/nova-senha", {
            senha: data.newPassword,
            token,
         });
         toast.success(response.data.msg);
         navigate("/");
      } catch (error: any) {
         toast.error(error.response.data.msg);
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
               <img src={icon} className="w-32" alt="Req icone" />
               <h1 className="text-3xl font-bold mt-4">Req</h1>
               <h2 className="text-lg font-normal text-[#646464] mt-4">
                  Alterar senha
               </h2>
            </header>

            <FormProvider {...createLoginForm}>
               <form
                  onSubmit={handleSubmit(handleChangePassword)}
                  className="mt-8 w-[400px]"
               >
                  <TextInput.Root>
                     <TextInput.Label htmlFor="password">
                        Nova senha
                        <TextInput.Field>
                           <TextInput.Input
                              name="newPassword"
                              type="password"
                              placeholder="********"
                           />
                        </TextInput.Field>
                        <TextInput.ErrorMessage field="newPassword" />
                     </TextInput.Label>
                  </TextInput.Root>

                  <TextInput.Root>
                     <TextInput.Label htmlFor="password">
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

                  <button className="w-full h-10 text-base text-white font-semibold border-none bg-brandColor-700 rounded cursor-pointer mt-6 flex justify-center items-center gap-1 transition hover:bg-[#2672f9]">
                     Alterar senha
                  </button>
               </form>
            </FormProvider>
         </div>
      </div>
   );
};
