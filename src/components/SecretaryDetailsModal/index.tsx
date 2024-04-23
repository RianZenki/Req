import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "../ui/dialog";

export const SecretaryDeatilsModal = () => {
   return (
      <Dialog>
         <DialogTrigger>Open</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Detalhes do secretário</DialogTitle>
               <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
               </DialogDescription>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   );
};
