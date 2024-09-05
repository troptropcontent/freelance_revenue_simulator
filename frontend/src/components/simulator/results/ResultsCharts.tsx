import { Box } from "src/components/ui/Box";
import { Tabs } from "src/components/ui/Tabs";
import { RevenueChart } from "./charts/RevenueChart";
import { WeeksChart } from "./charts/WeeksChart";
import { useTranslation } from "react-i18next";

const ResultsCharts = () => {
  const { t } = useTranslation();
  return (
    <Box background="grey.light" borderRadius="md" padding="lg">
      <Tabs.Root defaultValue="value">
        <Tabs.List>
          <Tabs.Trigger value="value">
            {t("simulator.results.charts.value.title")}
          </Tabs.Trigger>
          <Tabs.Trigger value="days">
            {t("simulator.results.charts.days.title")}
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="value">
          <RevenueChart />
        </Tabs.Content>
        <Tabs.Content value="days">
          <WeeksChart />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export { ResultsCharts };
