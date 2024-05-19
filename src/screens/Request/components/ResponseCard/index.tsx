import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFormattedDate, getTimeFromDate } from "@/utils/formattedDate";
import userIcon from "@/assets/user.svg";
import { FileList } from "@/components/FileList";
import { useState } from "react";
import { filesize } from "filesize";

export const ResponseCard = ({
   description,
   createdAt,
   createdBy,
   role,
   files,
}: {
   description: string;
   createdAt: string;
   createdBy: string;
   role: string;
   files: any[];
}) => {
   const [uploadedFiles, _] = useState(() => {
      return files.map((file) => ({
         id: file.id,
         name: file.nome,
         extension: file.extensao,
         size: filesize(file.tamanho),
         url: file.url,
      }));
   });
   const isStudant = role === "ALUNO";

   const handleDownload = (fileURL: string, fileName: string) => {
      fetch(fileURL)
         .then((response) => response.blob())
         .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName || "downloaded-file";
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
         });
   };

   return (
      <div
         className={`flex gap-4 w-full ${
            isStudant ? "flex-row" : "flex-row-reverse"
         }`}
      >
         <Avatar className="size-9">
            <AvatarImage className="bg-white scale-110" src={userIcon} />
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
            <div className="flex flex-col gap-2 px-4 py-4">
               <main>
                  <p>{description}</p>
               </main>
               <footer>
                  <FileList
                     files={uploadedFiles}
                     onDownloadFile={handleDownload}
                  />
               </footer>
            </div>
         </div>
      </div>
   );
};
