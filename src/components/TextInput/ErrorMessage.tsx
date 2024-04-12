import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface ErrorMEssageProps extends ComponentProps<'span'> {
   field: string;
}

function get(obj: Record<any, any>, path: string) {
   const travel = (regexp: RegExp) =>
      String.prototype.split
         .call(path, regexp)
         .filter(Boolean)
         .reduce(
            (res, key) => (res !== null && res !== undefined ? res[key] : res),
            obj
         );

   const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

   return result;
}

export const ErrorMessage = ({ field, ...rest }: ErrorMEssageProps) => {
   const {
      formState: { errors },
   } = useFormContext();

   const fieldError = get(errors, field);

   if (!fieldError) {
      return null;
   }

   return (
      <span className={twMerge("text-xs text-red-500 mt-1 absolute top-0 right-0", rest.className)}>
         {fieldError.message?.toString()}
      </span>
   );
};
