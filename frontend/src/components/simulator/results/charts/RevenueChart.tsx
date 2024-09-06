import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CustomizedLabel } from "src/components/simulator/results/charts/CustomLabel";
import { ChartColors, ChartHeight } from "src/components/simulator/results/charts/private/constants";

import { useRevenueChartData } from "./private/hooks";
import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";
const RevenueChart = () => {
  const {t} = useTranslation()
  const data = useRevenueChartData();

  return data.length == 0 ? (
    <Box height={ChartHeight} flex flexDirection="column" justifyContent="center" alignItems="center">
      <Text weight="bold" size="sm">{t("simulator.results.charts.value.no_data_title")}</Text>
      <Text>{t("simulator.results.charts.value.no_data_description")}</Text>
    </Box>
  ) : (
    <ResponsiveContainer width="100%" height={ChartHeight}>
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
