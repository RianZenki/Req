import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch, Key } from "phosphor-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const createChangePasswordFormSchema = z
   .object({
      password: z.string().min(8, "* Necessário pelo menos 8 caracteres"),
      newPassword: z.string().min(8, "* Necessário pelo menos 8 caracteres"),
      confirmPassword: z
         .string()
         .min(8, "* Necessário pelo menos 8 caracteres"),
   })
   .refine((data) => data.newPassword === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "* Senhão incompativeis",
   });

type createChangePasswordData = z.infer<typeof createChangePasswordFormSchema>;

export const ChangePassword = () => {
   const [loading, setLoading] = useState(false);
   const { studant } = useAuth();

   const createChangePasswordForm = useForm<createChangePasswordData>({
      resolver: zodResolver(createChangePasswordFormSchema),
   });

   const { handleSubmit, setValue } = createChangePasswordForm;

   const resetInputs = () => {
      setValue("password", "");
      setValue("confirmPassword", "");
      setValue("newPassword", "");
   };

   const handleChangePassword = async (data: createChangePasswordData) => {
      setLoading(true);
      try {
         const response = await api.post("/auth/alterar-senha", {
            senha: data.newPassword,
            senhaAntiga: data.password,
            alunoId: studant?.id,
         });
         toast.success(response.data.msg);
         resetInputs();
      } catch (error: any) {
         toast.error(error.response.data.msg);
      }
      setLoading(false);
   };

   return (
      <>
         <div className="flex gap-4 items-center text-xl">
            <Key size={24} />
            <p>Alterar senha</p>
         </div>
         <FormProvider {...createChangePasswordForm}>
            <form
               className="bg-[#F4F4F5] p-8 rounded-md flex flex-col gap-2"
               onSubmit={handleSubmit(handleChangePassword)}
            >
               <TextInput.Root>
                  <TextInput.Label htmlFor="password">
                     Senha antiga
                     <TextInput.Field>
                        <TextInput.Input
                           name="password"
                           type="password"
                           placeholder="********"
                           className="bg-white"
                        />
                     </TextInput.Field>
                     <TextInput.ErrorMessage field="password" />
                  </TextInput.Label>
               </TextInput.Root>

               <TextInput.Root>
                  <TextInput.Label htmlFor="newPassword">
                     Nova senha
                     <TextInput.Field>
                        <TextInput.Input
                           name="newPassword"
                           type="password"
                           placeholder="********"
                           className="bg-white"
                        />
                     </TextInput.Field>
                     <TextInput.ErrorMessage field="newPassword" />
                  </TextInput.Label>
               </TextInput.Root>

               <TextInput.Root>
                  <TextInput.Label htmlFor="confirmPassword">
                     Confirmar nova senha
                     <TextInput.Field>
                        <TextInput.Input
                           name="confirmPassword"
                           type="password"
                           placeholder="********"
                           className="bg-white"
                        />
                     </TextInput.Field>
                     <TextInput.ErrorMessage field="confirmPassword" />
                  </TextInput.Label>
               </TextInput.Root>

               <Button className="mt-4 self-end">
                  {loading ? (
                     <>
                        <CircleNotch size={20} className="animate-spin" />
                        Enviando...
                     </>
                  ) : (
                     <>Alterar senha</>
                  )}
               </Button>
            </form>
         </FormProvider>
      </>
   );
};
