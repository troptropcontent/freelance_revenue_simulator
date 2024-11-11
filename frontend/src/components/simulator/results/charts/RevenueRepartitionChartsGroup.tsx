import { cssVariable } from "src/components/helper";
import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import styled from "styled-components";
import { RevenueByKindsChart } from "./RevenueByKindsChart";
import { RevenueByActivityChart } from "./RevenueByActivityChart";
import { useTranslation } from "react-i18next";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${cssVariable("spacing.md")};
`;

const RevenueRepartitionChartsGroup = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Text style="subtitle_1" align="center">
        {t("simulator.results.charts.revenue_ventilation.title")}
      </Text>
      <StyledContainer>
        <RevenueByKindsChart />
        <RevenueByActivityChart />
      </StyledContainer>
    </Box>
  );
};

export { RevenueRepartitionChartsGroup };
