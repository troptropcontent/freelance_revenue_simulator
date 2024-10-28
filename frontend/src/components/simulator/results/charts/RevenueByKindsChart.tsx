import { Box } from "src/components/ui/Box";
import { PieChart } from "src/components/ui/PieChart";
import { useRevenueByKindChartData } from "./private/hooks";
import { Text } from "src/components/ui/Text";
import { ActivityKindEmoji } from "../../constants";

const RevenueByKindsChart = () => {
  const { total, details } = useRevenueByKindChartData();

  return total != 0 ? (
    <Box background="white" padding="md" borderRadius="md">
      <PieChart
        data={details}
        title={`${Math.round((total / 1000) * 10) / 10}K€`}
        labelFormater={({ label, value }) => (
          <>
            <data>{`${Math.round((value / 1000) * 10) / 10}K€`}</data>
            <Text>{label}</Text>
          </>
        )}
      />
    </Box>
  ) : null;
};

export { RevenueByKindsChart };
