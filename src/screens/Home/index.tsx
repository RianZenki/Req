import { columns } from "@/components/RequestTable/columns";
import { DataTable } from "@/components/RequestTable/data-table";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Plus } from "phosphor-react";

const data = [
   {
      id: "728ed52f",
      type: "Comprovante de estudante",
      requester: "Jacinto Pinto",
      createdAt: new Date().toLocaleDateString(),
      status: "in progress",
   },
   {
      id: "728ed52a",
      type: "Comprovante de estudante",
      requester: "Thomar Turbando",
      createdAt: new Date().toLocaleDateString(),
      status: "in progress",
   },
   {
      id: "728ed52b",
      type: "Comprovante de estudante",
      requester: "Paula Tejando",
      createdAt: new Date().toLocaleDateString(),
      status: "success",
   },
   {
      id: "728ed52f",
      type: "Comprovante de estudante",
      requester: "Jacinto Pinto",
      createdAt: new Date().toLocaleDateString(),
      status: "in progress",
   },
   {
      id: "728ed52a",
      type: "Comprovante de estudante",
      requester: "Thomar Turbando",
      createdAt: new Date().toLocaleDateString(),
      status: "in progress",
   },
   {
      id: "728ed52b",
      type: "Comprovante de estudante",
      requester: "Paula Tejando",
      createdAt: new Date().toLocaleDateString(),
      status: "success",
   },
   {
      id: "728ed52f",
      type: "Comprovante de estudante",
      requester: "Jacinto Pinto",
      createdAt: new Date().toLocaleDateString(),
      status: "in progress",
   },
   {
      id: "728ed52a",
      type: "Comprovante de estudante",
      requester: "Thomar Turbando",
      createdAt: new Date().toLocaleDateString(),
      status: "in progress",
   },
   {
      id: "728ed52b",
      type: "Comprovante de estudante",
      requester: "Paula Tejando",
      createdAt: new Date().toLocaleDateString(),
      status: "success",
   },
   {
      id: "728ed52f",
      type: "Comprovante de estudante",
      requester: "Jacinto Pinto",
      createdAt: new Date().toLocaleDateString(),
      status: "in progress",
   },
   {
      id: "728ed52a",
      type: "Comprovante de estudante",
      requester: "Thomar Turbando",
      createdAt: new Date().toLocaleDateString(),
      status: "in progress",
   },
   {
      id: "728ed52b",
      type: "Comprovante de estudante",
      requester: "Paula Tejando",
      createdAt: new Date().toLocaleDateString(),
      status: "success",
   },
   {
      id: "728ed52f",
      type: "Comprovante de estudante",
      requester: "Jacinto Pinto",
      createdAt: new Date().toLocaleDateString(),
      status: "in progress",
   },
   {
      id: "728ed52a",
      type: "Comprovante de estudante",
      requester: "Thomar Turbando",
      createdAt: new Date().toLocaleDateString(),
      status: "in progress",
   },
   {
      id: "728ed52b",
      type: "Comprovante de estudante",
      requester: "Paula Tejando",
      createdAt: new Date().toLocaleDateString(),
      status: "success",
   },
   {
      id: "728ed52f",
      type: "Comprovante de estudante",
      requester: "Jacinto Pinto",
      createdAt: new Date().toLocaleDateString(),
      status: "in progress",
   },
   {
      id: "728ed52a",
      type: "Comprovante de estudante",
      requester: "Thomar Turbando",
      createdAt: new Date().toLocaleDateString(),
      status: "in progress",
   },
   {
      id: "728ed52b",
      type: "Comprovante de estudante",
      requester: "Paula Tejando",
      createdAt: new Date().toLocaleDateString(),
      status: "success",
   },
];

export const Home = () => {
   return (
      <div className="w-full max-w-[1600px] px-20 mx-auto mt-10">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-4xl font-bold mb-1">Minhas solicitações</h2>
               <p className="text-muted-foreground">
                  Aqui estão suas solicitações
               </p>
            </div>
            <button className="w-[200px] h-12 px-5 py-4 rounded bg-brandColor-700 text-white transition hover:bg-[#2672f9] flex items-center gap-2">
               <Plus size={24} color={"#FFF"} />
               Nova solicitação
            </button>
         </div>

         <div className="mt-12">
            <div className="space-x-6 flex">
               <input
                  className="border rounded"
                  type="text"
                  placeholder="Filtrar..."
               />

               <Select>
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Tipo de solicitação" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        <SelectLabel>Tipo de solicitação</SelectLabel>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                     </SelectGroup>
                  </SelectContent>
               </Select>

               <Select>
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="light">Light</SelectItem>
                     <SelectItem value="dark">Dark</SelectItem>
                     <SelectItem value="system">System</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            <div className="w-full py-10">
               <DataTable columns={columns} data={data} />
            </div>
         </div>
      </div>
   );
};
