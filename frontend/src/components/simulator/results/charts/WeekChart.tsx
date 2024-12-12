import { useTranslation } from "react-i18next";
import { cssVariable } from "src/components/helper";
import { Box } from "src/components/ui/Box";
import { BuildPaddingStyle } from "src/components/ui/helpers";
import styled from "styled-components";
import { AverageWeekChart } from "./AverageWeekChart";
import { sample } from "lodash";
import { Text } from "src/components/ui/Text";

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
  --border-radius: ${cssVariable("borderRadius.md")};
  --chart-height: 230px;
  --left-space-width-for-rates-label: 60px;
  --enjoyment-rate-heart-tile-size: 35px;

  display: flex;
  flex-direction: column;
  height: var(--chart-height);
  position: relative;
  background: white;
  margin: ${cssVariable("spacing.md")};
  padding-inline-start: var(--left-space-width-for-rates-label);
  border-radius: var(--border-radius);
`;
const BackGround = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Activities = styled.div`
  position: absolute;
  inset: 0;
  padding-block-start: calc(var(--chart-height) / 7 + var(--border-size));
  padding-inline-start: var(--left-space-width-for-rates-label);
  display: flex;
  opacity: 0.8;
`;
const Activity = styled.div<{ $value: number; $color: string }>`
  flex-grow: ${({ $value }) => $value};
  background: ${({ $color }) => $color};

  &:last-child {
    border-bottom-right-radius: var(--border-radius);
  }
  &:first-child {
    border-bottom-left-radius: var(--border-radius);
  }
`;
const EnjoymentRates = styled.div`
  position: absolute;
  inset: 0;
  padding-block-start: calc(var(--chart-height) / 7 + var(--border-size));
  padding-inline-start: var(--left-space-width-for-rates-label);
  display: flex;
`;
const Block = styled.div<{ $width: number; $star?: number }>`
  width: ${({ $width }) => $width * 100}%;
  position: relative;
`;

const Star = styled.div<{ $rate: number }>`
  position: absolute;
  bottom: calc(
    ${({ $rate }) => ($rate / 5) * 100}% - var(--enjoyment-rate-heart-tile-size) /
      2
  );
  left: calc(var(--enjoyment-rate-heart-tile-size) / 2 * -1);
  border-radius: 50%;
  height: var(--enjoyment-rate-heart-tile-size);
  width: var(--enjoyment-rate-heart-tile-size);
  background: white;
  box-shadow: 0 0 2px black;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: "💛";
    font-size: 19px;
    text-align: center;
  }
`;

const Weekdays = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-grow: 1;
  border-radius: 14px;
  border: var(--border-size) dashed var(--border-color);
  box-sizing: border-box;
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
    height: calc(var(--chart-height) / 7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Rates = styled.div`
  position: absolute;
  inset: 0;
  padding-block-start: calc(var(--chart-height) / 7 + var(--border-size));
  display: flex;
  flex-direction: column;
`;
const Rate = styled.div<{ $rate: number }>`
  flex: 1 1 0px;
  margin-inline-start: -4px;
  border-block-start: 2px solid grey;
  position: relative;
  &:before {
    content: "${({ $rate }) => $rate} 💛";
    font-size: 13px;
    position: absolute;
    top: -10px;
    left: -28px;
  }
`;

const sampleData = [
  {
    color: "red",
    value: 2,
    averageEnjoymentRate: 1,
  },
  {
    color: "blue",
    value: 1.5,
    averageEnjoymentRate: 5,
  },
  {
    color: "green",
    value: 1,
    averageEnjoymentRate: 2,
  },
];

const WeekChart = ({ number_of_days = 5 }: { number_of_days: number }) => {
  const weekdays = useLocalisedDaysOfWeek();

  if (number_of_days > MAXIMUM_NUMBER_OF_DAYS_IN_A_WEEK) {
    throw new Error(
      "The number_of_days props passed to WeekChart is above the MAXIMUM_NUMBER_OF_DAYS_IN_A_WEEK",
    );
  }

  const totalNumberOfDays = sampleData.reduce(
    (acc, current) => (acc = acc + current.value),
    0,
  );

  return (
    <Container id="WeekChartContainer">
      <BackGround id="WeekChartBackground">
        <Weekdays>
          {[...Array(number_of_days)].map((_, index) => (
            <Weekday key={index} $weekDay={weekdays[index]} />
          ))}
        </Weekdays>
        <Rates>
          {[...Array(number_of_days)].map((_, index) => (
            <Rate $rate={index + 1} />
          ))}
        </Rates>
      </BackGround>
      <Activities id="WeekChartActivities">
        {sampleData.map((data) => (
          <Activity key={data.value} $color={data.color} $value={data.value} />
        ))}
      </Activities>
      <EnjoymentRates id="WeekChartEnjoymentRates">
        {[
          <Block $width={sampleData[0].value / 2 / totalNumberOfDays} />,
          ...sampleData.slice(0, -1).map((el, i) => (
            <Block
              $width={
                (el.value / 2 + sampleData[i + 1].value / 2) / totalNumberOfDays
              }
            >
              <Star $rate={el.averageEnjoymentRate} />
              <svg height="100%" width="100%">
                <line
                  x1="0%"
                  y1={`${100 - (el.averageEnjoymentRate / 5) * 100}%`}
                  x2="100%"
                  y2={`${100 - (sampleData[i + 1].averageEnjoymentRate / 5) * 100}%`}
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
            </Block>
          )),
          <Block
            $width={
              sampleData[sampleData.length - 1].value / 2 / totalNumberOfDays
            }
          >
            <Star
              $rate={sampleData[sampleData.length - 1].averageEnjoymentRate}
            />
          </Block>,
        ]}
      </EnjoymentRates>
    </Container>
  );
};

export { WeekChart };
