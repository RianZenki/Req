import { Button } from "@/components/Button";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../../../../ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { translatedRequestTypes } from "@/utils/request-types";

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

interface FilterProps {
   setColumnFilters: (filter: any) => void;
   filterTypes: any[];
}

export const TypeFilter = ({ setColumnFilters, filterTypes }: FilterProps) => {
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

   const handleSelectedTypesChange = (type: keyof RequestTypes): void => {
      setSelectedType((prevState) => ({
         ...prevState,
         [type]: !prevState[type],
      }));

      const translatedType = translatedRequestTypes[type];
      const isActive = filterTypes.includes(translatedType);

      setColumnFilters((prev: any) => {
         const typesList = prev.find(
            (filter: any) => filter.id === "tipo_pedidoId"
         )?.value;
         if (!typesList) {
            return prev.concat({
               id: "tipo_pedidoId",
               value: [translatedType],
            });
         }

         return prev.map((f: any) =>
            f.id === "tipo_pedidoId"
               ? {
                    ...f,
                    value: isActive
                       ? typesList.filter((t: any) => t !== translatedType)
                       : typesList.concat(translatedType),
                 }
               : f
         );
      });
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="w-[250px]" asChild>
            <div>
               <Button
                  variant={filterTypes.length ? "solid" : "outline"}
                  className="flex justify-between font-semibold w-full h-12"
               >
                  Tipo de solicitação{" "}
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
               </Button>
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-[250px] z-50">
            <DropdownMenuLabel>Tipo de solicitação</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(selectedTypes).map(([type, value]) => (
               <DropdownMenuCheckboxItem
                  key={type}
                  checked={value}
                  onCheckedChange={() =>
                     handleSelectedTypesChange(type as keyof RequestTypes)
                  }
               >
                  {translatedRequestTypes[type as keyof RequestTypes]}
               </DropdownMenuCheckboxItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
