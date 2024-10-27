import { Box } from "src/components/ui/Box";
import { PieChart } from "src/components/ui/PieChart";
import { useRevenueByActivityChartData } from "./private/hooks";
import { Text } from "src/components/ui/Text";

const RevenueByActivityChart = () => {
  const { total, details } = useRevenueByActivityChartData();

  return total != 0 ? (
    <Box
      background="white"
      padding="md"
      borderRadius="md"
      flex
      flexDirection="column"
    >
      <PieChart
        data={details}
        title={`${Math.round((total / 1000) * 10) / 10}K€`}
        labelFormater={({ label, value }) => (
          <>
            <data>{`${Math.round((value / total) * 100 * 10) / 10}%`}</data>
            <Text>{label}</Text>
          </>
        )}
      />
    </Box>
  ) : null;
};

export { RevenueByActivityChart };
