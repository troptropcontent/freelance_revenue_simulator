import { Trans, useTranslation } from "react-i18next";
import { cssVariable } from "src/components/helper";
import styled from "styled-components";
import { useAverageWeekChartData } from "./private/hooks";
import { useAverageEnjoymentRatePerKindOfActivity } from "../private/hooks";
import { UNRATED_COLOR } from "src/components/ui/formik/primitives/constants";
import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";

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
  --chart-weekdays-height: 60px;
  --left-space-width-for-rates-label: 38px;
  --enjoyment-rate-heart-tile-size: 35px;

  display: flex;
  flex-direction: column;
  height: var(--chart-height);
  position: relative;
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
  padding-block-start: calc(var(--chart-weekdays-height) + var(--border-size));
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
  padding-block-start: calc(var(--chart-weekdays-height) + var(--border-size));
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
    height: var(--chart-weekdays-height);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Rates = styled.div`
  position: absolute;
  inset: 0;
  padding-block-start: calc(var(--chart-weekdays-height) + var(--border-size));
  display: flex;
  flex-direction: column;
`;
const Rate = styled.div<{ $rate: number }>`
  flex: 1 1 0px;
  margin-inline-start: -16px;
  border-block-start: 1px solid grey;
  position: relative;
  &:before {
    content: "${({ $rate }) => $rate} 💛";
    font-size: 13px;
    position: absolute;
    top: -10px;
    left: -30px;
  }
`;

const Label = styled.div<{ $color: string }>`
  --point-size: 13px;
  display: flex;
  align-items: center;
  gap: 10px;
  &:before {
    display: block;
    content: " ";
    height: var(--point-size);
    width: var(--point-size);
    border-radius: 50%;
    background: ${({ $color }) => $color};
  }
`;

const WeekChart = () => {
  const weekdays = useLocalisedDaysOfWeek();
  const {
    values: {
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();
  const { t } = useTranslation();
  const { base_data } = useAverageWeekChartData();
  const averageEnjoymentRateChartData =
    useAverageEnjoymentRatePerKindOfActivity();
  const chartData = base_data.map((data) => ({
    ...data,
    averageEnjoymentRate: averageEnjoymentRateChartData.find(
      (e) => e.type == data.type,
    )?.averageEnjoymentRate,
  }));

  if (number_of_days_worked_per_week > MAXIMUM_NUMBER_OF_DAYS_IN_A_WEEK) {
    throw new Error(
      "The number_of_days props passed to WeekChart is above the MAXIMUM_NUMBER_OF_DAYS_IN_A_WEEK",
    );
  }

  const totalNumberOfDays = chartData.reduce(
    (acc, current) => (acc = acc + current.value),
    0,
  );

  const remainingDays = number_of_days_worked_per_week - totalNumberOfDays;

  return (
    <Box flex flexDirection="column" gap={25}>
      <Text style="subtitle_n1" align="center">
        {t("simulator.results.charts.enjoyment_ventilation.title")}
      </Text>
      <Box
        background="white"
        borderRadius={"md"}
        padding={30}
        flex
        flexDirection="column"
        gap={25}
        blured={totalNumberOfDays == 0}
      >
        <Container id="WeekChartContainer">
          <BackGround id="WeekChartBackground">
            <Weekdays>
              {[...Array(number_of_days_worked_per_week)].map((_, index) => (
                <Weekday key={index} $weekDay={weekdays[index]} />
              ))}
            </Weekdays>
            <Rates>
              {[...Array(number_of_days_worked_per_week)].map((_, index) => (
                <Rate $rate={index + 1} />
              ))}
            </Rates>
          </BackGround>
          <Activities id="WeekChartActivities">
            {chartData.map((data, i) => (
              <Activity key={i} $color={data.color} $value={data.value} />
            ))}
            {remainingDays > 0 && (
              <Activity
                key="remaining-activity"
                $color={UNRATED_COLOR}
                $value={remainingDays}
              />
            )}
          </Activities>
          <EnjoymentRates id="WeekChartEnjoymentRates">
            {chartData.length > 0 && [
              <Block
                key="first-block"
                $width={chartData[0].value / 2 / number_of_days_worked_per_week}
              />,
              ...chartData.slice(0, -1).map((el, i) => (
                <Block
                  key={`block-${i}`}
                  $width={
                    (el.value / 2 + chartData[i + 1].value / 2) / number_of_days_worked_per_week
                  }
                >
                  <Star $rate={el.averageEnjoymentRate} />
                  <svg height="100%" width="100%">
                    <line
                      x1="0%"
                      y1={`${100 - (el.averageEnjoymentRate / 5) * 100}%`}
                      x2="100%"
                      y2={`${100 - (chartData[i + 1].averageEnjoymentRate / 5) * 100}%`}
                      stroke="black"
                    />
                  </svg>
                </Block>
              )),
              <Block
                $width={
                  chartData[chartData.length - 1].value / 2 / number_of_days_worked_per_week
                }
              >
                <Star
                  $rate={chartData[chartData.length - 1].averageEnjoymentRate}
                />
              </Block>,
              ...[
                remainingDays > 0 ? (
                  <Block
                    key="remaining-block"
                    $width={remainingDays / number_of_days_worked_per_week}
                  />
                ) : null,
              ],
            ]}
          </EnjoymentRates>
        </Container>
        <Box flex gap={12} justifyContent="center">
          {chartData.map((data) => (
            <Label $color={data.color}>
              <Text style="text_in_charts">
                <Trans
                  i18nKey={`simulator.results.charts.week_ventilation.label`}
                  values={{
                    days: t("common.days", { count: data.value }),
                    kind: t(`simulator.activities.kinds.${data.type}.title`),
                  }}
                  components={{ b: <strong /> }}
                />
              </Text>
            </Label>
          ))}
          {
            remainingDays > 0 && <Label $color={UNRATED_COLOR}>
            <Text style="text_in_charts">
              <Trans
                i18nKey={`simulator.results.charts.week_ventilation.remaining_days`}
                count={remainingDays}
                components={{ b: <strong /> }}
              />
            </Text>
          </Label>
          }
        </Box>
      </Box>
    </Box>
  );
};

export { WeekChart };
