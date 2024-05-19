export interface IUploadedFile {
   file?: File;
   id: string;
   name: string;
   size: number | string;
   extension: string;
   url?: string;
}