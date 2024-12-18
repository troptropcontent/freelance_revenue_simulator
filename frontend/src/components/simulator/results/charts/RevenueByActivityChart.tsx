import { Box } from "src/components/ui/Box";
import { PieChart } from "src/components/ui/PieChart";
import { useRevenueByActivityChartData } from "./private/hooks";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";

const RevenueByActivityChart = () => {
  const { total, details } = useRevenueByActivityChartData();
  const { t } = useTranslation();

  const chart_data: typeof details =
    total != 0
      ? details
      : [
          {
            kind: "freelancing",
            color: "#ECEBEB",
            value: 1,
            label: t(
              "simulator.results.charts.revenue_ventilation.unstarted_label",
            ),
          },
        ];

  return (
    <Box
      background="white"
      padding="md"
      borderRadius="md"
      flex
      flexDirection="column"
    >
      <PieChart
        data={chart_data}
        title={`${Math.round((total / 1000) * 10) / 10}K€`}
        labelFormater={({ label, value }) => {
            let label_value = Math.round((value / total) * 100);
            if (!isFinite(label_value)) {
              label_value = 100;
            }
          return (<Box padding={{ left: 10 }} flex gap={10} alignItems="center">
            <Text style="text_in_charts_semibold">{`${label_value}%`}</Text>
            <Text style="text_in_charts">{label}</Text>
          </Box>)
        }}
      />
    </Box>
  );
};

export { RevenueByActivityChart };
