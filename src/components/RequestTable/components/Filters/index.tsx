import { StatusFilter } from "./StatusFilter";
import { TypeFilter } from "./TypeFilter";

interface FilterProps {
   columnFilters: any[];
   setColumnFilters: (filter: any) => void;
}

export const Filters = ({ columnFilters, setColumnFilters }: FilterProps) => {
   const filterTypes =
      columnFilters.find((f) => f.id === "tipo_pedidoId")?.value || [];
   const filterStatus = columnFilters.find((f) => f.id === "status")?.value || []

   return (
      <div className="space-x-6 flex">
         <TypeFilter
            setColumnFilters={setColumnFilters}
            filterTypes={filterTypes}
         />
         <StatusFilter
            setColumnFilters={setColumnFilters}
            filterStatus={filterStatus}
         />
      </div>
   );
};
