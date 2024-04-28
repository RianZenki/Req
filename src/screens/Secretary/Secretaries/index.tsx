import { columns } from "@/components/SecretaryTable/columns";
import { DataTable } from "@/components/SecretaryTable/data-table";
import { useSecretaryContext } from "@/contexts/SecretaryContext";

export const Secretaries = () => {
   const { secretaries } = useSecretaryContext();

   return (
      <div className="w-full max-w-[1600px] px-20 mx-auto mt-10">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-4xl font-bold mb-1">Secretários</h2>
               <p className="text-muted-foreground">
                  Lista com os secretários cadastrados
               </p>
            </div>
         </div>
         <div className="w-full py-12">
            <DataTable columns={columns} data={secretaries} />
         </div>
      </div>
   );
};
