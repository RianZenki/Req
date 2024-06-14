import { requestTypes } from "@/utils/request-types";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "../../../ui/dialog";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../../../ui/select";
import { TextInput } from "../../../TextInput";
import { Checkbox } from "../../../Checkbox";
import api from "@/services/api";
import { translatedRequestType } from "@/utils/request-status";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSecretaryContext } from "@/contexts/SecretaryContext";
import { Button } from "@/components/Button";
import { ISecretary } from "@/utils/secretary-types";

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

export const UpdateSecretaryModal = ({ id }: { id: string }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [secretary, setSecretary] = useState<ISecretary | undefined>();
   const createRegisterForm = useForm<createRegisterData>({
      resolver: zodResolver(createRegisterFormSchema),
   });

   const { handleSubmit, control, setValue } = createRegisterForm;
   const { updateSecretaries } = useSecretaryContext();

   const handleUpdateSecreatry = async ({
      name,
      email,
      nm,
      role,
      requestTypes,
   }: any) => {
      try {
         const response = await api.put(`secretario/${id}`, {
            nome: name,
            email,
            numeroMatricula: nm,
            cargo: role,
            tipo_pedido: requestTypes.map(
               (type: any) =>
                  translatedRequestType[
                     type as keyof typeof translatedRequestType
                  ]
            ),
         });
         updateSecretaries(response.data.secretarios);
         toast.success(response.data.msg);
         setIsModalOpen(false);
      } catch (error: any) {
         toast.error(error.response.msg);
      }
   };

   const getSecretary = async () => {
      try {
         const response = await api.get(`/secretario/${id}`);
         setSecretary(response.data);
      } catch (error: any) {
         console.log(error.response.msg);
      }
   };

   useEffect(() => {
      if (secretary) {
         const requestTypes = secretary.tipo_pedido_secretario!.map(
            (type) => type.tipo_pedido.tipo
         );

         setValue("name", secretary.nome);
         setValue("email", secretary.email);
         setValue("nm", secretary.numeroMatricula);
         setValue("role", secretary.cargo);
         setValue("requestTypes", requestTypes as [string, ...string[]]);
      }
   }, [secretary]);

   return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
         <DialogTrigger asChild>
            <div>
               <Button
                  onClick={getSecretary}
                  className="w-fit h-9 px-4 py-2 text-sm"
               >
                  Detalhes
               </Button>
            </div>
         </DialogTrigger>
         <DialogContent className="overflow-y-auto max-h-screen max-w-[700px]">
            <DialogHeader>
               <DialogTitle>Dados do secretário</DialogTitle>
               <DialogDescription>
                  Visualize e atualize os dados do secretário
               </DialogDescription>
            </DialogHeader>
            <FormProvider {...createRegisterForm}>
               <form
                  className="flex flex-col"
                  id="secretaryForm"
                  onSubmit={handleSubmit(handleUpdateSecreatry)}
               >
                  <TextInput.Root>
                     <TextInput.Label htmlFor="name">
                        Nome
                        <TextInput.Field>
                           <TextInput.Input
                              name="name"
                              placeholder="João Silva"
                              className="p-3"
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
                              className="p-3"
                           />
                        </TextInput.Field>
                        <TextInput.ErrorMessage field="email" />
                     </TextInput.Label>
                  </TextInput.Root>

                  <TextInput.Root>
                     <TextInput.Label htmlFor="nm">
                        Número de matricula
                        <TextInput.Field>
                           <TextInput.Input
                              name="nm"
                              placeholder="0000000000000"
                              className="p-3"
                              maxLength={13}
                           />
                        </TextInput.Field>
                        <TextInput.ErrorMessage field="nm" />
                     </TextInput.Label>
                  </TextInput.Root>

                  <div className="flex flex-col flex-1 relative">
                     <Controller
                        control={control}
                        name="role"
                        render={({ field: { onChange, value } }) => (
                           <label htmlFor="role" className="text-base mb-1">
                              Cargo
                              <Select onValueChange={onChange} value={value}>
                                 <SelectTrigger className="w-full border-none bg-[#f5f5f5] p-3 text-base min-w-[410px] py-7 mt-2 focus:ring-0 focus:outline-1 focus:outline-brandColor-700 rounded">
                                    <SelectValue placeholder="Selecione um cargo" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="SECRETARIO">
                                       Secretário
                                    </SelectItem>
                                    <SelectItem value="SECRETARIO_GERAL">
                                       Secretário geral
                                    </SelectItem>
                                 </SelectContent>
                                 <TextInput.ErrorMessage field="role" />
                              </Select>
                           </label>
                        )}
                     />
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                     <p className="font-semibold">
                        Responsável por quais tipos de solicitações
                     </p>

                     <div className="grid grid-cols-2 relative">
                        {requestTypes.map((type) => (
                           <Checkbox
                              key={type}
                              label={type}
                              name="requestTypes"
                           />
                        ))}
                        <TextInput.ErrorMessage
                           field="requestTypes"
                           className="top-9"
                        />
                     </div>
                  </div>
               </form>
            </FormProvider>
            <DialogFooter className="mt-4">
               <DialogClose asChild>
                  <Button
                     variant="link"
                     className="w-fit h-9 px-4 py-2 text-sm"
                  >
                     Cancelar
                  </Button>
               </DialogClose>
               <Button
                  form="secretaryForm"
                  type="submit"
                  className="w-fit h-9 px-4 py-2 text-sm"
               >
                  Atualizar
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
