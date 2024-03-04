import { useFormContext } from "react-hook-form";

interface ErrorMEssageProps {
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

export const ErrorMessage = ({ field }: ErrorMEssageProps) => {
   const {
      formState: { errors },
   } = useFormContext();

   const fieldError = get(errors, field);

   if (!fieldError) {
      return null;
   }

   return (
      <span className="text-xs text-red-500 mt-1 absolute top-0 right-0">
         {fieldError.message?.toString()}
      </span>
   );
};
