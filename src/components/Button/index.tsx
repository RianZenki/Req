import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {
   variant?: "solid" | "outline" | "link";
}

export const Button = ({
   children,
   variant = "solid",
   ...rest
}: ButtonProps) => {
   const variantStyles = {
      solid: "bg-brandColor-700 text-white hover:bg-[#2672f9] shadow",
      outline:
         "bg-transparent border border-brandColor-700 text-brandColor-700 shadow",
      link: "bg-transparent text-brandColor-700",
   };

   return (
      <button
         {...rest}
         className={twMerge(
            `w-[200px] h-12 px-5 py-4 rounded transition flex items-center justify-center gap-2`,
            variantStyles[variant],
            rest.className
         )}
      >
         {children}
      </button>
   );
};
