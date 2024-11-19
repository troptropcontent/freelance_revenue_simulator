import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Box } from "src/components/ui/Box";
import { WeekChart, WeekChartData } from "src/components/ui/WeekChart";
import { useEnjoymentChartData } from "./private/hooks";
import { Text } from "src/components/ui/Text";
import { Trans, useTranslation } from "react-i18next";

const EnjoymentChart = () => {
  const {
    values: {
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();
  const { t } = useTranslation();
  const base_data = useEnjoymentChartData();

  const chart_data: WeekChartData[] = base_data.map((element) => {
    return {
      color: element.color,
      value: element.value,
      labelFormater: (cell) => {
        if (element.rate == "remaining") {
          return (
            <Text style="text_in_charts">
              <Trans
                i18nKey={`simulator.results.charts.enjoyment_ventilation.remaining`}
                values={{ days: t("common.days", { count: cell.value }) }}
                components={{ b: <strong /> }}
              />
            </Text>
          );
        } else {
          return (
            <Text style="text_in_charts">
              <Trans
                i18nKey={`simulator.results.charts.enjoyment_ventilation.rate_label`}
                values={{
                  days: t("common.days", { count: cell.value }),
                  rate: element.rate,
                }}
                components={{ b: <strong /> }}
              />
            </Text>
          );
        }
      },
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

export { EnjoymentChart };
