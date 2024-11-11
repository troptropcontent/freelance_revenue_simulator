import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import { EnjoymentChart } from "./EnjoymentChart";
import { useTranslation } from "react-i18next";

const EnjoymentRateRepartitionChartsGroup = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Text style="subtitle_1" align="center">
        {t("simulator.results.charts.enjoyment_ventilation.title")}
      </Text>
      <EnjoymentChart />
    </Box>
  );
};

export { EnjoymentRateRepartitionChartsGroup };
