import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch, EnvelopeSimple } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "../TextInput";
import { AlertDialogHeader } from "../ui/alert-dialog";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Alert } from "../Alert";

const createRecoveryFormSchema = z.object({
   recoveryEmail: z
      .string()
      .min(1, "* Campo obrigatório")
      .email("* Digite um e-mail válido"),
});

type createRecoveryData = z.infer<typeof createRecoveryFormSchema>;

export const AccountRecoveryModal = () => {
   const [isLoading, setIsLoading] = useState(false);

   const createLoginForm = useForm<createRecoveryData>({
      resolver: zodResolver(createRecoveryFormSchema),
   });

   const { handleSubmit } = createLoginForm;

   const handleRecovery = (data: createRecoveryData) => {
      console.log(data);
   };

   return (
      <>
         <Dialog>
            <DialogTrigger asChild>
               <p className="cursor-pointer text-xs text-[#646464] hover:underline">
                  Esqueceu a senha?
               </p>
            </DialogTrigger>
            <DialogContent className="flex flex-col py-14 px-[72px] border border-[#e9e9e9] bg-white rounded-lg">
               <AlertDialogHeader>
                  <DialogTitle className="text-3xl font-bold mb-2">
                     Recuperar senha
                  </DialogTitle>
                  <DialogDescription className="text-[#646464] text-base">
                     Informe o e-mail cadastrado e será enviado o link para a
                     criação de uma nova senha.
                  </DialogDescription>
               </AlertDialogHeader>
               <FormProvider {...createLoginForm}>
                  <form
                     onSubmit={handleSubmit(handleRecovery)}
                     id="recevoryForm"
                     className="flex flex-col gap-4 mt-4"
                  >
                     <TextInput.Root>
                        <TextInput.Label htmlFor="recoveryEmail">
                           Endereço de e-mail
                           <TextInput.Field>
                              <TextInput.Icon
                                 icon={EnvelopeSimple}
                                 size={24}
                                 color="#4D4D4D"
                              />
                              <TextInput.Input
                                 name="recoveryEmail"
                                 type="email"
                                 placeholder="aluno@email.com"
                              />
                           </TextInput.Field>
                           <TextInput.ErrorMessage field="recoveryEmail" />
                        </TextInput.Label>
                     </TextInput.Root>
                  </form>
               </FormProvider>
               <DialogFooter>
                  <button
                     type="submit"
                     form="recevoryForm"
                     className="w-full h-10 text-base text-white bg-brandColor-700 rounded cursor-pointer transition flex justify-center items-center gap-1 hover:bg-[#2672f9]"
                  >
                     {isLoading ? (
                        <>
                           <CircleNotch size={20} className="animate-spin" />
                           Enviando e-mail...
                        </>
                     ) : (
                        <>Recuperar senha</>
                     )}
                  </button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
};
