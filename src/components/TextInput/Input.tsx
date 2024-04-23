import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string;
}

export const Input = (props: InputProps) => {
   const { register } = useFormContext();

   return (
      <input
         {...props}
         className={twMerge(
            "w-full p-4 border-none rounded bg-[#F5F5F5] text-base outline-none",
            props.className
         )}
         id={props.name}
         {...register(props.name)}
      />
   );
};
