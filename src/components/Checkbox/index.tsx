import { Check } from "phosphor-react";
import { HTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
   label: string;
   name: string;
}

export const Checkbox = ({ label, name, ...rest }: CheckboxProps) => {
   const { register } = useFormContext();

   return (
      <div className="flex items-center gap-2">
         <input
            type="checkbox"
            {...rest}
            id={label}
            value={label}
            className="appearance-none relative peer size-4 rounded border bg-gray-100 border-gray-300 checked:bg-brandColor-500 checked:border-none cursor-pointer"
            {...register(name)}
         />
         <label htmlFor={label} className="cursor-pointer text-base">
            {label}
         </label>
         <Check
            className="hidden absolute peer-checked:block"
            color="white"
            weight="bold"
            size={15}
         />
      </div>
   );
};
