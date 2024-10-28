import { Box } from "src/components/ui/Box";
import { RevenueByKindsChart } from "./charts/RevenueByKindsChart";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";
import { RevenueByActivityChart } from "./charts/RevenueByActivityChart";
import styled from "styled-components";
import { cssVariable } from "src/components/helper";
import { Collapsible } from "src/components/ui/Collapsible";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useShouldDisplayResultCharts } from "./private/hooks";
import { AverageWeekChart } from "./charts/AverageWeekChart";
import { EnjoymentChart } from "./charts/EnjoymentChart";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${cssVariable("spacing.md")};
`;
const ResultsCharts = () => {
  const { t } = useTranslation();
  const should_display_result_charts = useShouldDisplayResultCharts();
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  useEffect(() => {
    if (!should_display_result_charts && collapsibleOpen)
      setCollapsibleOpen(false);
  }, [should_display_result_charts, collapsibleOpen]);

  return (
    <Collapsible.Root
      open={collapsibleOpen}
      onOpenChange={setCollapsibleOpen}
      disabled={!should_display_result_charts}
    >
      <Collapsible.Trigger>
        <Box
          flex
          gap="md"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            weight="bold"
            size="md"
            color={should_display_result_charts ? undefined : "primary.light"}
          >
            {t(
              `simulator.results.collapsible.${collapsibleOpen ? "open" : "closed"}`,
            )}
          </Text>
          {collapsibleOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </Box>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Box flex flexDirection="column" gap="lg" padding="md">
          <Text size="md" weight="bold" align="center">
            {t("simulator.results.charts.revenue_ventilation.title")}
          </Text>
          <StyledContainer>
            <RevenueByKindsChart />
            <RevenueByActivityChart />
          </StyledContainer>
          <Text size="md" weight="bold" align="center">
            {t("simulator.results.charts.week_ventilation.title")}
          </Text>
          <AverageWeekChart />
          <Text size="md" weight="bold" align="center">
            {t("simulator.results.charts.enjoyment_ventilation.title")}
          </Text>
          <EnjoymentChart />
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export { ResultsCharts };
