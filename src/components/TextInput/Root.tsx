import { HTMLAttributes } from "react";

interface RootProps extends HTMLAttributes<HTMLDivElement> {}

export const Root = (props: RootProps) => {
   return <div className="flex flex-col flex-1 relative" {...props} />;
};
