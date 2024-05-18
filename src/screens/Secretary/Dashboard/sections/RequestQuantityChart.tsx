import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
} from "recharts";
import { IData } from "..";

interface IRequestQuantityChart extends Partial<IData> {}

export const RequestQuantityChart = ({
   solicitacoesDosSeisMeses,
}: IRequestQuantityChart) => {
   return (
      <section className="flex flex-col gap-8 p-8 w-fit bg-zinc-100 rounded-lg">
         <h2 className="text-xl font-bold">Solicitações nos últimos 6 mesês</h2>
         <AreaChart
            width={800}
            height={400}
            data={solicitacoesDosSeisMeses}
            margin={{
               top: 10,
               right: 30,
               left: 0,
               bottom: 0,
            }}
         >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
               type="monotone"
               dataKey="quantidade"
               stroke="rgb(96 165 250)"
               fill="rgb(96 165 250)"
            />
         </AreaChart>
      </section>
   );
};
