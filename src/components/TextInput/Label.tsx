import { LabelHTMLAttributes } from "react";

export const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
   return <label className="text-base mb-4" {...props} />;
};
