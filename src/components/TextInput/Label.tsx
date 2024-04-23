import { LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
   return (
      <label
         {...props}
         className={twMerge("text-base mb-4", props.className)}
      />
   );
};
