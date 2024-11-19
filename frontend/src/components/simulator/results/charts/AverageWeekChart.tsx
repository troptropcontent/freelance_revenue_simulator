import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Box } from "src/components/ui/Box";
import { WeekChart, WeekChartData } from "src/components/ui/WeekChart";
import { useAverageWeekChartData } from "./private/hooks";
import { Text } from "src/components/ui/Text";
import { Trans, useTranslation } from "react-i18next";

const AverageWeekChart = () => {
  const {
    values: {
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();
  const { t } = useTranslation();

  const { base_data } = useAverageWeekChartData();

  const chart_data: WeekChartData[] = base_data.map((element) => {
    return {
      color: element.color,
      value: element.value,
      label: (
        <Text style="text_in_charts">
          <Trans
            i18nKey={`simulator.results.charts.week_chart.labels.${element.type}`}
            values={{ days: t("common.days", { count: element.value }) }}
            components={{ b: <strong /> }}
          />
        </Text>
      ),
    };
  });

  return (
    <Box background="white" padding="md" borderRadius="md">
      <WeekChart
        number_of_days={number_of_days_worked_per_week}
        data={chart_data}
      />
    </Box>
  );
};

export { AverageWeekChart };
