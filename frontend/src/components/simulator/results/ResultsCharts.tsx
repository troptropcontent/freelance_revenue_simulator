import { RevenueRepartitionChartsGroup } from "./charts/RevenueRepartitionChartsGroup";
import { WeekRepartitionChartsGroup } from "./charts/WeekRepartitionChartsGroup";
import { EnjoymentRateRepartitionChartsGroup } from "./charts/EnjoymentRateRepartitionChartsGroup";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 900px;
  margin-inline: auto;
  border: 2px solid #ecebeb;
  border-radius: 13px;

  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 21px;

  @media only screen and (min-width: 600px) {
    padding: 50px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    & > *:last-child {
      grid-column: 1/-1;
    }
  }

  // & > * {
  //   flex: calc(33.33% - (2 * 40px / 3));
  //   box-sizing: border-box;
  //   min-width: calc(300px - 40px);
  //   max-width: 900px;
  //   margin-inline: auto;
  // }
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
