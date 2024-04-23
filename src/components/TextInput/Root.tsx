import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface RootProps extends HTMLAttributes<HTMLDivElement> {}

export const Root = (props: RootProps) => {
   return (
      <div
         {...props}
         className={twMerge("flex flex-col flex-1 relative", props.className)}
      />
   );
};
