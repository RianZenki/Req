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
      header: "Tipo da solicitação"
   },
   {
      accessorKey: "requester",
      header: "Solicitante"
   },
   {
      accessorKey: "createdAt",
      header: "Data de criação"
   },
   {
      accessorKey: "status",
      header: "Status"
   }
]