import { Box } from "src/components/ui/Box";
import { RevenueByKindsChart } from "./charts/RevenueByKindsChart";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";
import { RevenueByActivityChart } from "./charts/RevenueByActivityChart";
import styled from "styled-components";
import { cssVariable } from "src/components/helper";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${cssVariable("spacing.md")};
`;
const ResultsCharts = () => {
  const { t } = useTranslation();

  return (
    <Box flex flexDirection="column" gap="md">
      <Text size="md" weight="bold" align="center">
        {t("simulator.results.charts.revenue_ventilation.title")}
      </Text>
      <StyledContainer>
        <RevenueByKindsChart />
        <RevenueByActivityChart />
      </StyledContainer>
    </Box>
  );
};

export { ResultsCharts };
