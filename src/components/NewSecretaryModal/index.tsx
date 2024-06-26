import { requestTypes } from "@/utils/request-types";
import { Button } from "../Button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "../ui/dialog";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../ui/select";
import { TextInput } from "../TextInput";
import { Checkbox } from "../Checkbox";
import api from "@/services/api";
import { translatedRequestType } from "@/utils/request-status";
import { toast } from "react-toastify";
import { useSecretaryContext } from "@/contexts/SecretaryContext";

const createRegisterFormSchema = z.object({
   name: z.string().min(1, "* Campo obrigatório"),
   email: z
      .string()
      .min(1, "* Campo obrigatório")
      .email("* Digite um e-mail válido"),
   password: z.string().min(8, "* Necessário pelo menos 8 caracteres"),
   nm: z.string().min(13, "* Campo obrigatório"),
   role: z.string({ required_error: "* Campo obrigatório" }).min(1),
   requestTypes: z
      .array(z.string(), {
         invalid_type_error: "* Selecione pelo menos 1 opção",
      })
      .nonempty("* Selecione pelo menos 1 opção"),
});

type createRegisterData = z.infer<typeof createRegisterFormSchema>;

interface INewSecretary {
   name: string;
   email: string;
   password: string;
   nm: string;
   role: string;
   requestTypes: string[];
}

export const NewSecreatyModal = ({ isModalOpen, setIsModalOpen }: any) => {
   const createRegisterForm = useForm<createRegisterData>({
      resolver: zodResolver(createRegisterFormSchema),
   });

   const { handleSubmit, control, setValue } = createRegisterForm;
   const { updateSecretaries } = useSecretaryContext();

   const cleanUpForm = () => {
      setValue("name", "");
      setValue("email", "");
      setValue("password", "");
      setValue("nm", "");
      setValue("role", "");
      setValue("requestTypes", [""]);
   };

   const handleRegister = async ({
      name,
      email,
      password,
      nm,
      role,
      requestTypes,
   }: INewSecretary) => {
      try {
         const response = await api.post("/secretario", {
            nome: name,
            email,
            senha: password,
            numeroMatricula: nm,
            cargo: role,
            tipo_pedido: requestTypes.map(
               (type) =>
                  translatedRequestType[
                     type as keyof typeof translatedRequestType
                  ]
            ),
         });

         toast.success(response.data.msg);
         updateSecretaries(response.data.secretarios);
         setIsModalOpen(false)
         cleanUpForm();
      } catch (error: any) {
         toast.error(error.response.data.msg);
      }
   };

   return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
         <DialogTrigger asChild>
            <div>
               <Button>Novo secretário</Button>
            </div>
         </DialogTrigger>
         <DialogContent className="overflow-y-auto max-h-screen max-w-[700px]">
            <DialogHeader>
               <DialogTitle>Cadastrar secretário</DialogTitle>
               <DialogDescription>
                  Cadastre as informações de um novo secretário
               </DialogDescription>
            </DialogHeader>
            <FormProvider {...createRegisterForm}>
               <form
                  className="flex flex-col"
                  id="secretaryForm"
                  onSubmit={handleSubmit(handleRegister)}
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
                              placeholder="joão@email.com"
                              className="p-3"
                           />
                        </TextInput.Field>
                        <TextInput.ErrorMessage field="email" />
                     </TextInput.Label>
                  </TextInput.Root>
                  <TextInput.Root>
                     <TextInput.Label htmlFor="password">
                        Senha
                        <TextInput.Field>
                           <TextInput.Input
                              name="password"
                              type="password"
                              placeholder="*******"
                              className="p-3"
                           />
                        </TextInput.Field>
                        <TextInput.ErrorMessage field="password" />
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
                        render={({ field: { onChange } }) => (
                           <label htmlFor="role" className="text-base mb-1">
                              Cargo
                              <Select onValueChange={onChange}>
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
                           className="-top-9"
                        />
                     </div>
                  </div>
               </form>
            </FormProvider>
            <DialogFooter className="mt-4">
               <div>
                  <Button type="submit" form="secretaryForm">
                     Cadastrar
                  </Button>
               </div>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
