import { HTMLAttributes } from "react";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export const Field = (props: FieldProps) => {
   return (
      <div
         className="flex items-center p-4 gap-4 mt-2 rounded cursor-text bg-[#f5f5f5] focus-within:outline focus-within:outline-brandColor-700 focus-within:outline-2 group/input"
         {...props}
      />
   );
};
