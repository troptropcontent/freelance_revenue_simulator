import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useRevenueAnalysis } from "src/components/simulator/results/hooks";
import { CustomizedLabel } from "src/components/simulator/results/charts/CustomLabel";
import { ChartColors } from "src/components/simulator/results/charts/private/constants";
import { formatLegendLabelCurrency } from "src/components/simulator/results/charts/private/helpers";
import { prepareData } from "src/components/simulator/results/charts/private/utils";
const RevenueChart = () => {
  const { annualTurnoverPerActivities } = useRevenueAnalysis();

  const data = prepareData(annualTurnoverPerActivities);

  return (
    <ResponsiveContainer width={400} height={400}>
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
        <Legend
          layout="vertical"
          verticalAlign="bottom"
          align="center"
          formatter={formatLegendLabelCurrency}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export { RevenueChart };
