import {
   ColumnDef,
   ColumnFiltersState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   useReactTable,
} from "@tanstack/react-table";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import {
   CaretDoubleLeft,
   CaretDoubleRight,
   CaretLeft,
   CaretRight,
   Plus,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Filters } from "./components/Filters";
import { Button as BlueButton } from '@/components/Button'

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
}

export function DataTable<TData, TValue>({
   columns,
   data,
}: DataTableProps<TData, TValue>) {
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      initialState: {
         pagination: {
            pageSize: 9,
         },
      },
      state: {
         columnFilters,
      },
   });

   const navigate = useNavigate();

   return (
      <>
         <div className="flex justify-between">
            <Filters
               columnFilters={columnFilters}
               setColumnFilters={setColumnFilters}
            />
            <BlueButton onClick={() => navigate("/nova-solicitacao")}>
               <Plus size={24} color={"#FFF"} />
               Nova solicitação
            </BlueButton>
         </div>
         <div className="rounded-md border mt-5">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow
                        key={headerGroup.id}
                        className="bg-gray-100 hover:bg-gray-100"
                     >
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead
                                 key={header.id}
                                 className={"text-lg px-3 py-2"}
                              >
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext()
                                      )}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                           className="cursor-pointer"
                           onClick={() => {
                              const data = row.original as TData & {
                                 id: number;
                              };
                              navigate(`/solicitacao/${data.id}`);
                           }}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell
                                 key={cell.id}
                                 className={"text-base p-3"}
                                 style={{ width: cell.column.getSize() }}
                              >
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className="h-24 text-center"
                        >
                           Nenhum resultado encontrado.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <div className="flex items-center justify-end space-x-2 py-4">
            <div className=" text-sm font-medium mr-8">
               Página {table.getState().pagination.pageIndex + 1} de{" "}
               {table.getPageCount()}
            </div>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.firstPage()}
               disabled={!table.getCanPreviousPage()}
            >
               <CaretDoubleLeft />
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
            >
               <CaretLeft />
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
            >
               <CaretRight />
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.lastPage()}
               disabled={!table.getCanNextPage()}
            >
               <CaretDoubleRight />
            </Button>
         </div>
      </>
   );
}
