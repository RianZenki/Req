import { CheckCircle, Warning, WarningCircle } from "phosphor-react";

interface AlertProps {
   text: string;
   type: "success" | "error" | "warning";
}

interface StyleComponentProps {
   bgColor: string;
   barColor: string;
   icon: any;
}

export const Alert = ({ text, type }: AlertProps) => {
   let stylesComponent = {} as StyleComponentProps;

   if (type === "success") {
      stylesComponent = {
         bgColor: "#2E7D32",
         barColor: "#8EEB93",
         icon: <CheckCircle size={32} color={"#ffffff"} />,
      };
   } else if (type === "error") {
      stylesComponent = {
         bgColor: "#D32F2F",
         barColor: "#FD9999",
         icon: <WarningCircle size={32} color={"#ffffff"} />,
      };
   } else if (type === "warning") {
      stylesComponent = {
         bgColor: "#ED6C02",
         barColor: "#FFA459",
         icon: <Warning size={32} color={"#ffffff"} />,
      };
   }

   return (
      <div
         className="flex flex-col rounded w-[700px] absolute top-6 left-[50%] -translate-x-1/2 opacity-100 z-[60]"
         style={{ backgroundColor: stylesComponent.bgColor }}
      >
         <div className="flex items-center py-4 px-8 gap-2">
            {stylesComponent.icon}
            <p className="text-white">{text}</p>
         </div>
         <div
            className="w-full h-1 rounded-bl-sm animate-progress-bar-decreasing"
            style={{ backgroundColor: stylesComponent.barColor }}
         ></div>
      </div>
   );
};
