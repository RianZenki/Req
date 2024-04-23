import { Button } from "@/components/Button";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const FinalizeButton = ({
   onFinalizeRequest,
}: {
   onFinalizeRequest: () => Promise<void>;
}) => {
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button className="bg-transparent border border-brandColor-700 text-brandColor-700 hover:bg-transparent">
               Finalizar solicitação
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  Deseja finalizar a solicitação?
               </AlertDialogTitle>
               <AlertDialogDescription>
                  Ao finalizar a solicitação será impossivel reabrir a
                  solicitação e um novo pedido deve ser criado caso necessário.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancelar</AlertDialogCancel>
               <AlertDialogAction
                  onClick={onFinalizeRequest}
                  className="bg-brandColor-700 hover:bg-[#2672f9]"
               >
                  Continuar
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};
