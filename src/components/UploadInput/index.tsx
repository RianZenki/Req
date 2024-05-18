import { useDropzone } from "react-dropzone";

export const UploadInput = ({ onUpload }: { onUpload: any }) => {
   const onDrop = (acceptedFiles: any) => {
      onUpload(acceptedFiles);
   };

   const { getRootProps, getInputProps, isDragActive, isDragReject } =
      useDropzone({
         onDrop,
         accept: {
            "image/png": [".png"],
            "application/pdf": [".pdf"],
            "image/jpeg": [".jpeg", ".jpg"],
            "text/plain": [".txt"],
            "application/zip": [".zip"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
               [".docx"],
         },
      });

   const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
      if (!isDragActive)
         return (
            <p className="text-muted-foreground">
               Arrasque os seus arquivos aqui, ou clique para seleciona-los...
            </p>
         );

      if (isDragReject)
         return <p className="text-red-600">Tipo de arquivo não suportado</p>;

      return <p className="text-brandColor-700">Solte os arquivos aqui...</p>;
   };

   return (
      <div
         className={`w-full p-16 border-2 rounded-md text-center cursor-pointer border-dashed ${
            isDragActive
               ? isDragReject
                  ? "border-red-500"
                  : "border-brandColor-700"
               : "border-gray-400"
         } bg-[#f5f5f5]`}
         {...getRootProps()}
      >
         <input {...getInputProps()} />
         {renderDragMessage(isDragActive, isDragReject)}
      </div>
   );
};
