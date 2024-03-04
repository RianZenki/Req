import { IconProps } from "phosphor-react";
import { ElementType } from "react";

interface IIcon extends IconProps {
   icon: ElementType;
}

export const Icon = ({ icon: Icone, ...rest }: IIcon) => {
   return <Icone className="ml-4" {...rest} />;
};
