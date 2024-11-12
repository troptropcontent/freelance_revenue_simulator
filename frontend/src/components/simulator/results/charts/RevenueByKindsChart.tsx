import { Box } from "src/components/ui/Box";
import { PieChart } from "src/components/ui/PieChart";
import { useRevenueByKindChartData } from "./private/hooks";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";
import { ActivityKindEmoji } from "../../constants";

const RevenueByKindsChart = () => {
  const { total, details } = useRevenueByKindChartData();
  const { t } = useTranslation();
  const chart_data: typeof details =
    total != 0
      ? details
      : [
          {
            type: "freelancing",
            color: "#ECEBEB",
            value: 1,
            label:
              ActivityKindEmoji["freelancing"] +
              t(`simulator.activities.kinds.freelancing.title`),
          },
        ];

  return (
    <Box background="white" padding="md" borderRadius="md">
      <PieChart
        data={chart_data}
        title={`${Math.round((total / 1000) * 10) / 10}K€`}
        labelFormater={({ label, value }) => (
          <>
            <data>{`${Math.round((value / 1000) * 10) / 10}K€`}</data>
            <Text>{label}</Text>
          </>
        )}
      />
    </Box>
  );
};

export { RevenueByKindsChart };
