import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFormattedDate, getTimeFromDate } from "@/utils/formattedDate";
import userIcon from "@/assets/user-circle-solid.svg";

export const ResponseCard = ({
   description,
   createdAt,
   createdBy,
   role,
}: {
   description: string;
   createdAt: string;
   createdBy: string;
   role: string;
}) => {
   const isStudant = role === "ALUNO";

   return (
      <div
         className={`flex gap-4 w-full ${
            isStudant ? "flex-row" : "flex-row-reverse"
         }`}
      >
         <Avatar className="size-9">
            <AvatarImage className="bg-white border-none" src={userIcon} />
            <AvatarFallback>CN</AvatarFallback>
         </Avatar>
         <div className="w-full rounded shadow">
            <header
               className={`flex gap-8 p-2 rounded-t ${
                  isStudant ? "bg-brandColor-500" : "bg-slate-500"
               }`}
            >
               <p className="text-white text-sm font-light">
                  <strong className="font-semibold">{createdBy}</strong> enviou{" "}
                  {`${getFormattedDate(createdAt)} ${getTimeFromDate(
                     createdAt
                  )}`}
               </p>
            </header>
            <div className="flex flex-col gap-4 px-2 py-4">
               <main>
                  <p>{description}</p>
               </main>
            </div>
         </div>
      </div>
   );
};
