import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { cssVariable } from "../helper";
import { List } from "./List";
import { Box } from "./Box";
import { ReactNode } from "react";

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

interface WeekChartData {
  label: string;
  color: string;
  value: number;
}

const MAXIMUM_NUMBER_OF_DAYS_IN_A_WEEK = 7 as const;

const REMAINING_COLOR = "#ECEBEB" as const;

const Container = styled.div`
  position: relative;
`;

const BackGround = styled.div<{ $number_of_days: number }>`
  display: grid;
  grid-template-columns: ${({ $number_of_days }) =>
    Array($number_of_days).fill("1fr").join(" ")};
  border: 1px dotted;
  border-radius: ${cssVariable("borderRadius.md")};
  height: 170px;

  & > span {
    &: first-child {
      border-left: 0px;
    }
    padding-block-start: ${cssVariable("spacing.md")};
    border-left: 1px dotted;
    text-align: center;
    font-size: ${cssVariable("fonts.size.xs")};
  }
`;

const DataContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  gap: ${cssVariable("spacing.sm")};
`;

const DataItem = styled.div<{ $ratio: number; $color: string }>`
  height: 125px;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: ${({ $ratio }) => $ratio};
  background: ${({ $color }) => $color};
  border-radius: ${cssVariable("borderRadius.md")};
  opacity: 0.6;
`;

const Label = styled.span<{ $color?: string }>`
  display: flex;
  align-items: center;
  &:before {
    display: block;
    content: "";
    width: ${cssVariable("spacing.sm")};
    height: ${cssVariable("spacing.sm")};
    background-color: ${({ $color }) => ($color ? $color : "inherit")};
    border-radius: ${cssVariable("borderRadius.rounded")};
    margin-inline-end: ${cssVariable("spacing.sm")};
  }
`;

const DefaultRemainingLabel = ({ value }: { value: number }) => {
  const { t } = useTranslation();
  return (
    <Label $color={REMAINING_COLOR}>
      {t("simulator.results.charts.week_chart.remaining_days", {
        count: value,
      })}
    </Label>
  );
};

const WeekChart = ({
  data,
  number_of_days,
  labelFormater,
  remainingLabelFormater,
}: {
  data: WeekChartData[];
  number_of_days: number;
  labelFormater?: (element: WeekChartData, data: WeekChartData[]) => ReactNode;
  remainingLabelFormater?: (value: number, color: string) => ReactNode;
}) => {
  const weekdays = useLocalisedDaysOfWeek();

  if (number_of_days > MAXIMUM_NUMBER_OF_DAYS_IN_A_WEEK) {
    throw new Error(
      "The number_of_days props passed to WeekChart is above the MAXIMUM_NUMBER_OF_DAYS_IN_A_WEEK",
    );
  }

  const remaining = data.reduce(
    (acc, element) => acc - element.value,
    number_of_days,
  );

  return (
    <Box flex flexDirection="column" gap="md">
      <Container>
        <BackGround $number_of_days={number_of_days}>
          {weekdays.map((weekday, i) =>
            i < number_of_days ? <span key={weekday}>{weekday}</span> : null,
          )}
        </BackGround>
        <DataContainer>
          {data.map(({ value, color }, i) => (
            <DataItem $ratio={value} $color={color} key={i} />
          ))}
          {Math.round(remaining) > 0 && (
            <DataItem $ratio={remaining} $color={REMAINING_COLOR} />
          )}
        </DataContainer>
      </Container>
      <List.Root gap="sm">
        {data.map(
          (element, i) =>
            element.value != 0 && (
              <Label $color={element.color} key={i}>
                {labelFormater ? labelFormater(element, data) : element.label}
              </Label>
            ),
        )}
        {Math.round(remaining) > 0 &&
          (remainingLabelFormater ? (
            remainingLabelFormater(remaining, REMAINING_COLOR)
          ) : (
            <DefaultRemainingLabel value={remaining} />
          ))}
      </List.Root>
    </Box>
  );
};

export { WeekChart };
