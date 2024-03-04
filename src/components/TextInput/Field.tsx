import { HTMLAttributes } from "react";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export const Field = (props: FieldProps) => {
   return (
      <div
         className="flex items-center mt-2 gap-2 cursor-text rounded bg-[#f5f5f5] focus-within:outline focus-within:outline-brandColor-700 focus-within:outline-1"
         {...props}
      />
   );
};
