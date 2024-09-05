import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CustomizedLabel } from "src/components/simulator/results/charts/CustomLabel";
import { ChartColors } from "src/components/simulator/results/charts/private/constants";
import { useTimeChartData } from "./private/hooks";
const WeeksChart = () => {
  const data = useTimeChartData();

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
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={ChartColors[index % ChartColors.length]}
            />
          ))}
        </Pie>
        <Legend layout="vertical" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export { WeeksChart };
