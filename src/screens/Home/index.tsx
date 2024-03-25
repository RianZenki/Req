import { columns } from "@/components/RequestTable/columns";
import { DataTable } from "@/components/RequestTable/data-table";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { data } from "@/utils/fake-data";
import { translatedRequestStatus } from "@/utils/request-status";
import { translatedRequestTypes } from "@/utils/request-types";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Plus } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RequestTypes {
   access: boolean;
   disciplineRush: boolean;
   signature: boolean;
   cancellation: boolean;
   fatecCard: boolean;
   registrationProof: boolean;
   programContent: boolean;
   abandoningSubjects: boolean;
   schoolRecords: boolean;
   information: boolean;
   contractTemplates: boolean;
   lockout: boolean;
}

interface RequestStatus {
   inProgress: boolean;
   success: boolean;
}

export const Home = () => {
   const [selectedTypes, setSelectedType] = useState<RequestTypes>({
      access: false,
      disciplineRush: false,
      signature: false,
      cancellation: false,
      fatecCard: false,
      registrationProof: false,
      programContent: false,
      abandoningSubjects: false,
      schoolRecords: false,
      information: false,
      contractTemplates: false,
      lockout: false,
   });
   const [requestStatus, setRequestStatus] = useState<RequestStatus>({
      inProgress: false,
      success: false,
   });
   const { studant } = useAuth();

   const handleSelectedTypesChange = (type: keyof RequestTypes): void => {
      setSelectedType((prevState) => ({
         ...prevState,
         [type]: !prevState[type],
      }));
   };

   const handleRequestStatusChange = (type: keyof RequestStatus): void => {
      setRequestStatus((prevState) => ({
         ...prevState,
         [type]: !prevState[type],
      }));
   };

   const navigate = useNavigate();

   return (
      <div className="w-full max-w-[1600px] px-20 mx-auto mt-10">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-4xl font-bold mb-1">Minhas solicitações</h2>
               <p className="text-muted-foreground">
                  Aqui estão suas solicitações
               </p>
            </div>
            <button
               onClick={() => navigate("/nova-solicitacao")}
               className="w-[200px] h-12 px-5 py-4 rounded bg-brandColor-700 text-white transition hover:bg-[#2672f9] flex items-center gap-2"
            >
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
                  <DropdownMenu>
                     <DropdownMenuTrigger className="w-[250px] h-9.25" asChild>
                        <Button
                           variant="outline"
                           className="flex justify-between font-semibold"
                        >
                           Tipo de solicitação{" "}
                           <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-[250px]">
                        <DropdownMenuLabel>
                           Tipo de solicitação
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {Object.entries(selectedTypes).map(([type, value]) => (
                           <DropdownMenuCheckboxItem
                              key={type}
                              checked={value}
                              onCheckedChange={() =>
                                 handleSelectedTypesChange(
                                    type as keyof RequestTypes
                                 )
                              }
                           >
                              {
                                 translatedRequestTypes[
                                    type as keyof RequestTypes
                                 ]
                              }
                           </DropdownMenuCheckboxItem>
                        ))}
                     </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                     <DropdownMenuTrigger className="w-[180px] h-9.25" asChild>
                        <Button
                           variant="outline"
                           className="flex justify-between font-semibold"
                        >
                           Status <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-[180px]">
                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {Object.entries(requestStatus).map(
                           ([status, value]) => (
                              <DropdownMenuCheckboxItem
                                 key={status}
                                 checked={value}
                                 onCheckedChange={() =>
                                    handleRequestStatusChange(
                                       status as keyof RequestStatus
                                    )
                                 }
                              >
                                 {
                                    translatedRequestStatus[
                                       status as keyof RequestStatus
                                    ]
                                 }
                              </DropdownMenuCheckboxItem>
                           )
                        )}
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
            <p>{studant?.nome}</p>
            <div className="w-full py-8">
               <DataTable columns={columns} data={data} />
            </div>
         </div>
      </div>
   );
};
