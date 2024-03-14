import { columns } from "@/components/RequestTable/columns";
import { DataTable } from "@/components/RequestTable/data-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { data } from "@/utils/fake-data";
import { requestTypes } from "@/utils/request-types";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Plus } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
   type Checked = DropdownMenuCheckboxItemProps["checked"]
 
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
  const navigate = useNavigate()

   return (
      <div className="w-full max-w-[1600px] px-20 mx-auto mt-10">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-4xl font-bold mb-1">Minhas solicitações</h2>
               <p className="text-muted-foreground">
                  Aqui estão suas solicitações
               </p>
            </div>
            <button onClick={() => navigate("/nova-solicitacao")} className="w-[200px] h-12 px-5 py-4 rounded bg-brandColor-700 text-white transition hover:bg-[#2672f9] flex items-center gap-2">
               <Plus size={24} color={"#FFF"} />
               Nova solicitação
            </button>
         </div>

         <div className="mt-12">
            <div className="space-x-6 flex">
               <input
                  className="w-[250px] border rounded px-3 py-1.5 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Pesquisar aluno..."
               />

               <div className="flex gap-6">
                  <Select>
                     <SelectTrigger className="w-[230px] h-9.25 font-semibold">
                        <SelectValue placeholder="Tipo de solicitação" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectLabel>Tipo de solicitação</SelectLabel>
                              {requestTypes.map(type => (
                                 <SelectItem key={type} value={type}>{type}</SelectItem>
                                 ))}
                        </SelectGroup>
                     </SelectContent>
                  </Select>

                  <DropdownMenu>
                     <DropdownMenuTrigger className="w-[180px] h-9.25" asChild >
                        <Button variant="outline" className="flex justify-between font-semibold">
                        Status <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-[180px]">
                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                           checked={showStatusBar}
                           onCheckedChange={setShowStatusBar}
                           >
                           Em andamento
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                           checked={showActivityBar}
                           onCheckedChange={setShowActivityBar}
                           >
                           Finalizado
                        </DropdownMenuCheckboxItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>

            </div>

            <div className="w-full py-8">
               <DataTable columns={columns} data={data} />
            </div>
         </div>
      </div>
   );
};
