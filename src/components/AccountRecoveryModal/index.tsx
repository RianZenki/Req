import { AlertDialogHeader } from "../ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog"

export const AccountRecoveryModal = () => {
   return (
      <Dialog>
      <DialogTrigger asChild>
         <p className="cursor-pointer text-xs text-[#646464]">
            Esqueceu a senha?
         </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
            <label htmlFor="">
               E-mail
               <input type="text" />
            </label>
        </div>
        <DialogFooter>
          <button type="submit">Recuperar senha</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}