import { RevenueRepartitionChartsGroup } from "./charts/RevenueRepartitionChartsGroup";
import { WeekRepartitionChartsGroup } from "./charts/WeekRepartitionChartsGroup";
import { EnjoymentRateRepartitionChartsGroup } from "./charts/EnjoymentRateRepartitionChartsGroup";
import styled from "styled-components";
import { mediaQueries } from "src/components/helper";
import { WeekChart } from "./charts/WeekChart";

const StyledContainer = styled.div`
  max-width: 1200px;
  width: -webkit-fill-available;
  border: 2px solid #ecebeb;
  border-radius: 13px;

  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 21px;
`;

const ResultsCharts = () => {
  return (
    <StyledContainer>
      <RevenueRepartitionChartsGroup />
      <WeekChart />
    </StyledContainer>
  );
};

export { ResultsCharts };
