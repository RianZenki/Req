import { IUploadedFile } from "@/utils/file-types";
import { FileIcon, defaultStyles } from "react-file-icon";

export const FileList = ({
   files,
   onRemoveFile,
   onDownloadFile,
}: {
   files: IUploadedFile[];
   onRemoveFile?: (fileId: string, files: IUploadedFile[]) => void;
   onDownloadFile?: (fileURL: string, fileName: string) => void;
}) => {
   return (
      <ul className="grid gap-4 mt-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
         {files.map((file) => (
            <li
               key={file.id}
               className={`flex items-center gap-4 p-4 border rounded-md ${
                  onDownloadFile ? "cursor-pointer" : "cursor-default"
               }`}
               onClick={
                  onDownloadFile
                     ? () => onDownloadFile(file.url!, file.name)
                     : () => {}
               }
            >
               <div className="min-w-12 w-12">
                  <FileIcon
                     extension={file.extension}
                     color="#f1f5f9"
                     {...defaultStyles}
                  />
               </div>
               <div className="flex flex-col overflow-hidden">
                  <strong className="w-full whitespace-nowrap overflow-hidden text-ellipsis">
                     {file.name}
                  </strong>
                  <span className="text-sm text-gray-400">
                     {file.size}
                     {onRemoveFile && (
                        <button
                           type="button"
                           onClick={() => onRemoveFile(file.id, files)}
                           className="text-red-400 ml-3"
                        >
                           Excluir
                        </button>
                     )}
                  </span>
               </div>
            </li>
         ))}
      </ul>
   );
};
