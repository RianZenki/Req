import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
} from "recharts";
import { IData } from "..";

interface IRequestQuantityChart extends Partial<IData> {}

export const RequestQuantityChart = ({
   solicitacoesDosSeisMeses,
}: IRequestQuantityChart) => {
   return (
      <section className="flex flex-col gap-8 p-8 w-[60%] bg-zinc-100 rounded-lg">
         <h2 className="text-xl font-bold">Solicitações nos últimos 6 mesês</h2>
         <ResponsiveContainer width="100%" maxHeight={300}>
            <AreaChart
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
         </ResponsiveContainer>
      </section>
   );
};
