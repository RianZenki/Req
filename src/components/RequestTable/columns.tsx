import {
   convertedRequestTypeId,
} from "@/utils/request-status";
import { ColumnDef } from "@tanstack/react-table";
import { RequestStatus } from "../RequestStatus";

export const columns: ColumnDef<any>[] = [
   {
      accessorKey: "tipo_pedidoId",
      header: "Tipo da solicitação",
      size: 600,
      enableColumnFilter: true,
      filterFn: (row, columnId, filterTypes) => {
         if (filterTypes.length === 0) return true;
         const type = row.getValue(columnId);
         return filterTypes.includes(
            convertedRequestTypeId[type as keyof typeof convertedRequestTypeId]
         );
      },
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
      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatus) => {
         if (filterStatus.length === 0) return true;
         const status: string = row.getValue(columnId);
         return filterStatus.includes(
            status.charAt(0).toUpperCase() + status.slice(1)
         );
      },
      cell: ({ row }) => {
         const status: string = row.getValue("status");

         return <RequestStatus status={status} />;
      },
   },
];
