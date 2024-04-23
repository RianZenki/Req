import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
   {
      accessorKey: "numeroMatricula",
      header: "Id",
   },
   {
      accessorKey: "nome",
      header: "Nome",
   },
   {
      accessorKey: "email",
      header: "Email",
   },
   {
      accessorKey: "cargo",
      header: "Cargo",
      cell: ({ row }) => {
         const role: string = row.getValue("cargo");

         return <>{role.toLowerCase()}</>;
      },
   },
   {
      id: "actions",
      header: "",
      cell: ({ row }) => {
         const id = row.getValue("numeroMatricula");
         return (
            <div>
               <button onClick={() => console.log(id)}>Detalhes</button>
               <button onClick={() => console.log(id)}>Deletar</button>
            </div>
         );
      },
   },
];
