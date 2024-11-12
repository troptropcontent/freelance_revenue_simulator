import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Box } from "src/components/ui/Box";
import { WeekChart } from "src/components/ui/WeekChart";
import { useAverageWeekChartData } from "./private/hooks";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";
import { cssVariable } from "src/components/helper";
import styled from "styled-components";

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

const AverageWeekChart = () => {
  const {
    values: {
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();
  const { t } = useTranslation();

  const chart_data = useAverageWeekChartData();

  return (
    <Box background="white" padding="md" borderRadius="md">
      <WeekChart
        number_of_days={number_of_days_worked_per_week}
        data={chart_data.details}
        labelFormater={({ label, value }) => (
          <Box flex gap="sm">
            <Text>{label} :</Text>
            <Text weight="bold">{t("common.days", { count: value })}</Text>
          </Box>
        )}
        remainingLabelFormater={(value, color) => (
          <Box flex gap="sm">
            <Label $color={color}>
              <Text weight="bold">{`${t(
                "simulator.results.charts.week_ventilation.available_time_label",
              )} ${t("common.days", { count: value })}`}</Text>
            </Label>
          </Box>
        )}
      />
    </Box>
  );
};

export { AverageWeekChart };
