import { ColumnDef } from '@tanstack/react-table'

export interface Request {
   id: string,
   type: string,
   requester: string,
   createdAt: string,
   status: "success" | "in progress"
}

export const columns: ColumnDef<any>[] = [
   {
      accessorKey: "type",
      header: "Tipo da solicitação",
      size: 500,
      minSize: 600,
   },
   {
      accessorKey: "requester",
      header: "Solicitante",
      size: 500,
      maxSize: 600,
   },
   {
      accessorKey: "createdAt",
      header: "Data de criação",
      size: 500,
      maxSize: 600,
   },
   {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
         const status = row.getValue("status")

         return (
            <div className="flex gap-2">
               <div className={`rounded-full size-5 bg-${status === "success" ? "green-600" : "yellow-500"}`} />
               {row.getValue("status")}
            </div>
         )
      }
   },
]