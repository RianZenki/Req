import { ColumnDef } from "@tanstack/react-table";

export interface Request {
   id: string;
   type: string;
   requester: string;
   createdAt: string;
   status: "success" | "in progress";
}

const statusEnum = {
   success: "Finalizado",
   "in progress": "Em andamento",
};

export const columns: ColumnDef<any>[] = [
   {
      accessorKey: "type",
      header: "Tipo da solicitação",
      size: 600,
   },
   {
      accessorKey: "studant",
      header: "Aluno",
      size: 500,
   },
   {
      accessorKey: "createdAt",
      header: "Data de criação",
      size: 300,
   },
   {
      accessorKey: "status",
      header: "Status",
      size: 200,
      cell: ({ row }) => {
         const status = row.getValue("status");

         return (
            <div className="flex gap-2 items-center text-base">
               <div
                  className={`rounded-full size-4 ${
                     status === "success" ? "bg-green-600" : "bg-yellow-500"
                  }`}
               />
               {statusEnum[row.getValue("status") as keyof typeof statusEnum]}
            </div>
         );
      },
   },
];
