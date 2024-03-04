import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string;
}

export const Input = (props: InputProps) => {
   const { register } = useFormContext();

   return (
      <input
         className="w-full border-none bg-[#F5F5F5] text-base outline-none"
         id={props.name}
         {...register(props.name)} 
         {...props}
      />
   );
};
