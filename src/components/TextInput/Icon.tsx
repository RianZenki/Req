import { IconProps } from "phosphor-react";
import { ElementType } from "react";
import { twMerge } from "tailwind-merge";

interface IIcon extends IconProps {
   icon: ElementType;
}

export const Icon = ({ icon: Icone, ...rest }: IIcon) => {
   return <Icone {...rest} className={twMerge("ml-4", rest.className)} />;
};
