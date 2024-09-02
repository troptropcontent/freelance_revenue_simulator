import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  PieLabel,
} from "recharts";
import { useRevenueAnalysis, useWorkedWeekAnalysis } from "./hooks";
import { Activities } from "../constants";
import { useState } from "react";
import { Box } from "src/components/ui/Box";
import { Formatter as LegendFormatter } from "recharts/types/component/DefaultLegendContent";

const ChartColors = [
  "#5a2900", // darkest
  "#8b3e00", // darker
  "#d35400", // dark
  "#ea8a5e", // mediumDark
  "#eda46b", // medium
  "#f0be78", // mediumLight
  "#f3d885", // lightDark
  "#f6f292", // light
  "#f9fc9f", // lighter
  "#fcffac", // lightest
] as const;

const RADIAN = Math.PI / 180;
const CustomizedLabel: PieLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
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

const formatLegendLabelCurrency: LegendFormatter = (value, entry) => {
  const data = entry?.payload?.value;

  if (!data) {
    return null;
  }

  return `${value} ( ${data.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  })} )`;
};

const formatLegendLabelDays: LegendFormatter = (value, entry) => {
  const data = entry?.payload?.value;

  if (!data) {
    return null;
  }

  return `${value} ( ${data.toLocaleString("fr-FR", {
    maximumFractionDigits: 1,
  })} ) jours`;
};

const ResultsCharts = () => {
  const [showResultsByRevenue] = useState(true);
  const { daysUsedPerWeekPerActivities } = useWorkedWeekAnalysis();
  const { annualTurnoverPerActivities } = useRevenueAnalysis();
  const baseData = showResultsByRevenue
    ? annualTurnoverPerActivities
    : daysUsedPerWeekPerActivities;

  const filteredData = Object.entries(baseData)
    .filter((keyValue) => keyValue[1] > 0)
    .sort((a, b) => b[1] - a[1]);

  const data = filteredData.map(([key, value]) => ({
    id: key,
    value,
    name: Activities[key as keyof typeof Activities].label,
  }));

  if (data.length <= 1) {
    return null;
  }

  return (
    <Box>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            fill="#8884d8"
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
            formatter={
              showResultsByRevenue
                ? formatLegendLabelCurrency
                : formatLegendLabelDays
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export { ResultsCharts };
