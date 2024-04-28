import { Button } from "@/components/Button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { useSecretaryContext } from "@/contexts/SecretaryContext";
import api from "@/services/api";
import { toast } from "react-toastify";

interface DeleteSecretaryButtonProps {
   id: string;
}

export const DeleteSecretaryModal = ({ id }: DeleteSecretaryButtonProps) => {
   const { updateSecretaries } = useSecretaryContext();

   const handleDeleteSecretary = async (id: string) => {
      try {
         const response = await api.delete(`/secretario/${id}`);
         updateSecretaries(response.data.secretarios);
         toast.success(response.data.msg);
      } catch (error: any) {
         toast.error(error.response.msg);
      }
   };

   return (
      <Dialog>
         <DialogTrigger asChild>
            <div>
               <Button
                  variant="outline"
                  className="w-fit h-9 px-4 py-2 text-sm"
               >
                  Excluir
               </Button>
            </div>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  Tem certeza que deseja excluir esse secretário?
               </DialogTitle>
               <DialogDescription>
                  Ao excluir esse secretário, todos os dados serão deletados e
                  não será possível recupera-los
               </DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <DialogClose asChild>
                  <Button
                     variant="link"
                     className="w-fit h-9 px-4 py-2 text-sm"
                  >
                     Cancelar
                  </Button>
               </DialogClose>
               <DialogTrigger onClick={() => handleDeleteSecretary(id)} asChild>
                  <Button className="w-fit h-9 px-4 py-2 text-sm">
                     Continuar
                  </Button>
               </DialogTrigger>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
