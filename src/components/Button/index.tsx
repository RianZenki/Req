import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {}

export const Button = ({ children, ...rest }: ButtonProps) => {
   return (
      <button
         {...rest}
         className={twMerge(
            `w-[200px] h-12 px-5 py-4 rounded bg-brandColor-700 text-white transition hover:bg-[#2672f9] flex items-center justify-center gap-2`,
            rest.className
         )}
      >
         {children}
      </button>
   );
};
