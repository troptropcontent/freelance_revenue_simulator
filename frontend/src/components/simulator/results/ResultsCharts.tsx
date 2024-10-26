import { Box } from "src/components/ui/Box";
import { RevenueByKindsChart } from "./charts/RevenueByKindsChart";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";

const ResultsCharts = () => {
  const { t } = useTranslation();
  return (
    <Box flex flexDirection="column" gap="md">
      <Text size="md" weight="bold" align="center">
        {t("simulator.results.charts.revenue_ventilation.title")}
      </Text>
      <Box flex gap="md">
        <RevenueByKindsChart />
        <RevenueByKindsChart />
      </Box>
    </Box>
  );
};

export { ResultsCharts };
