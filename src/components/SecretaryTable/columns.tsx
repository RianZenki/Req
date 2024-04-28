import { ColumnDef } from "@tanstack/react-table";
import { DeleteSecretaryModal } from "./components/DeleteSecretaryModal";
import { UpdateSecretaryModal } from "./components/UpdateSecretaryModal";

const roleFormatted = {
   SECRETARIO: "Secretário",
   SECRETARIO_GERAL: "Secretário geral",
};

export const columns: ColumnDef<any>[] = [
   {
      accessorKey: "numeroMatricula",
      header: "Id",
      size: 300
   },
   {
      accessorKey: "nome",
      header: "Nome",
      size: 300
   },
   {
      accessorKey: "email",
      header: "Email",
      size: 300

   },
   {
      accessorKey: "cargo",
      header: "Cargo",
      size: 200,

      cell: ({ row }) => {
         const role: string = row.getValue("cargo");
         return <>{roleFormatted[role as keyof typeof roleFormatted]}</>;
      },
   },
   {
      id: "actions",
      header: "",
      size: 100,
      cell: ({ row }) => {
         const id: string = row.getValue("numeroMatricula");
         return (
            <div className="flex gap-4">
               <UpdateSecretaryModal id={id} />
               <DeleteSecretaryModal id={id} />
            </div>
         );
      },
   },
];
