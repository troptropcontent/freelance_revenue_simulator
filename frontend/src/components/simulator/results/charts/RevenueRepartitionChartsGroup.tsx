import { cssVariable, mediaQueries } from "src/components/helper";
import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import styled from "styled-components";
import { RevenueByKindsChart } from "./RevenueByKindsChart";
import { RevenueByActivityChart } from "./RevenueByActivityChart";
import { useTranslation } from "react-i18next";

const StyledContainer = styled.div`
  display: flex;
  gap: ${cssVariable("spacing.md")};

  flex-direction: column;

  ${mediaQueries("md")`
    flex-direction: row;
    & > * {
      flex: 1 1 0px;
    }
  `}
`;

const RevenueRepartitionChartsGroup = () => {
  const { t } = useTranslation();
  return (
    <Box flex flexDirection="column" gap={25}>
      <Text style="subtitle_n1" align="center">
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
