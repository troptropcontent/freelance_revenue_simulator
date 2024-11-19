import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import { EnjoymentChart } from "./EnjoymentChart";
import { useTranslation } from "react-i18next";
import { useTotalNumberOfDaysAvailablePerWeek } from "../private/hooks";

const EnjoymentRateRepartitionChartsGroup = () => {
  const { t } = useTranslation();
  const total_number_of_days_available_per_week =
    useTotalNumberOfDaysAvailablePerWeek();
  return (
    <Box flex flexDirection="column" gap={25} blured={Math.round(total_number_of_days_available_per_week) < 0}>
      <Text style="subtitle_n1" align="center">
        {t("simulator.results.charts.enjoyment_ventilation.title")}
      </Text>
      <EnjoymentChart />
    </Box>
  );
};

export { EnjoymentRateRepartitionChartsGroup };
