import { Box } from "src/components/ui/Box";
import { Tabs } from "src/components/ui/Tabs";
import { RevenueChart } from "./charts/RevenueChart";
import { WeeksChart } from "./charts/WeeksChart";

const ResultsCharts = () => {
  return (
    <Box background="grey.light" borderRadius="md" padding="lg">
      <Tabs.Root defaultValue="value">
        <Tabs.List>
          <Tabs.Trigger value="value">Valeur</Tabs.Trigger>
          <Tabs.Trigger value="days">Jours</Tabs.Trigger>
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
