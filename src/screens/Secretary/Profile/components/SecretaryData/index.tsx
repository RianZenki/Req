import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { TextInput } from "@/components/TextInput";
import { useSecretaryContext } from "@/contexts/SecretaryContext";
import api from "@/services/api";
import { translatedRequestType } from "@/utils/request-status";
import { requestTypes } from "@/utils/request-types";
import { roleFormatted } from "@/utils/roleFormatted";
import { ISecretary } from "@/utils/secretary-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch, User } from "phosphor-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const createRegisterFormSchema = z.object({
   name: z.string().min(1, "* Campo obrigatório"),
   email: z
      .string()
      .min(1, "* Campo obrigatório")
      .email("* Digite um e-mail válido"),
   nm: z.string().min(13, "* Campo obrigatório"),
   role: z.string({ required_error: "* Campo obrigatório" }).min(1),
   requestTypes: z
      .array(z.string(), {
         invalid_type_error: "* Selecione pelo menos 1 opção",
      })
      .nonempty("* Selecione pelo menos 1 opção"),
});

type createRegisterData = z.infer<typeof createRegisterFormSchema>;

export const SecretaryData = () => {
   const [loading, setLoading] = useState(false);
   const [secretaryData, setSecretaryData] = useState<ISecretary>();
   const { secretary } = useSecretaryContext();

   const createRegisterForm = useForm<createRegisterData>({
      resolver: zodResolver(createRegisterFormSchema),
   });

   const { handleSubmit, setValue } = createRegisterForm;
   const { updateSecretaries } = useSecretaryContext();

   const getSecretary = async () => {
      try {
         const response = await api.get(
            `/secretario/${secretary?.numeroMatricula}`
         );
         setSecretaryData(response.data);
      } catch (error: any) {
         toast.error(error.response.data.msg);
      }
   };

   const handleUpdateSecreatry = async ({ name, requestTypes }: any) => {
      try {
         setLoading(true);
         const response = await api.put(
            `secretario/${secretary?.numeroMatricula}`,
            {
               nome: name,
               email: secretaryData?.email,
               numeroMatricula: secretaryData?.numeroMatricula,
               cargo: secretaryData?.cargo,
               tipo_pedido: requestTypes.map(
                  (type: any) =>
                     translatedRequestType[
                        type as keyof typeof translatedRequestType
                     ]
               ),
            }
         );
         updateSecretaries(response.data.secretarios);
         toast.success(response.data.msg);
         setLoading(false);
      } catch (error: any) {
         toast.error(error.response.msg);
         setLoading(false);
      }
   };

   useEffect(() => {
      if (!secretary) return;
      getSecretary();
   }, [secretary]);

   useEffect(() => {
      if (secretaryData) {
         const requestTypes = secretaryData.tipo_pedido_secretario!.map(
            (type) => type.tipo_pedido.tipo
         );

         setValue("name", secretaryData.nome);
         setValue("email", secretaryData.email);
         setValue("nm", secretaryData.numeroMatricula);
         setValue(
            "role",
            roleFormatted[secretaryData.cargo as keyof typeof roleFormatted]
         );
         setValue("requestTypes", requestTypes as [string, ...string[]]);
      }
   }, [secretaryData]);

   return (
      <>
         <div className="flex gap-4 items-center text-xl">
            <User size={24} />
            <p>Dados do secretário</p>
         </div>
         <FormProvider {...createRegisterForm}>
            <form
               className="bg-[#F4F4F5] p-8 rounded-md flex flex-col gap-2"
               onSubmit={handleSubmit(handleUpdateSecreatry)}
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

               <TextInput.Root className="pointer-events-none">
                  <TextInput.Label htmlFor="nm">
                     Número de matricula
                     <TextInput.Field>
                        <TextInput.Input
                           name="nm"
                           placeholder="0000000000000"
                           className="bg-white text-gray-500"
                           maxLength={13}
                        />
                     </TextInput.Field>
                     <TextInput.ErrorMessage field="nm" />
                  </TextInput.Label>
               </TextInput.Root>

               <TextInput.Root className="pointer-events-none">
                  <TextInput.Label htmlFor="role">
                     Cargo
                     <TextInput.Field>
                        <TextInput.Input
                           name="role"
                           type="text"
                           className="bg-white text-gray-500"
                        />
                     </TextInput.Field>
                     <TextInput.ErrorMessage field="email" />
                  </TextInput.Label>
               </TextInput.Root>

               <div className="flex flex-col gap-2 mt-4">
                  <p className="font-semibold">
                     Responsável por quais tipos de solicitações
                  </p>

                  <div className="grid grid-cols-2 relative">
                     {requestTypes.map((type) => (
                        <Checkbox
                           key={type}
                           label={type}
                           disabled
                           name="requestTypes"
                        />
                     ))}
                     <TextInput.ErrorMessage
                        field="requestTypes"
                        className="-top-9"
                     />
                  </div>
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
