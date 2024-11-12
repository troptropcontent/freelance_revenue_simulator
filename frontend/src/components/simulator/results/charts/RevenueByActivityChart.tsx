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
            label: t(`simulator.activities.freelance_daily_rate.label`),
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
          let label_value = Math.round((value / total) * 100 * 10) / 10;
          if (!isFinite(label_value)) {
            label_value = 100;
          }
          return (
            <>
              <data>{`${label_value}%`}</data>
              <Text>{label}</Text>
            </>
          );
        }}
      />
    </Box>
  );
};

export { RevenueByActivityChart };
