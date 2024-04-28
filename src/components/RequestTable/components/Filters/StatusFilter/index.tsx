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
import { translatedRequestStatus } from "@/utils/request-status";

interface RequestStatus {
   inProgress: boolean;
   success: boolean;
}

interface FilterProps {
   setColumnFilters: (filter: any) => void;
   filterStatus: any[];
}

export const StatusFilter = ({
   setColumnFilters,
   filterStatus,
}: FilterProps) => {
   const [requestStatus, setRequestStatus] = useState<RequestStatus>({
      inProgress: false,
      success: false,
   });

   const handleRequestStatusChange = (status: keyof RequestStatus): void => {
      setRequestStatus((prevState) => ({
         ...prevState,
         [status]: !prevState[status],
      }));

      const translatedStatus = translatedRequestStatus[status];
      const isActive = filterStatus.includes(translatedStatus);

      setColumnFilters((prev: any) => {
         const statusList = prev.find(
            (filter: any) => filter.id === "status"
         )?.value;
         if (!statusList) {
            return prev.concat({
               id: "status",
               value: [translatedStatus],
            });
         }

         return prev.map((f: any) =>
            f.id === "status"
               ? {
                    ...f,
                    value: isActive
                       ? statusList.filter((t: any) => t !== translatedStatus)
                       : statusList.concat(translatedStatus),
                 }
               : f
         );
      });
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="h-9.25" asChild>
            <div>
               <Button
                  variant={filterStatus.length ? "solid" : "outline"}
                  className="flex justify-between font-semibold h-12"
               >
                  Status <ChevronDownIcon className="ml-2 h-4 w-4" />
               </Button>
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-[200px]">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(requestStatus).map(([status, value]) => (
               <DropdownMenuCheckboxItem
                  key={status}
                  checked={value}
                  onCheckedChange={() =>
                     handleRequestStatusChange(status as keyof RequestStatus)
                  }
               >
                  {translatedRequestStatus[status as keyof RequestStatus]}
               </DropdownMenuCheckboxItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
