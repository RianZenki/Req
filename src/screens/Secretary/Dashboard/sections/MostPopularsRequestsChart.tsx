import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { IData } from "..";

interface IMostPopularRequests extends Partial<IData> {}

export const MostPopularsRequestsChart = ({
   tiposMaisRepetidos,
}: IMostPopularRequests) => {
   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#E78AF0"];
   const RADIAN = Math.PI / 180;

   const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
   }: any) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
         <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
         >
            {`${(percent * 100).toFixed(0)}%`}
         </text>
      );
   };

   return (
      <section className="flex flex-col gap-8 p-8 w-fit bg-zinc-100 rounded-lg">
         <h2 className="text-xl font-bold">
            Solicitações populares dos últimos 6 mesês
         </h2>
         <PieChart width={400} height={400}>
            <Pie
               data={tiposMaisRepetidos}
               cx="55%"
               cy="50%"
               labelLine={false}
               label={renderCustomizedLabel}
               outerRadius={100}
               fill="#8884d8"
               dataKey="quantidade"
            >
               {tiposMaisRepetidos!.map((_, index) => (
                  <Cell
                     key={`cell-${index}`}
                     fill={COLORS[index % COLORS.length]}
                  />
               ))}
            </Pie>
            <Tooltip />
            <Legend />
         </PieChart>
      </section>
   );
};
