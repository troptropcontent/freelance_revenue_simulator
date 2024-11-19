import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import { AverageWeekChart } from "./AverageWeekChart";
import { useTranslation } from "react-i18next";

const WeekRepartitionChartsGroup = () => {
  const { t } = useTranslation();
  return (
    <Box flex flexDirection="column" gap={25}>
      <Text style="subtitle_n1" align="center">
        {t("simulator.results.charts.week_ventilation.title")}
      </Text>
      <AverageWeekChart />
    </Box>
  );
};

export { WeekRepartitionChartsGroup };
