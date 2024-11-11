import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";
import { AverageWeekChart } from "./charts/AverageWeekChart";
import { EnjoymentChart } from "./charts/EnjoymentChart";
import { RevenueRepartitionChartsGroup } from "./charts/RevenueRepartitionChartsGroup";
import { WeekRepartitionChartsGroup } from "./charts/WeekRepartitionChartsGroup";
import { EnjoymentRateRepartitionChartsGroup } from "./charts/EnjoymentRateRepartitionChartsGroup";
import styled from "styled-components";
import { cssVariable } from "src/components/helper";

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${cssVariable("spacing.sm")};

  & > * {
    flex: calc(33.33% - (2 * ${cssVariable("spacing.sm")} / 3));
    box-sizing: border-box;
    min-width: calc(400px - ${cssVariable("spacing.sm")});
    max-width: 900px;
    margin-inline: auto;
  }
`;

const ResultsCharts = () => {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <RevenueRepartitionChartsGroup />
      <WeekRepartitionChartsGroup />
      <EnjoymentRateRepartitionChartsGroup />
    </StyledContainer>
  );
};

export { ResultsCharts };
