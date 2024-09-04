import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useWorkedWeekAnalysis } from "src/components/simulator/results/hooks";
import { CustomizedLabel } from "src/components/simulator/results/charts/CustomLabel";
import { ChartColors } from "src/components/simulator/results/charts/private/constants";
import { formatLegendLabelDays } from "src/components/simulator/results/charts/private/helpers";
import { prepareData } from "src/components/simulator/results/charts/private/utils";
const WeeksChart = () => {
  const { daysUsedPerWeekPerActivities, daysAvailablePerWeek } = useWorkedWeekAnalysis();

  const baseData = prepareData(daysUsedPerWeekPerActivities);

  const dataWithAvailableTime = daysAvailablePerWeek > 0 ? [
    ...baseData,
    {
      id: "available",
        value: daysAvailablePerWeek,
        name: "Temps disponible",
      },
    ]
    : baseData;

  console.log({ dataWithAvailableTime });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={dataWithAvailableTime}
          outerRadius={150}
          labelLine={false}
          label={CustomizedLabel}
        >
          {dataWithAvailableTime.map((_, index) => (
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
          formatter={formatLegendLabelDays}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export { WeeksChart };
