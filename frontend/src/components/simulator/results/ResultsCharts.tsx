import { RevenueRepartitionChartsGroup } from "./charts/RevenueRepartitionChartsGroup";
import { WeekRepartitionChartsGroup } from "./charts/WeekRepartitionChartsGroup";
import { EnjoymentRateRepartitionChartsGroup } from "./charts/EnjoymentRateRepartitionChartsGroup";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  border: 2px solid #ecebeb;
  border-radius: 13px;
  padding: 50px;

  & > * {
    flex: calc(33.33% - (2 * 40px / 3));
    box-sizing: border-box;
    min-width: calc(400px - 40px);
    max-width: 900px;
    margin-inline: auto;
  }
`;

const ResultsCharts = () => {
  return (
    <StyledContainer>
      <RevenueRepartitionChartsGroup />
      <WeekRepartitionChartsGroup />
      <EnjoymentRateRepartitionChartsGroup />
    </StyledContainer>
  );
};

export { ResultsCharts };
