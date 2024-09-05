import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CustomizedLabel } from "src/components/simulator/results/charts/CustomLabel";
import { ChartColors } from "src/components/simulator/results/charts/private/constants";

import { useRevenueChartData } from "./private/hooks";
const RevenueChart = () => {
  const data = useRevenueChartData();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          outerRadius={150}
          labelLine={false}
          label={CustomizedLabel}
        >
          {data.map((_, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={ChartColors[index % ChartColors.length]}
              />
            );
          })}
        </Pie>
        <Legend layout="vertical" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export { RevenueChart };
