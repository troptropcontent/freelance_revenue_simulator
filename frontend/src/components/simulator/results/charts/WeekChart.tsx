import { useTranslation } from "react-i18next";
import { cssVariable } from "src/components/helper";
import { Box } from "src/components/ui/Box";
import { BuildPaddingStyle } from "src/components/ui/helpers";
import styled from "styled-components";

const MAXIMUM_NUMBER_OF_DAYS_IN_A_WEEK = 7 as const;

const useLocalisedDaysOfWeek = (): string[] => {
  const {
    i18n: { language },
  } = useTranslation();

  const weekdays = [];
  const baseDate = new Date(Date.UTC(2024, 10, 4)); // Starting from a known Monday

  for (let i = 0; i < 7; i++) {
    const day = new Date(baseDate);
    day.setDate(baseDate.getDate() + i);
    weekdays.push(day.toLocaleDateString(language, { weekday: "long" }));
  }

  return weekdays;
};

const Container = styled.div`
  --border-color: ${cssVariable("color.border.neutral.dark")};
  --border-size: ${cssVariable("border.sm")};


  display: flex;
  flex-direction: column;
  height: 230px;
  position: relative;
  background: white;
  ${BuildPaddingStyle("medium")};
  border-radius: 14px;
`;
const BackGround = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const Activities = styled.div`
  position: absolute;
`;
const EnjoymentRates = styled.div`
  position: absolute;
`;
const Weekdays = styled.div`
  display: flex;
  flex-grow: 1;
  border: var(--border-size) dashed var(--border-color);
  border-radius: 14px;
`;
const Weekday = styled.div<{ $weekDay: string }>`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
  align-items: center;

  border-inline-start: var(--border-size) dashed var(--border-color);

  &:first-child {
    border-inline-start: none;
  }

  &:before {
    content: "${({ $weekDay }) => $weekDay}";
    ${BuildPaddingStyle({inline: "small", block: "small"})}
  }
`;

const WeekChart = ({ number_of_days = 5 }: { number_of_days: number }) => {
  const weekdays = useLocalisedDaysOfWeek();

  if (number_of_days > MAXIMUM_NUMBER_OF_DAYS_IN_A_WEEK) {
    throw new Error(
      "The number_of_days props passed to WeekChart is above the MAXIMUM_NUMBER_OF_DAYS_IN_A_WEEK",
    );
  }

  return (
    <Container id="WeekChartContainer">
      <BackGround id="WeekChartBackground">
        <Weekdays>
          {[...Array(number_of_days)].map((_, index) => (
            <Weekday key={index} $weekDay={weekdays[index]} />
          ))}
        </Weekdays>
      </BackGround>
      <Activities id="WeekChartActivities">Activities</Activities>
      <EnjoymentRates id="WeekChartEnjoymentRates">
        EnjoymentRates
      </EnjoymentRates>
    </Container>
  );
};

export { WeekChart };
