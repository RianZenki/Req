import { convertedRequestTypeId } from "@/utils/request-status";
import { ColumnDef } from "@tanstack/react-table";
import { RequestStatus } from "../RequestStatus";

export interface Request {
   id: string;
   type: string;
   requester: string;
   createdAt: string;
   status: "success" | "in progress";
}

export const columns: ColumnDef<any>[] = [
   {
      accessorKey: "tipo_pedidoId",
      header: "Tipo da solicitação",
      size: 600,
      cell: ({ row }) => {
         const requestType = row.getValue("tipo_pedidoId");
         return (
            <>
               {
                  convertedRequestTypeId[
                     requestType as keyof typeof convertedRequestTypeId
                  ]
               }
            </>
         );
      },
   },
   {
      accessorKey: "Aluno.nome",
      header: "Aluno",
      size: 500,
   },
   {
      accessorKey: "criado_em",
      header: "Data de criação",
      size: 300,
      cell: ({ row }) => {
         const creationDate: string = row.getValue("criado_em");
         const formattedDate = new Date(
            Date.parse(creationDate)
         ).toLocaleDateString();

         return <>{formattedDate}</>;
      },
   },
   {
      accessorKey: "status",
      header: "Status",
      size: 200,
      cell: ({ row }) => {
         const status: string = row.getValue("status");

         return <RequestStatus status={status} />;
      },
   },
];
